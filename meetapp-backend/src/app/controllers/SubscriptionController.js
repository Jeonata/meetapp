import { Op } from 'sequelize';
import Queue from '../../lib/Queue';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Meetup.findAll({
      attributes: ['id', 'title', 'description', 'localization', 'date'],
      where: {
        subscribers: { [Op.contains]: [req.userId] },
      },
      include: [
        {
          model: User,
          as: 'provider',
        },
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
      ],
      order: [['date', 'ASC']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    /**
     * Check if this meet is own
     */
    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'You can not subscribe in your own meetups' });
    }

    /**
     * Check for past dates
     */
    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'Subscribe in a past meetup is not permitted' });
    }

    /**
     * Check if the user have already subscription in this date of meetup
     */
    const meetupSubscribed = await Meetup.findOne({
      where: {
        subscribers: { [Op.contains]: [req.userId] },
        date: meetup.date,
      },
      attributes: ['date'],
    });

    if (meetupSubscribed) {
      return res.status(400).json({
        error: 'Sorry, you can not subscribe two times in a same meetup',
      });
    }

    /**
     * Check if the user have already subscription in this date of meetup
     */
    const meetupDate = await Meetup.findOne({
      where: {
        subscribers: { [Op.contains]: [req.userId] },
        date: meetup.date,
      },
      attributes: ['date'],
    });

    if (meetupDate) {
      return res.status(400).json({
        error: 'Sorry, you can not subscribe in two meetups at the same time',
      });
    }

    const {
      id,
      title,
      description,
      localization,
      date,
      file_id,
    } = await meetup.update({
      subscribers: [req.userId, ...meetup.subscribers],
    });

    const user = await User.findByPk(req.userId);

    await Queue.add(SubscriptionMail.key, { user, meetup });

    return res.json({
      id,
      title,
      description,
      localization,
      date,
      file_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const subscription = await Meetup.findByPk(id);

    if (!subscription) {
      return res.status(400).json({
        error: 'Sorry, meetup not found',
      });
    }

    if (subscription.past) {
      return res.status(400).json({
        error: 'Sorry, you can not delete pasts subscriptions',
      });
    }

    if (!subscription.subscribers.includes(req.userId)) {
      return res.status(400).json({
        error: 'Sorry, you is not subscribed in this meetup',
      });
    }

    const removeSubscription = sub => {
      sub.splice(sub.indexOf(req.userId), 1);
      return sub;
    };

    const subscribers = removeSubscription(subscription.subscribers);

    await subscription.update({ subscribers });

    return res.json(subscribers);
  }
}

export default new SubscriptionController();
