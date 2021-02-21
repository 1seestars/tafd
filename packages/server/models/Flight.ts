import {
  IsString,
  IsDateString,
  validateOrReject,
  IsEnum,
  MinLength
} from 'class-validator'
import { getDb } from '../dbConfig'
import { ObjectId } from 'mongodb'
import { DateTime } from 'luxon'

export enum Status {
  ON_SCHEDULE = 'ON SCHEDULE',
  LANDED = 'LANDED',
  DELAYED = 'DELAYED'
}

interface IFlight {
  flightCode: string
  flightProvider: string
  sourcePortName: string
  sourcePortCode: string
  destinationPortName: string
  destinationPortCode: string
  scheduledArrival: Date
  scheduledDeparture: Date
  status: Status
  terminal: string
}

interface IFlightDb extends IFlight {
  _id: string
}

interface IConfig {
  status: Status
  scheduledDeparture?: Date | string
}

class Flight implements IFlight {
  @IsString()
  @MinLength(1)
  flightCode: string

  @IsString()
  @MinLength(1)
  flightProvider: string

  @IsString()
  @MinLength(1)
  sourcePortName: string

  @IsString()
  @MinLength(1)
  sourcePortCode: string

  @IsString()
  @MinLength(1)
  destinationPortName: string

  @IsString()
  @MinLength(1)
  destinationPortCode: string

  @IsDateString()
  scheduledArrival: Date

  @IsDateString()
  scheduledDeparture: Date

  @IsEnum(Status)
  status: Status

  @IsString()
  @MinLength(1)
  terminal: string

  static async create(params: IFlight): Promise<IFlightDb> {
    const {
      flightCode,
      flightProvider,
      sourcePortName,
      sourcePortCode,
      destinationPortName,
      destinationPortCode,
      scheduledArrival,
      scheduledDeparture,
      status,
      terminal
    } = params

    const newFlight = new Flight()

    newFlight.flightCode = flightCode
    newFlight.flightProvider = flightProvider
    newFlight.sourcePortName = sourcePortName
    newFlight.sourcePortCode = sourcePortCode
    newFlight.destinationPortName = destinationPortName
    newFlight.destinationPortCode = destinationPortCode
    newFlight.scheduledArrival = scheduledArrival
    newFlight.scheduledDeparture = scheduledDeparture
    newFlight.status = status
    newFlight.terminal = terminal

    await validateOrReject(newFlight)

    const { ops } = await getDb().collection('flights').insertOne(newFlight)

    return ops[0]
  }

  static async get(): Promise<Array<IFlightDb>> {
    return getDb().collection('flights').find().toArray()
  }

  static async delete(id: string): Promise<void> {
    const { deletedCount } = await getDb()
      .collection('flights')
      .deleteOne({ _id: new ObjectId(id) })

    if (!deletedCount) throw new Error('Item has not been deleted!')
  }

  static async edit(id: string, prevFlight: IFlightDb): Promise<IFlightDb> {
    const config: IConfig = { status: prevFlight.status }
    const response = {
      ...prevFlight
    }

    if (prevFlight.status === Status.DELAYED) {
      const addedTime = DateTime.fromISO(
        prevFlight.scheduledDeparture.toString()
      )
        .plus({ minutes: 15 })
        .toUTC()
        .toISO()

      config['scheduledDeparture'] = addedTime
      response['scheduledDeparture'] = new Date(addedTime)
    }

    const flight = await getDb()
      .collection('flights')
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: config })

    if (!flight.value) throw new Error('Item was not found!')

    return response
  }
}

export default Flight
