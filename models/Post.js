import mongoose from 'mongoose';
import moment from 'moment';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this post.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  body: {
    type: String,
    required: [true, 'Please provide a body for this post.'],
  },
  picture: {
    type: String,
    required: [true, 'Please provide a picture for this post.'],
  },
  author_picture: {
    type: String,
    required: [true, 'Please provide a author picture for this post.'],
  },
  author_name: {
    type: String,
    required: [true, 'Please provide a author name for this post.'],
  },
  time_to_read: {
    type: Map,
    required: [true, 'Time to read can not be empty.'],
  },
  tags: [],
  created_at: {
    type: String,
    default: moment().format('DD MMMM YYYY'),
  },
  updated_at: {
    type: String,
    default: moment().format('DD MMMM YYYY'),
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
