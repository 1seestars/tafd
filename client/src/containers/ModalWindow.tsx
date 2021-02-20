import React, { FormEvent, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { IFlight, Status, Terminal } from '../interfaces/IFlight'
import { IMessage, MessageType } from '../interfaces/IMessage'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const InputsWrapper = styled.div`
  margin: 10px 20px;
`

const Input = styled(TextField)`
  && {
    margin: 10px 0 0;
  }
`

const LoaderContainer = styled.div`
  min-width: 220px;
  min-height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  scheduledArrival: '07:30',
  scheduledDeparture: '08:30',
  status: Status.ONSCHEDULE,
  terminal: Terminal.T1
}

interface IModalWindowProps {
  setMessage: (message: IMessage) => void
  flightInfo: IFlight | null
  open: boolean
  handleClickOpen: () => void
  handleClickClose: () => void
}

const ModalWindow: React.FC<IModalWindowProps> = ({
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

  const onHandleChange = (e) => {
    setInputState((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  const handleCancel = () => {
    setInputState(defaultInputState)
    handleClickClose()
  }

  const addNewFlight = async (inputState: IFlight) => {
    //const res = apiCall('create', 'POST', inputState)
    //console.log(res)
    // setTimeout(() => {
    //   console.log(inputState)
    //   setLoading(false)
    //   handleClickClose()
    //   setInputState(defaultInputState)
    //   setMessage({
    //     type: 'success',
    //     text: 'Flight was created successfully!'
    //   })
    // }, 2000)

    setTimeout(() => {
      console.log(inputState)
      setLoading(false)
      setMessage({
        type: MessageType.ERROR,
        text: 'Something went wrong!'
      })
    }, 2000)
  }

  const editFlight = (inputState) => {
    const route = `edit/${inputState.id}`
    //const res = apiCall(route, 'PATCH', inputState.status)

    //console.log(res)
    //setLoading(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    flightInfo ? editFlight(inputState) : addNewFlight(inputState)
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Plan a new flight
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
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
            <form onSubmit={handleSubmit}>
              <InputsWrapper>
                <Input
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
                      ? flightInfo.scheduledArrival
                      : inputState.scheduledArrival
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
                <Input
                  name="scheduledDeparture"
                  label="Scheduled Departure"
                  variant="outlined"
                  onChange={onHandleChange}
                  disabled={!!flightInfo}
                  type="time"
                  value={
                    flightInfo
                      ? flightInfo.scheduledDeparture
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
                    name="status"
                    labelId="select-status-label"
                    value={inputState.status}
                    onChange={onHandleChange}
                    label="Status"
                  >
                    <MenuItem value={Status.ONSCHEDULE}>
                      {Status.ONSCHEDULE}
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
                    name="terminal"
                    labelId="select-terminal-label"
                    value={
                      flightInfo ? flightInfo.terminal : inputState.terminal
                    }
                    onChange={onHandleChange}
                    label="Terminal"
                  >
                    <MenuItem value={Terminal.T1}>{Terminal.T1}</MenuItem>
                    <MenuItem value={Terminal.T2}>{Terminal.T2}</MenuItem>
                    <MenuItem value={Terminal.T3}>{Terminal.T3}</MenuItem>
                  </Select>
                </SelectWrapper>
              </InputsWrapper>
              <DialogActions>
                <Button onClick={handleCancel} color="secondary">
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

export default ModalWindow
