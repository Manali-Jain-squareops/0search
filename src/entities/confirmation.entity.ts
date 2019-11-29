import { Schema } from 'mongoose';
import { mongoose } from '../lib/mongoose';

const confirmationSchema = new Schema({
  hash: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  version: {
    type: String,
    required: true
  },
  block_hash: {
    type: String,
    required: true
  },
  creation_date: {
    type: Date,
    required: true
  },
  round: {
    type: Number,
    required: true,
    index: true
  },
  round_random_seed: {
    type: String,
    required: true
  },
  merkle_tree_root: {
    type: String
  },
  merkle_tree_path: {
    leaf_index: {
      type: Number
    },
    nodes: {
      type: Array
    }
  },
  receipt_merkle_tree_root: {
    type: String
  },
  receipt_merkle_tree_path: {
    leaf_index: {
      type: Number
    },
    nodes: {
      type: Array
    }
  }
});

export default mongoose.model('Confirmation', confirmationSchema);
