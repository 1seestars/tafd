import { MongoClient } from 'mongodb'

const uri = 'mongodb://root:pass12345@localhost:27017'

export const mongoClient = new MongoClient(uri, { useUnifiedTopology: true })

export const getDb = () => {
  return mongoClient.db('flight_db')
}
