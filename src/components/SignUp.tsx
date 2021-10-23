import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Copyright from './Copyrights'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { Alert, AlertColor, Snackbar } from '@mui/material'
import { Redirect } from 'react-router'
import { registerModel } from '../models/registerModel'
import { useHistory } from 'react-router'
import UserContext from '../common/UserContext'

const theme = createTheme()

export default function SignUp() {
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [message, setMessage] = useState('Pomyślnie zarejestrowano.')
  const [redirect] = useState(false)
  const routerHistory = useHistory()
  const userContext = useContext(UserContext)

  const handleClose = () => {
    setOpen(false)
  }
  const registerMutation = useMutation(
    (newUser: registerModel) => {
      return axios.post('http://localhost:3001/register', newUser)
    },
    {
      onSuccess: (res: any) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.role)
        userContext.setUser(res.data)
        routerHistory.push('/specialists')
      },
      onError: (err: AxiosError) => {
        setSeverity('error')
        setOpen(true)
        switch (err.request.status) {
          case 400:
            setMessage('Wszystkie pola muszą być wypełnione')
            break
          case 409:
            setMessage('Użytkownik o takim adresie email istnieje')
            break
          default:
            setMessage('Wystąpił błąd przy rejestracji')
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
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
            <LockOutlinedIcon htmlColor="#FFFFFF" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zarejestruj się
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

            <Grid container justifyContent="flex-start">
              <Link href="/login" variant="body2">
                Masz już konto? Zaloguj się
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
