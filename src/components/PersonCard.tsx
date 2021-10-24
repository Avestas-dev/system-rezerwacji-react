import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CardMedia } from '@mui/material'
import doctor from '../assets/doctor.png'
import dentist from '../assets/dentist.png'
import vet from '../assets/vet.jpg'

interface PersonCardProps {
  firstName: string
  lastName: string
  job: string
  id: number
  proportion?: number
}

// TODO: make this function not render on every change
const getJobNameAndPhotoFromEnum = (job: string) => {
  switch (job) {
    case 'dentist':
      return { name: 'Dentysta', img: dentist }
    case 'doctor':
      return { name: 'Doktor', img: doctor }
    case 'vet':
      return { name: 'Weterynarz', img: vet }
    default:
      return { name: 'Doktor', img: doctor }
  }
}
//TODO: implement go to reservation page
const PersonCard = ({ firstName, lastName, job, id, proportion = 1 }: PersonCardProps) => {
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
          <Button size="small">Rezerwuj Wizytę</Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PersonCard
