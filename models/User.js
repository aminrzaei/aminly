import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import moment from 'moment';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  /* 
  user types:
    1.user
    2.admin
  */
  type: {
    type: String,
    required: true,
    default: 'user',
  },
  name: {
    type: String,
  },
  usename: {
    type: String,
  },
  liked_posts: [],
  created_at: {
    type: String,
    default: moment().format('DD MMMM YYYY'),
  },
  updated_at: {
    type: String,
    default: moment().format('DD MMMM YYYY'),
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
