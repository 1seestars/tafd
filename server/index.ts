import express, { Request, Response, NextFunction, Errback } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { mongoClient } from './dbConfig'
import Flight from './models/Flight'

import flightRouter from './routes/flight'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/flights', flightRouter)

/*app.use((err: any, req: Request, res: Response) => {
  console.log(err.stack)

  // return res.status(500).json({ error: err.toString() })
})*/

const main = async () => {
  await mongoClient.connect()

  app.listen(4000, () => {
    console.log(`⚡️Server is running at PORT 4000`)
  })
}

main().catch(console.error)
