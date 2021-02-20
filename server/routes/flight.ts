import express, {
  RequestHandler,
  Request,
  Response,
  NextFunction
} from 'express'
import Flight from '../models/Flight'

const flightRouter = express.Router()

const handlerWrapper = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const wrapped = async () => {
    try {
      await fn(req, res, next)
    } catch (e) {
      res.status(400).send({ error: e.toString() })
    }
  }

  return wrapped()
}

flightRouter.get(
  '/',
  handlerWrapper(async (req, res, next) => {
    return res.send({
      text: 'Hello world!'
    })
  })
)

flightRouter.post(
  '/',
  handlerWrapper(async function (req, res, next) {
    const flight = await Flight.create({ ...req.body })

    return res.send(flight)
  })
)

export default flightRouter
