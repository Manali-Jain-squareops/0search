import { Schema } from 'mongoose';
import { mongoose } from '../lib/mongoose';

const transactionSchema = new Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  block_hash: {
    type: String,
    required: true,
    index: true
  },
  version: {
    type: String,
    required: true
  },
  client_id: {
    type: String,
    index: true
  },
  to_client_id: {
    type: String,
    index: true
  },
  chain_id: {
    type: String,
    required: true
  },
  transaction_data: {
    type: String
  },
  transaction_value: {
    type: String
  },
  signature: {
    type: String
  },
  creation_date: {
    type: String
  },
  transaction_fee: {
    type: String
  },
  transaction_type: {
    type: String
  },
  transaction_output: {
    type: String
  },
  transaction_output_hash: {
    type: String
  },
  transaction_status: {
    type: String
  },
  confirmation_fetched: {
    type: Boolean
  },
  metadata: {
    type: Object,
    index: true
  },
  parsed_output: {
    type: Object,
    index: true
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
});

export default mongoose.model('Transaction', transactionSchema);
