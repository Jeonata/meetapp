import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  startOfMinute,
  parseISO,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import File from '../models/File';
import User from '../models/User';
import Meetup from '../models/Meetup';

class MeetupController {
  async index(req, res) {
    const { page = 1 } = req.query;

    if (!req.query.date) {
      return res.status(400).json({ error: 'You need select a date' });
    }

    const parseDate = parseISO(req.query.date);

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'provider',
        },
      ],
      limit: 10,
      offset: 10 * page - 10,
    });
    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      localization: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check for past dates
     */
    const hourStart = startOfMinute(parseISO(req.body.date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      localization: Yup.string(),
      date: Yup.date(),
      file_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    /**
     * Check if event is from this user
     */
    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    /**
     * Check if event has passed
     */
    if (meetup.past) {
      return res.status(400).json({ error: 'You can not upate a past meetup' });
    }

    /**
     * Check for past dates in update
     */
    const hourStart = startOfMinute(parseISO(req.body.date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    /**
     * Check if event is from this user
     */
    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    /**
     * Check if event has passed
     */
    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'You can not delete a past meetup' });
    }

    await meetup.destroy();

    return res.json(`Object deleted`);
  }
}

export default new MeetupController();
