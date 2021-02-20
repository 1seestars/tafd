import React, { useState } from 'react'
import theme from '../utils/styles/theme'
import styled from 'styled-components'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { ThemeProvider } from '@material-ui/styles'
import ModalWindow from './ModalWindow'
import FlightDetailsContainer from './FlightDetalis'
import { IFlight } from '../interfaces/IFlight'
import { IMessage, MessageType } from '../interfaces/IMessage'

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
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [flightInfo, setFlightInfo] = useState<IFlight | null>(null)
  const [message, setMessage] = useState<IMessage>({
    type: MessageType.SUCCESS,
    text: ''
  })

  const handleClickOpen = (flight?: IFlight): void => {
    if (flight) setFlightInfo(flight)
    setOpenModal(true)
  }

  const handleClickClose = () => {
    setFlightInfo(null)
    setOpenModal(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <FlightDetailsContainer handleClickOpen={handleClickOpen} />
      <PlanFlightButtonContainer>
        <ModalWindow
          setMessage={setMessage}
          flightInfo={flightInfo}
          open={openModal}
          handleClickOpen={() => handleClickOpen()}
          handleClickClose={handleClickClose}
        />
      </PlanFlightButtonContainer>
      <Snackbar
        open={!!message.text}
        autoHideDuration={3000}
        onClose={() =>
          setMessage((state) => ({
            ...state,
            text: ''
          }))
        }
      >
        <Alert
          onClose={() =>
            setMessage((state) => ({
              ...state,
              text: ''
            }))
          }
          severity={message.type}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}

export default App
