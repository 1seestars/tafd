import { MongoClient } from 'mongodb'
require('dotenv').config()

const uri: string = process.env.MONGO_URI!

export const mongoClient = new MongoClient(uri, { useUnifiedTopology: true })

export const getDb = () => {
  return mongoClient.db('flight_db')
}
