export interface IFlight {
    flightCode: string,
    flightProvider: string,
    sourcePortName: string,
    sourcePortCode: string,
    destinationPortName: string,
    destinationPortCode: string,
    scheduledArrival: string,
    scheduledDeparture: string,
    status: string,
    terminal: string
}