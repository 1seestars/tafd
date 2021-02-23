import React from 'react'
import { expect } from 'chai'
import { render, configure } from 'enzyme'
import App from '../containers/App'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('<App />', () => {
  it("renders modal's open button", () => {
    const wrapper = render(<App />)
    expect(wrapper.find('button').text()).to.contain('Plan')
  })
})
