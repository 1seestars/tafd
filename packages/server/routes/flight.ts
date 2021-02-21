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
    const flights = await Flight.get()

    return res.send(flights)
  })
)

flightRouter.post(
  '/',
  handlerWrapper(async function (req, res, next) {
    const flight = await Flight.create({ ...req.body })

    return res.send(flight)
  })
)

flightRouter.delete(
  '/:id',
  handlerWrapper(async function (req, res, next) {
    const { id } = req.params

    await Flight.delete(id)

    return res.send()
  })
)

flightRouter.patch(
  '/:id',
  handlerWrapper(async function (req, res, next) {
    const { id } = req.params

    const response = await Flight.edit(id, { ...req.body })

    return res.send(response)
  })
)

export default flightRouter
