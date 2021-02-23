import React from 'react'
import { expect } from 'chai'
import { render, configure } from 'enzyme'

import FlightDetailsContainer from '../containers/FlightDetails'
import { Status } from '../interfaces/IFlight'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('<FlightDetailsContainer />', () => {
  it('renders three of <FlightCard />', () => {
    const wrapper = render(
      <FlightDetailsContainer
        flights={[
          {
            flightCode: '',
            flightProvider: '',
            sourcePortName: '',
            sourcePortCode: '',
            destinationPortName: '',
            destinationPortCode: '',
            scheduledArrival: '17:00',
            scheduledDeparture: '17:30',
            status: Status.ON_SCHEDULE,
            terminal: 'T1'
          }
        ]}
        handleClickOpen={() => {}}
      />
    )
    expect(wrapper.find('.flightCard')).to.have.lengthOf(1)
  })
})
