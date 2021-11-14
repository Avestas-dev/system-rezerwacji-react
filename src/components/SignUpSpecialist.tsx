import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import {
  Alert,
  AlertColor,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
} from '@mui/material'
import { Redirect } from 'react-router'
import { useHistory } from 'react-router'
import UserContext from '../common/UserContext'
import { registerModelResponse } from '../models/registerModelResponse'
import { jobEnum } from '../enums/enums'
import { registerSpecialistModelRequest } from '../models/registerSpecialistModelRequest'

const theme = createTheme()

export default function SignUpSpecialist() {
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [message, setMessage] = useState('Pomyślnie zarejestrowano.')
  const [redirect] = useState(false)
  const routerHistory = useHistory()
  const userContext = useContext(UserContext)
  const [job, setJob] = React.useState('doctor')
  const handleChange = (event: SelectChangeEvent) => {
    setJob(event.target.value as string)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const registerMutation = useMutation<
    registerModelResponse,
    AxiosError,
    registerSpecialistModelRequest
  >(
    (newUser) => {
      return axios.post('/add-specialist', newUser)
    },
    {
      onSuccess: (res) => {
        routerHistory.push('/specialists-list')
      },
      onError: (err) => {
        setSeverity('error')
        setOpen(true)
        switch (err.request.status) {
          case 400:
            setMessage('Wszystkie pola muszą być wypełnione.')
            break
          case 409:
            setMessage('Użytkownik o takim adresie email istnieje.')
            break
          default:
            setMessage('Wystąpił błąd przy tworzeniu konta specjalisty.')
            break
        }
      },
    },
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    registerMutation.mutate({
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      firstName: formData.get('firstName')?.toString() || '',
      lastName: formData.get('lastName')?.toString() || '',
      phone: formData.get('telephone')?.toString() || '',
      jobName: job || '',
    })
  }

  return (
    <ThemeProvider theme={theme}>
      {redirect && <Redirect to={{ pathname: '/specialists', state: { showToast: true } }} />}
      <Container component="main" maxWidth="xs">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Utwórz specjalistę
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Imię"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nazwisko"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adres email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="telephone"
                  label="Telefon"
                  id="telephone"
                  autoComplete="telephone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Hasło"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Praca</InputLabel>
                <Select id="job" required fullWidth value={job} onChange={handleChange} autoWidth>
                  <MenuItem value={'doctor'}>Doktor</MenuItem>
                  <MenuItem value={'vet'}>Weterynarz</MenuItem>
                  <MenuItem value={'dentist'}>Dentysta</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button
              disabled={registerMutation.isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: open && severity === 'success' ? 'green' : 'blue',
              }}
            >
              Zarejestruj się
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
