import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { specialistReservationsListResponse } from '../models/specialistReservationsResponse'
import moment from 'moment'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import CancelIcon from '@mui/icons-material/Cancel'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertColor,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
} from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveIcon from '@mui/icons-material/Remove'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { removeReservationRequest } from '../models/removeReservation'
import { getDay } from '../utils/getDay'
import { cancelReservationRequest } from '../models/cancelReservationRequest'
import UserContext from '../common/UserContext'

function UserSpecialistVisits(props: any) {
  const userContext = useContext(UserContext)
  console.log('HERE: ' + props.match.params.id)
  const queryClient = useQueryClient()
  const [weekOffset, setWeekOffset] = useState(0)
  const [groupedDays, setGroupedDays] = useState<any>(null)
  const [groupedDaysKeys, setGroupedDaysKeys] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [message, setMessage] = useState('')
  const handleClose = () => {
    setOpen(false)
  }
  const { isFetching, isRefetching } = useQuery(
    [`specialist-visits`, { offset: weekOffset, id: props.match.params.id }],
    () =>
      axios
        .get<specialistReservationsListResponse>(
          `/week-reservation/${props.match.params.id}/${weekOffset}`,
        )
        .then((res) => {
          const grouped: any = {}

          for (let i = 1; i < 7; i++) {
            grouped[getDay(i)] = []
          }
          grouped['Niedziela'] = []
          res.data.forEach((e) => {
            grouped[getDay(moment(e.datetime_start).day())] = [
              ...grouped[getDay(moment(e.datetime_start).day())],
              e,
            ]
          })
          setGroupedDays(grouped)
          setGroupedDaysKeys(Array.from(Object.keys(grouped)))

          return grouped
        }),
    { refetchInterval: 50000 },
  )

  const reserveVisitMutation = useMutation<any, any, removeReservationRequest>(
    (reserveData) => {
      return axios.put('/reserve', reserveData)
    },
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries('specialist-visits')
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
  const cancelVisitMutation = useMutation<any, any, cancelReservationRequest>(
    (removeData) => {
      return axios.put('/cancel-user-reservation', removeData)
    },
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries('specialist-visits')
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

  //TODO: eliminate jumping title
  return (
    <div>
      <Navbar />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

      <div tw="text-center flex justify-center items-center">
        {weekOffset > 0 && (
          <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
            <ChevronLeftIcon />
          </IconButton>
        )}
        <p tw="text-center text-3xl font-bold">Rezerwacje - widok użytkownika</p>
        <IconButton onClick={() => setWeekOffset(weekOffset + 1)}>
          <ChevronRightIcon />
        </IconButton>
      </div>

      <div tw="max-w-xl m-auto mt-5">
        {(!isFetching || isRefetching) &&
          groupedDaysKeys?.length > 0 &&
          groupedDaysKeys.map((dayOfWeek: any, i: any) => {
            return (
              groupedDays[dayOfWeek]?.length > 0 && (
                <Accordion key={i} tw="m-auto shadow-md mb-1 mr-5 ml-5">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div>
                      <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                        {dayOfWeek +
                          ' - ' +
                          moment(groupedDays[dayOfWeek][0]?.datetime_start)
                            .format('DD.MM.YYYY')
                            .toString()}
                      </Typography>
                      {groupedDays[dayOfWeek].filter((d: any) => d.reservation_status === 'free')
                        .length > 0 && (
                        <Typography sx={{ color: 'green' }}>
                          Wolne wizyty{': '}
                          {
                            groupedDays[dayOfWeek].filter(
                              (d: any) => d.reservation_status === 'free',
                            ).length
                          }
                        </Typography>
                      )}
                      {groupedDays[dayOfWeek].filter(
                        (d: any) => d.reservation_status === 'reserved',
                      ).length > 0 && (
                        <Typography sx={{ color: 'red' }}>
                          Zarezerwowane wizyty{': '}
                          {
                            groupedDays[dayOfWeek].filter(
                              (d: any) => d.reservation_status === 'reserved',
                            ).length
                          }{' '}
                        </Typography>
                      )}
                      <Typography sx={{ color: 'blue' }}>
                        Wszystkie wizyty: {groupedDays[dayOfWeek].length}{' '}
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails tw="mt-0">
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                      {groupedDays[dayOfWeek].map((reservation: any, j: any) => (
                        <ListItem
                          key={j}
                          tw="border-b-2"
                          secondaryAction={
                            <>
                              {reservation.client_id === userContext.user.id ? (
                                <IconButton
                                  onClick={() => cancelVisitMutation.mutate({ id: reservation.id })}
                                >
                                  Anuluj
                                  <CancelIcon />
                                </IconButton>
                              ) : !reservation.client_id ? (
                                <IconButton
                                  onClick={() =>
                                    reserveVisitMutation.mutate({ id: reservation.id })
                                  }
                                >
                                  Rezerwuj
                                  <ControlPointIcon />
                                </IconButton>
                              ) : (
                                'Zarezerwowane'
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
                              moment(reservation.datetime_end).format('HH:mm')
                            }
                            secondary={
                              reservation.client_id === userContext.user.id &&
                              'Zarezerwowane przez ciebie'
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              )
            )
          })}
      </div>
    </div>
  )
}

export default UserSpecialistVisits
