import Meetup from '../models/Meetup';
import File from '../models/File';

class ListMeetupsController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }

  async detail(req, res) {
    const { id } = req.params;
    const meetups = await Meetup.findByPk(id, {
      where: { user_id: req.userId },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new ListMeetupsController();
