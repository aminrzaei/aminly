import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case 'POST':
      try {
        const user = await User.create(req.body);
        const token = jwt.sign({ userId: user._id }, 'BE_SMART');
        res.status(201).json({ token: token });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
