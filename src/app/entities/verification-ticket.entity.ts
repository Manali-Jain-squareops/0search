import { Schema } from 'mongoose'
import { mongoose } from '../../lib/mongoose'

const verificationTicketSchema = new Schema({
  block_hash: {
    type: String,
    required: true,
    index: true
  },
  verifier_id: {
    type: String,
    required: true,
    index: true
  },
  signature: {
    type: String,
    required: true,
  }
})

export default mongoose.model('VerificationTicket', verificationTicketSchema)
