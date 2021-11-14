import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CardMedia } from '@mui/material'

import { getJobNameAndPhotoFromEnum } from '../utils/getJobNameAndPhotoFromEnum'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../common/UserContext'

interface PersonCardProps {
  firstName: string
  lastName: string
  job: string
  id: number
  proportion?: number
}

//TODO: implement go to reservation page
const PersonCard = ({ firstName, lastName, job, id, proportion = 1 }: PersonCardProps) => {
  const routerHistory = useHistory()
  const userContext = useContext(UserContext)

  return (
    <Card sx={{ padding: 0, maxWidth: 200 * proportion, marginLeft: 'auto', marginRight: 'auto' }}>
      <CardMedia
        component="img"
        height="150"
        width="150"
        image={getJobNameAndPhotoFromEnum(job).img}
        alt="green iguana"
        sx={{ maxWidth: 200 * proportion, maxHeight: 200 * proportion }}
      />
      <CardContent sx={{ padding: 1, marginBottom: 0, '&:last-child': { paddingBottom: 0 } }}>
        <Typography gutterBottom variant="h5" component="div">
          {firstName + ' ' + lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {getJobNameAndPhotoFromEnum(job).name}
        </Typography>
        <CardActions>
          {userContext.user.role === 'client' && (
            <Button
              size="small"
              onClick={() =>
                routerHistory.push({
                  pathname: `/specialist-visits/${id}`,
                  state: { isSuccess: true },
                })
              }
            >
              Rezerwuj Wizytę
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PersonCard
