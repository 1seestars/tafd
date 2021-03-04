import React from 'react'
import { shallow, configure } from 'enzyme'
import ModalWindow from '../containers/ModalWindow'
import { Status } from '../interfaces/IFlight'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('<ModalWindow />', () => {
  it('allows us to set props', () => {
    const wrapper = shallow(
      <ModalWindow
        flightInfo={{
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
        }}
        setMessage={() => {}}
        setFlights={() => {}}
        handleClickOpen={() => {}}
        handleClickClose={() => {}}
        open={false}
      />
    )
    expect(wrapper.find('.dialogWindow').text()).toContain('Status')
  })
})
