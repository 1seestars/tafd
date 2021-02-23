import React from 'react'
import styled from 'styled-components'
import { IFlight, Status } from '../interfaces/IFlight'
import { DateTime } from 'luxon'
import FlightCard from '../components/FlightCard'

const FlightList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const NoFlightsBlock = styled.div`
  background: bisque;
  min-height: 300px;
  border-radius: 20px;
  padding: 10% 5%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vh;
  text-shadow: 4px 4px 2px rgba(150, 150, 150, 1);
  opacity: 0.7;
`

interface IFlightDetailsContainerProps {
  flights: Array<IFlight>
  handleClickOpen: (flight?: IFlight) => void
}

const FlightDetailsContainer: React.FC<IFlightDetailsContainerProps> = ({
  flights,
  handleClickOpen
}) => (
  <FlightList>
    {!flights.length && (
      <NoFlightsBlock>
        No scheduled flights found! Try to add one!
      </NoFlightsBlock>
    )}
    {(flights as Array<IFlight>).map((flight: IFlight) => {
      let prevTime = ''

      if (flight.status === Status.DELAYED) {
        const minus = DateTime.fromISO(flight.scheduledDeparture.toString())
          .minus({ minutes: 15 })
          .toUTC()
          .toISO()

        prevTime = DateTime.fromISO(minus).toLocaleString(DateTime.TIME_SIMPLE)
      }

      return (
        <FlightCard
          key={flight._id}
          prevTime={prevTime}
          flight={flight}
          handleClickOpen={handleClickOpen}
        />
      )
    })}
  </FlightList>
)

export default FlightDetailsContainer
