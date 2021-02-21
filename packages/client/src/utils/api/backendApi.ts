import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios'
import { IFlight } from '../../interfaces/IFlight'
const BACKEND_URL = 'http://localhost:4000/'

export const apiCall = async (
  route: string = '',
  method: Method = 'GET',
  body?: IFlight
) => {
  const url = `${BACKEND_URL}${route}`
  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (body) {
    config.data = JSON.stringify(body)
  }

  const response: AxiosResponse = await axios(config)
  return response.data
}
