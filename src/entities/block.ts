import { Schema } from 'mongoose'
import { mongoose } from '../lib/mongoose'

const blockSchema = new Schema({
  hash: {
    type: String,
    required: true
  },
  round: {
    type: Number
  },
  miner_id: {
    type: String,
    required: true
  },
  round_random_seed: {
    type: String
  },
  merkle_tree_root: { type: String, default: null },
  state_hash: { type: Boolean, default: false },
  receipt_merkle_tree_root: { type: String },
  num_txns: { type: String },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true }
})

export default mongoose.model('Block', blockSchema)
