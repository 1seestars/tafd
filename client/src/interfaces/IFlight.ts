export enum Status {
  ON_SCHEDULE = 'ON SCHEDULE',
  LANDED = 'LANDED',
  DELAYED = 'DELAYED'
}

export interface IFlight {
  _id?: string
  flightCode: string
  flightProvider: string
  sourcePortName: string
  sourcePortCode: string
  destinationPortName: string
  destinationPortCode: string
  scheduledArrival: Date | string
  scheduledDeparture: Date | string
  status: Status
  terminal: string
}
