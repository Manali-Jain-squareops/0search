import mongoose from 'mongoose'
import config from 'config'

const MONGO_URL = config.get('mongodb.url')
const MONGO_POOL_SIZE = config.get('mongodb.pool_size')

export async function connect () {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, poolSize: MONGO_POOL_SIZE })
}

export async function getMongoConnection () {
  return mongoose.connection
}

export { mongoose }
