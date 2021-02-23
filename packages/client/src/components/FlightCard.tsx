import React, { memo } from 'react'
import timeFromISO from '../utils/timeFromISO'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { IFlight, Status } from '../interfaces/IFlight'
import { black, green, orange, white } from '../utils/styles/theme'

const Container = styled.li`
  min-height: 80px;
  max-width: 1200px;
  margin: 15px auto;
  border-radius: 3px;
  box-shadow: 0 0 10px 3px rgb(219, 219, 219);
  padding: 25px 0;
  box-sizing: border-box;
  display: flex;
  @media (max-width: 768px) {
    display: block;
  } ;
`

const FlexBlock = styled.div`
  flex: 2;
  border-left: 1px solid lightgrey;
  padding: 0 20px;
  display: flex;
  & div {
    width: 70%;
    word-break: break-word;
  }
  &:first-child {
    flex: 1;
    border-left: none;
  }
  @media (max-width: 768px) {
    border-left: none;
  } ;
`

const TimeBlock = styled.div`
  font-weight: 700;

  & span:first-child {
    font-size: 0.8em;
    opacity: 0.6;
    text-decoration: line-through;
  }
`

const Destination = styled(TimeBlock)`
  margin-bottom: 10px;
`

interface IFlightStatusProps {
  status?: Status
}

const FlightStatus = styled.span`
  background: ${({ status }: IFlightStatusProps) =>
    status === Status.DELAYED ? orange : green};
  color: ${({ status }: IFlightStatusProps) =>
    status === Status.DELAYED ? black : white};
  padding: 4px 7px;
  border-radius: 4px;
  font-weight: 600;
`

const Terminal = styled.div`
  font-weight: 500;
`

interface IFlightCardProps {
  prevTime: string
  flight: IFlight
  handleClickOpen: (flight?: IFlight) => void
}

const FlightCard: React.FC<IFlightCardProps> = ({
  prevTime,
  flight,
  handleClickOpen
}) => {
  return (
    <Container className={'flightCard'}>
      <FlexBlock>
        <TimeBlock>
          <span>{prevTime}</span>&nbsp;
          <span>{timeFromISO(flight.scheduledDeparture.toString())}</span>
        </TimeBlock>
      </FlexBlock>
      <FlexBlock>
        <div>
          <Destination>{flight.destinationPortName}</Destination>
          <div>
            <span>{flight.flightCode}</span>&nbsp;
            <span>{flight.flightProvider}</span>
          </div>
        </div>
        <div>
          <FlightStatus status={flight.status}>{flight.status}</FlightStatus>
        </div>
      </FlexBlock>
      <FlexBlock>
        <Terminal>Terminal {flight.terminal}</Terminal>
        <div>
          <Button color="primary" onClick={() => handleClickOpen(flight)}>
            More details
          </Button>
        </div>
      </FlexBlock>
    </Container>
  )
}

const propsAreEqual = (
  prevProps: IFlightCardProps,
  nextProps: IFlightCardProps
) =>
  prevProps.prevTime === nextProps.prevTime &&
  prevProps.flight === nextProps.flight

export default memo(FlightCard, propsAreEqual)
