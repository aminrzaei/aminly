import jwt from 'jsonwebtoken';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { authentication } = req.headers;
  if (!authentication) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }
  switch (method) {
    case 'GET':
      const token = authentication.replace('Bearer ', '');
      jwt.verify(token, 'BE_SMART', async (err, payload) => {
        if (err) {
          return res.status(401).send({ error: 'You must be logged in.' });
        }
        const { userId } = payload;
        const user = await User.findById(userId);
        return res.status(200).send({ userType: user.type });
      });
      break;
  }
}
