import { IsString, IsDateString, validateOrReject } from 'class-validator'
import { getDb } from '../dbConfig'

export enum Status {
  ONSCHEDULE = 'ON SCHEDULE',
  LANDED = 'LANDED',
  DELAYED = 'DELAYED'
}

export enum Terminal {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3'
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
  terminal: Terminal
}

interface IFlightDb extends IFlight {
  _id: string
}

class Flight implements IFlight {
  @IsString()
  flightCode: string

  @IsString()
  flightProvider: string

  @IsString()
  sourcePortName: string

  @IsString()
  sourcePortCode: string

  @IsString()
  destinationPortName: string

  @IsString()
  destinationPortCode: string

  @IsDateString()
  scheduledArrival: Date

  @IsDateString()
  scheduledDeparture: Date

  @IsString()
  status: Status

  @IsString()
  terminal: Terminal

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

  static async get(): Promise<any> {
    const res = await getDb().collection('flights').findOne({})
    console.log(res)
    return res
  }
}

export default Flight
