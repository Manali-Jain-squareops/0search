import { Schema } from 'mongoose';
import { mongoose } from '../lib/mongoose';

// TODO: The following schema is an assumption that the payload will be received in the following way
const fileSchema = new Schema({
  actual_file_hash: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  actual_file_size: {
    type: String,
    required: true
  },
  actual_thumbnail_hash: {
    type: String
  },
  actual_thumbnail_size: {
    type: Number,
    required: true
  },
  content_hash: {
    type: String,
    required: true
  },
  custom_meta: {
    type: String
  },
  encrypted_key: {
    type: String
  },
  hash: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  lookup_hash: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  merkle_root: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  num_of_blocks: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  path_hash: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  thumbnail_hash: {
    type: String
  },
  thumbnail_size: {
    type: Number
  },
  type: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean
  }
});

export default mongoose.model('FileDetails', fileSchema);
