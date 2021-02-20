import React, { useState } from 'react';
import theme from '../utils/styles/theme'
import styled from 'styled-components'
import MuiAlert from '@material-ui/lab/Alert'

import {IFlight} from "../interfaces/IFlight";
import {IMessage} from "../interfaces/IMessage";



const PlanFlightButtonContainer = styled.div`
  max-width: 1000px;
  text-align: center;
  margin: 40px auto;
`

const Alert = (props: any) => {
  console.log(props)
  return <MuiAlert elevation={6} variant="filled" {...props} />
}








const App: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [flightInfo, setFlightInfo] = useState<IFlight | null>(null)
  const [message, setMessage] = useState<IMessage>({ type: '', text: '' })

  const handleClickOpen = (flight?: IFlight) => {
    if (flight) setFlightInfo(flight)
    setOpenModal(true)
  }

  const handleClickClose = () => {
    setFlightInfo(null)
    setOpenModal(false)
  }

  return(
      <div>App</div>
  )
}

export default App;
