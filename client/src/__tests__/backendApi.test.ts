import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IFlight } from '../interfaces/IFlight'
import { apiCall, BACKEND_URL } from '../utils/api/backendApi'

jest.mock('axios')

describe('backendApi', () => {
  let response: AxiosResponse
  let flights: Array<IFlight>
  let config: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  beforeEach(() => {
    flights = []

    response: {
      data: flights
    }
  })

  it('should return data from backend', () => {
    axios.get('', config)
    apiCall(`${BACKEND_URL}${flights}`, 'GET').then((data) => {
      expect(data.flights).toEqual(flights)
    })
  })
})
