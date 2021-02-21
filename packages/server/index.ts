import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { mongoClient } from './dbConfig'
import flightRouter from './routes/flight'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/flights', flightRouter)

const main = async () => {
  await mongoClient.connect()

  app.listen(4000, () => {
    console.log(`⚡️Server is running at PORT 4000`)
  })
}

main().catch(console.error)
