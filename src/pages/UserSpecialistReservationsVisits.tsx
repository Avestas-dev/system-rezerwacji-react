import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import CommentIcon from '@mui/icons-material/Comment'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import { useQuery } from 'react-query'
import axios from 'axios'
import { specialistReservationsListResponse } from '../models/specialistReservationsResponse'
import moment from 'moment'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  withStyles,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
const getDay = (d: number) => {
  switch (d) {
    case 0:
      return 'Niedziela'
    case 1:
      return 'Poniedziałek'
    case 2:
      return 'Wtorek'
    case 3:
      return 'Środa'
    case 4:
      return 'Czwartek'
    case 5:
      return 'Piątek'
    case 6:
      return 'Sobota'
    default:
      return 'nieznany'
  }
}
const styles = (theme: any) => ({
  expanded: {
    '&$expanded': {
      minHeight: 0,
      marginTop: 0,
      marginBottom: 0,
      backgroundColor: 'red',
    },
  },
})
function UserSpecialistReservationVisits() {
  const [weekOffset, setWeekOffset] = useState(1)
  const [groupedDays, setGroupedDays] = useState<any>(null)
  const [groupedDaysKeys, setGroupedDaysKeys] = useState<any>([])
  const { data, isFetching } = useQuery(`/specialist-vists/${weekOffset}`, () =>
    axios.get<specialistReservationsListResponse>('/specialist-vists/1').then((res) => {
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
      console.log('---------')
      console.log(Object.keys(grouped))
      console.log('---------')

      return grouped
    }),
  )
  console.log(groupedDays)

  //TODO: eliminate jumping title
  return (
    <div>
      <Navbar />
      <p tw="text-center text-3xl font-bold mb-5">Rezerwacje</p>
      <div>
        {!isFetching &&
          groupedDaysKeys?.length > 1 &&
          groupedDaysKeys.map((e: any, i: any) => (
            <Accordion
              disabled={
                groupedDays[e]?.filter((d: any) => d.reservation_status === 'free').length === 0
              }
              key={i}
              tw="m-auto shadow-md mb-1 mr-5 ml-5"
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div>
                  <Typography>
                    {e +
                      ' - ' +
                      moment(groupedDays[e][0]?.datetime_start).format('DD.MM.YYYY').toString()}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {groupedDays[e].filter((d: any) => d.reservation_status === 'free').length}{' '}
                    wolnych wizyt
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {groupedDays[e]
                    .filter((d: any) => d.reservation_status === 'free')
                    .map((value: any, j: any) => (
                      <ListItem
                        key={j}
                        secondaryAction={
                          <IconButton>
                            <Typography tw="mr-2">Rezerwuj</Typography>
                            <CommentIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={
                            moment(value.datetime_start).format('DD.MM.YYYY').toString() +
                            ' - ' +
                            moment(value.datetime_start).format('HH:mm') +
                            '-' +
                            moment(value.datetime_end).format('HH:mm')
                          }
                          secondary="test"
                        />
                      </ListItem>
                    ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
    </div>
  )
}

export default UserSpecialistReservationVisits
