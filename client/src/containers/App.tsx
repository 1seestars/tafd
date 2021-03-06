import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react'
import theme from '../utils/styles/theme'
import styled from 'styled-components'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { ThemeProvider } from '@material-ui/styles'
import FlightDetailsContainer from './FlightDetails'
import { IFlight } from '../interfaces/IFlight'
import { IMessage, MessageType } from '../interfaces/IMessage'
import { apiCall } from '../utils/api/backendApi'
import CircularProgress from '@material-ui/core/CircularProgress'

const ModalWindow = lazy(() => import('./ModalWindow'))

const PlanFlightButtonContainer = styled.div`
  max-width: 1000px;
  text-align: center;
  margin: 40px auto;
`

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const LoaderContainer = styled.div`
  min-width: 220px;
  min-height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const App: React.FC = () => {
  const [flights, setFlights] = useState<Array<IFlight>>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [flightInfo, setFlightInfo] = useState<IFlight | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<IMessage>({
    type: MessageType.SUCCESS,
    text: ''
  })

  useEffect(() => {
    const getFlights = async (): Promise<void> => {
      try {
        setLoading(true)
        const flights: Array<IFlight> = await apiCall('flights')

        setFlights(flights)
      } catch (e) {
        console.error(e)
        setMessage({
          type: MessageType.ERROR,
          text: e.message
        })
      } finally {
        setLoading(false)
      }
    }

    getFlights()
  }, [])

  const handleClickOpen = useCallback((flight?: IFlight): void => {
    if (flight) setFlightInfo(flight)
    setOpenModal(true)
  }, [])

  const handleClickClose = useCallback(() => {
    setOpenModal(false)
    setFlightInfo(null)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      ) : (
        <FlightDetailsContainer
          flights={flights}
          handleClickOpen={handleClickOpen}
        />
      )}
      <PlanFlightButtonContainer>
        <Suspense fallback={<CircularProgress />}>
          <ModalWindow
            setFlights={setFlights}
            setMessage={setMessage}
            flightInfo={flightInfo}
            open={openModal}
            handleClickOpen={() => handleClickOpen()}
            handleClickClose={handleClickClose}
          />
        </Suspense>
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
