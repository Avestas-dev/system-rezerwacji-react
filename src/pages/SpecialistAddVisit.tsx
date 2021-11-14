import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import DatePicker from '@mui/lab/DatePicker'
import TextField from '@mui/material/TextField'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { pl } from 'date-fns/locale'
import { TimePicker } from '@mui/lab'
import { Alert, AlertColor, Button, InputLabel, MenuItem, Select, Snackbar } from '@mui/material'
import moment from 'moment'
import { useMutation } from 'react-query'
import axios from 'axios'
import { addReservationFromToRequest } from '../models/addReservationFromToRequest'

function SpecialistAddVisit() {
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [message, setMessage] = useState('')
  const [startDateValue, setStartDateValue] = useState<Date | null>(null)
  const [endDateValue, setEndDateValue] = useState<Date | null>(null)
  const [startTimeValue, setStartTimeValue] = useState<Date | null>(null)
  const [endTimeValue, setEndTimeValue] = useState<Date | null>(null)
  const [visitName, setVisitName] = useState<string>('')
  const [duration, setDuration] = useState(60)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (data: any) => {
    if (!(startDateValue && endDateValue && startTimeValue && endTimeValue)) {
      setErrorMessage('Wszystkie pola muszą być wybrane.')
      return
    }
    if (moment(startDateValue) >= moment(endDateValue)) {
      setErrorMessage('Data początku wizyt musi być późniejsza od daty końca wizyt.')
      return
    }
    if (moment(startTimeValue) > moment(endTimeValue)) {
      setErrorMessage('Czas początku wizyt musi być późniejszy od czasu końca wizyt.')
      return
    }
    setErrorMessage('')
    createVisitsFromToMutation.mutate({
      name: visitName,
      date_start: startDateValue,
      date_end: endDateValue,
      time_start: startTimeValue,
      time_end: endTimeValue,
      duration: duration,
    })
  }
  const createVisitsFromToMutation = useMutation<any, any, addReservationFromToRequest>(
    (reservationData) => {
      return axios.post('/reservation-from-to', reservationData)
    },
    {
      onSuccess: ({ data }) => {
        console.log(JSON.stringify(data))
        setSeverity('success')
        setOpen(true)
        setMessage(data)
      },
      onError: (err) => {
        console.log(err.response.data.msg)
        setSeverity('error')
        setOpen(true)
        setMessage(err.response.data.msg)
      },
    },
  )
  return (
    <div>
      <Navbar />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <p tw="text-center text-3xl font-bold pb-10">Dodawanie wizyty</p>
      <div tw="pb-2 ml-2 mr-2">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={pl}>
          <div tw="grid grid-cols-2  pl-4 pr-4 pt-2 pb-2 ">
            <div tw=" text-center pb-3 col-span-2 ">
              <TextField
                id="outlined-basic"
                label="Nazwa wizyty"
                variant="outlined"
                value={visitName}
                onChange={(newValue) => setVisitName(newValue.target.value)}
              />
            </div>
            <div tw="pr-1 text-right">
              <DatePicker
                label="Data początkowa"
                minDate={new Date()}
                value={startDateValue}
                onChange={(newValue) => {
                  setStartDateValue(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div tw="pl-1 text-left">
              <DatePicker
                label="Data końcowa"
                minDate={new Date()}
                value={endDateValue}
                onChange={(newValue) => {
                  setEndDateValue(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>

          <div tw="grid grid-cols-2  pl-4 pr-4 pt-4">
            <div tw="pr-1 text-right">
              <TimePicker
                label="Początek wizyt"
                value={startTimeValue}
                onChange={setStartTimeValue}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div tw="pl-1 text-left">
              <TimePicker
                label="Koniec wizyt"
                value={endTimeValue}
                onChange={setEndTimeValue}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>
          <div tw="pt-5 text-center">
            {/* TODO: FIX THIS LABEL */}
            <Select
              label="Czas trwania [min]"
              value={duration}
              onChange={(newValue) => setDuration(parseInt(newValue.target.value.toString(), 10))}
            >
              <MenuItem value={30}>30 minut</MenuItem>
              <MenuItem value={45}>45 minut</MenuItem>
              <MenuItem value={60}>60 minut</MenuItem>
            </Select>
          </div>
          <div tw="text-center">
            {errorMessage && <p tw="text-red-600">{errorMessage}</p>}
            <Button onClick={handleSubmit} tw="mt-5 " variant="contained">
              Dodaj wizyty
            </Button>
          </div>
        </LocalizationProvider>
      </div>
    </div>
  )
}

export default SpecialistAddVisit
