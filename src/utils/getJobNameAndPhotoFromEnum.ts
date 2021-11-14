// TODO: make this function not render on every change
import doctor from '../assets/doctor.png'
import dentist from '../assets/dentist.png'
import vet from '../assets/vet.jpg'

export const getJobNameAndPhotoFromEnum = (job: string) => {
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
