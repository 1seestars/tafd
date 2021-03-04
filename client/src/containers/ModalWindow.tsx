import React, {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
  memo
} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { IFlight, Status } from '../interfaces/IFlight'
import { IMessage, MessageType } from '../interfaces/IMessage'
import { apiCall } from '../utils/api/backendApi'
import timeToISO from '../utils/timeToISO'
import timeFromISO from '../utils/timeFromISO'
import { LoaderContainer } from './App'

const InputsWrapper = styled.div`
  margin: 10px 20px;
`

const Input = styled(TextField)`
  && {
    margin: 10px 0 0;
  }
`

const SelectWrapper = styled(FormControl)`
  && {
    margin: 10px 0 0;
  }
`

const defaultInputState = {
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

export interface IModalWindowProps {
  setMessage: (message: IMessage) => void
  flightInfo: IFlight | null
  open: boolean
  handleClickOpen: () => void
  handleClickClose: () => void
  setFlights: (state: SetStateAction<Array<IFlight>>) => void
}

const ModalWindow: React.FC<IModalWindowProps> = ({
  setFlights,
  setMessage,
  flightInfo,
  open,
  handleClickOpen,
  handleClickClose
}) => {
  const [inputState, setInputState] = useState<IFlight>(defaultInputState)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (flightInfo) setInputState(flightInfo)
  }, [flightInfo])

  const onHandleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<{ name?: any; value: unknown }>
  ) => {
    setInputState((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  const handleCancel = () => {
    setInputState(defaultInputState)
    handleClickClose()
  }

  const handleDelete = () => {
    const ans = window.confirm('Are you sure?')
    if (ans) deleteFlight()
  }

  const addNewFlight = async () => {
    try {
      const newState = {
        ...inputState,
        scheduledArrival: timeToISO(inputState.scheduledArrival.toString()),
        scheduledDeparture: timeToISO(inputState.scheduledDeparture.toString())
      }

      const newFlight = await apiCall('flights', 'POST', newState)

      setFlights((state) => {
        return [...state, newFlight]
      })

      handleClickClose()
      setInputState(defaultInputState)
      setMessage({
        type: MessageType.SUCCESS,
        text: 'Flight was created successfully!'
      })
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

  const deleteFlight = async (): Promise<void> => {
    try {
      const route = `flights/${inputState._id}`
      setLoading(true)
      await apiCall(route, 'DELETE')

      setFlights((state) => {
        return [...state].filter(
          (flight: IFlight) => flight._id !== inputState._id
        )
      })

      handleClickClose()
      setInputState(defaultInputState)
      setMessage({
        type: MessageType.SUCCESS,
        text: 'Flight was removed successfully!'
      })
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

  const editFlight = async () => {
    if (flightInfo && flightInfo.status === inputState.status) {
      handleClickClose()
      setInputState(defaultInputState)
      return
    }

    try {
      const route = `flights/${inputState._id}`
      setLoading(true)
      const flight: IFlight = await apiCall(route, 'PATCH', inputState)

      setFlights((state) => {
        const copiedFlights = [...state]
        const index = copiedFlights.findIndex((f) => f._id === flight._id)
        const firstHalf = copiedFlights.slice(0, index)
        const lastHalf = copiedFlights.slice(index + 1, copiedFlights.length)

        return [...firstHalf, flight, ...lastHalf]
      })

      handleClickClose()
      setInputState(defaultInputState)
      setMessage({
        type: MessageType.SUCCESS,
        text: 'Status was changed successfully!'
      })
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    flightInfo ? editFlight() : addNewFlight()
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Plan a new flight
      </Button>
      <Dialog
        className={'dialogWindow'}
        open={open}
        keepMounted
        onClose={handleCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick={loading}
      >
        <DialogContent>
          {loading ? (
            <LoaderContainer>
              <CircularProgress />
            </LoaderContainer>
          ) : (
            <form onSubmit={handleSubmit} data-testid="modal-window-form">
              <InputsWrapper>
                <Input
                  inputProps={{
                    'data-testid': 'flightCode'
                  }}
                  name="flightCode"
                  label="Flight Code"
                  variant="outlined"
                  value={
                    flightInfo ? flightInfo.flightCode : inputState.flightCode
                  }
                  onChange={onHandleChange}
                  disabled={!!flightInfo}
                  size={'small'}
                  fullWidth
                  required
                />
                <Input
                  data-testid="flightProvider"
                  name="flightProvider"
                  label="Flight Provider"
                  variant="outlined"
                  value={
                    flightInfo
                      ? flightInfo.flightProvider
                      : inputState.flightProvider
                  }
                  onChange={onHandleChange}
                  disabled={!!flightInfo}
                  size={'small'}
                  fullWidth
                  required
                />
                <Input
                  data-testid="sourcePortName"
                  name="sourcePortName"
                  label="Source Port Name"
                  variant="outlined"
                  value={
                    flightInfo
                      ? flightInfo.sourcePortName
                      : inputState.sourcePortName
                  }
                  onChange={onHandleChange}
                  disabled={!!flightInfo}
                  size={'small'}
                  fullWidth
                  required
                />
                <Input
                  data-testid="sourcePortCode"
                  name="sourcePortCode"
                  label="Source Port Code"
                  variant="outlined"
                  value={
                    flightInfo
                      ? flightInfo.sourcePortCode
                      : inputState.sourcePortCode
                  }
                  onChange={onHandleChange}
                  disabled={!!flightInfo}
                  size={'small'}
                  fullWidth
                  required
                />
                <Input
                  data-testid="destinationPortName"
                  name="destinationPortName"
                  label="Destination Port Name"
                  variant="outlined"
                  value={
                    flightInfo
                      ? flightInfo.destinationPortName
                      : inputState.destinationPortName
                  }
                  onChange={onHandleChange}
                  disabled={!!flightInfo}
                  size={'small'}
                  fullWidth
                  required
                />
                <Input
                  data-testid="destinationPortCode"
                  name="destinationPortCode"
                  label="Destination Port Code"
                  variant="outlined"
                  value={
                    flightInfo
                      ? flightInfo.destinationPortCode
                      : inputState.destinationPortCode
                  }
                  onChange={onHandleChange}
                  disabled={!!flightInfo}
                  size={'small'}
                  fullWidth
                  required
                />
                <Input
                  name="scheduledArrival"
                  label="Scheduled Arrival"
                  variant="outlined"
                  onChange={onHandleChange}
                  disabled={!!flightInfo}
                  type="time"
                  value={
                    flightInfo
                      ? timeFromISO(flightInfo.scheduledArrival.toString())
                      : inputState.scheduledArrival
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300, // 5 min
                    'data-testid': 'scheduledArrival'
                  }}
                  size={'small'}
                  fullWidth
                />
                <Input
                  data-testid="scheduledDeparture"
                  name="scheduledDeparture"
                  label="Scheduled Departure"
                  variant="outlined"
                  onChange={onHandleChange}
                  disabled={!!flightInfo}
                  type="time"
                  value={
                    flightInfo
                      ? timeFromISO(flightInfo.scheduledDeparture.toString())
                      : inputState.scheduledDeparture
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300 // 5 min
                  }}
                  size={'small'}
                  fullWidth
                />
                <SelectWrapper variant="outlined" size={'small'} fullWidth>
                  <InputLabel id="select-status-label">Status</InputLabel>
                  <Select
                    data-testid="status"
                    name="status"
                    labelId="select-status-label"
                    value={inputState.status}
                    onChange={onHandleChange}
                    label="Status"
                  >
                    <MenuItem value={Status.ON_SCHEDULE}>
                      {Status.ON_SCHEDULE}
                    </MenuItem>
                    <MenuItem value={Status.LANDED}>{Status.LANDED}</MenuItem>
                    <MenuItem value={Status.DELAYED}>{Status.DELAYED}</MenuItem>
                  </Select>
                </SelectWrapper>
                <SelectWrapper
                  variant="outlined"
                  size={'small'}
                  disabled={!!flightInfo}
                  fullWidth
                >
                  <InputLabel id="select-terminal-label">Terminal</InputLabel>
                  <Select
                    data-testid="terminal"
                    name="terminal"
                    labelId="select-terminal-label"
                    value={
                      flightInfo ? flightInfo.terminal : inputState.terminal
                    }
                    onChange={onHandleChange}
                    label="Terminal"
                  >
                    <MenuItem value={'T1'}>T1</MenuItem>
                    <MenuItem value={'T2'}>T2</MenuItem>
                    <MenuItem value={'T3'}>T3</MenuItem>
                  </Select>
                </SelectWrapper>
              </InputsWrapper>
              <DialogActions>
                {flightInfo && (
                  <Button onClick={handleDelete} color="secondary">
                    Delete
                  </Button>
                )}
                <Button onClick={handleCancel} color="inherit">
                  Cancel
                </Button>

                <Button type={'submit'} color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

const arePropsEqual = (
  prevProps: IModalWindowProps,
  nextProps: IModalWindowProps
) => prevProps.open === nextProps.open

export default memo(ModalWindow, arePropsEqual)
