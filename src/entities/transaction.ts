import { Schema } from 'mongoose'
import { mongoose } from '../lib/mongoose'

const transactionSchema = new Schema({
  hash: {
    type: String,
    required: true
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  amount: {
    type: String
  },
  note: {
    type: String
  },
  chain_id: {
    type: String
  },
  signature: {
    type: String
  },
  version: {
    type: String
  },
  transaction_output: {
    type: String
  },
  transaction_output_hash: {
    type: String
  },
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
})

export default mongoose.model('Transaction', transactionSchema)
