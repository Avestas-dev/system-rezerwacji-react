import {
  Alert,
  AlertColor,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import Navbar from '../components/Navbar'
import CancelIcon from '@mui/icons-material/Cancel'
import { cancelReservationRequest } from '../models/cancelReservationRequest'
import { removeReservationRequest } from '../models/removeReservation'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import moment from 'moment'

function UserReservations() {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [message, setMessage] = useState('')
  const handleClose = () => {
    setOpen(false)
  }
  const { data } = useQuery('all-user-reservations', () =>
    axios.get<any>('/all-user-reservations').then((res) => {
      console.log(JSON.stringify(res.data))
      return res.data
    }),
  )
  const cancelVisitMutation = useMutation<any, any, cancelReservationRequest>(
    (removeData) => {
      return axios.put('/cancel-user-reservation', removeData)
    },
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries('all-user-reservations')
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Navbar />
      <p tw="font-bold text-center text-5xl mb-5 ">Rezerwacje użytkownika</p>
      <List tw="max-w-xl m-auto" sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {data?.map((reservation: any, j: any) => (
          <ListItem
            key={j}
            tw="border-b-2"
            secondaryAction={
              <>
                {reservation.reservation_status === 'reserved' && (
                  <IconButton onClick={() => cancelVisitMutation.mutate({ id: reservation.id })}>
                    <CancelIcon />
                  </IconButton>
                )}
              </>
            }
          >
            <ListItemText
              secondaryTypographyProps={{ color: 'red' }}
              primary={
                moment(reservation.datetime_start).format('DD.MM.YYYY').toString() +
                ' - ' +
                moment(reservation.datetime_start).format('HH:mm') +
                '-' +
                moment(reservation.datetime_end).format('HH:mm') +
                '  -  ' +
                reservation.user.firstName +
                ' ' +
                reservation.user.lastName
              }
              secondary={
                reservation?.user
                  ? '' +
                    'Zarezerwowane dnia ' +
                    ' ' +
                    moment(reservation?.timestamp).format('DD.MM.YYYY') +
                    ' o godzinie ' +
                    moment(reservation?.timestamp).format('HH:mm')
                  : ''
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default UserReservations
