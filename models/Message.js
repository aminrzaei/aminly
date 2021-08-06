import mongoose from 'mongoose';
import moment from 'moment';

const MessageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this message.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address.'],
  },
  msg: {
    type: String,
    required: [true, 'Message body cannot be empty.'],
    maxlength: [100, 'Message cannot be more than 100 characters'],
  },
  createdAt: {
    type: String,
    default: moment().format('DD MMMM YYYY'),
  },
  updatedAt: {
    type: String,
    default: moment().format('DD MMMM YYYY'),
  },
});

export default mongoose.models.Message ||
  mongoose.model('Message', MessageSchema);
