import dbConnect from '../../../utils/dbConnect';
import Message from '../../../models/Message';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const messgae = await Message.create(req.body);
        res.status(201).json({ success: true, data: messgae });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
