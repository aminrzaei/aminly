import jwt from 'jsonwebtoken';

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  switch (method) {
    case 'POST':
      try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'BE_SMART');
        res.send({ token: token });
      } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
      }
      break;
  }
}
