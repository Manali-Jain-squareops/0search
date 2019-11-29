import { Schema } from 'mongoose';
import { mongoose } from '../lib/mongoose';

const blockSchema = new Schema({
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
  creation_date: {
    type: Date,
    required: true
  },
  round: {
    type: Number,
    required: true,
    index: true,
    unique: true
  },
  miner_id: {
    type: String,
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
  state_hash: {
    type: String,
    required: true
  },
  receipt_merkle_tree_root: {
    type: String
  },
  num_txns: {
    type: Number
  },
  magic_block_hash: {
    type: String
  },
  prev_hash: {
    type: String
  },
  signature: {
    type: String
  },
  chain_id: {
    type: String
  },
  chain_weight: {
    type: Number
  },
  running_txn_count: {
    type: Number
  },
  round_timeout_count: {
    type: Number
  },
  prev_verification_tickets: [
    {
      verifier_id: {
        type: String,
        index: true
      },
      signature: {
        type: String
      }
    }
  ],
  verification_tickets: [
    {
      verifier_id: {
        type: String,
        required: true,
        index: true
      },
      signature: {
        type: String,
        required: true
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true
  }
});

export default mongoose.model('Block', blockSchema);
