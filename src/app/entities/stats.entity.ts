import { Schema } from 'mongoose'
import { mongoose } from '../../lib/mongoose'

const StatsSchema = new Schema({
  block_size: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true,
  },
  current_round: {
    type: Number,
    required: true
  },
  delta: {
    type: Number,
    required: true
  },
  latest_finalized_round: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  mean: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  percentile_50: {
    type: Number,
    required: true
  },
  percentile_90: {
    type: Number,
    required: true
  },
  percentile_95: {
    type: Number,
    required: true
  },
  percentile_99: {
    type: Number,
    required: true
  },
  rate_15_min: {
    type: Number,
    required: true
  },
  rate_1_min: {
    type: Number,
    required: true
  },
  rate_5_min: {
    type: Number,
    required: true
  },
  rate_mean: {
    type: Date,
    default: Date.now,
    required: true
  },
  std_dev: {
    type: Date,
    required: true
  },
  total_txns: {
    type: Date,
    required: true
  }
})

export default mongoose.model('Stats', StatsSchema)
