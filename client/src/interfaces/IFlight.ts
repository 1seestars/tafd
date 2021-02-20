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

export interface IFlight {
  id?: string
  flightCode: string
  flightProvider: string
  sourcePortName: string
  sourcePortCode: string
  destinationPortName: string
  destinationPortCode: string
  scheduledArrival: string
  scheduledDeparture: string
  status: Status
  terminal: Terminal
}
