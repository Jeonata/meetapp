import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const files = await File.create({
      name,
      path,
    });

    return res.json(files);
  }
}

export default new FileController();
