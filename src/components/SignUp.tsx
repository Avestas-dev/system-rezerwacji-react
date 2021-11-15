import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
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
import { registerModelRequest } from '../models/registerModelRequest'
import { useHistory } from 'react-router'
import UserContext from '../common/UserContext'
import { registerModelResponse } from '../models/registerModelResponse'

const theme = createTheme()

export default function SignUp() {
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [message, setMessage] = useState('Pomyślnie zarejestrowano.')
  const routerHistory = useHistory()
  const userContext = useContext(UserContext)

  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordRepeatedError, setPasswordRepeatedError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const [firstNameHelperText, setFirstNameHelperText] = useState('')
  const [lastNameHelperText, setLastNameHelperText] = useState('')
  const [phoneHelperText, setPhoneHelperText] = useState('')
  const [passwordHelperText, setPasswordHelperText] = useState('')
  const [passwordRepeatedHelperText, setPasswordRepeatedHelperText] = useState('')
  const [emailHelperText, setEmailHelperText] = useState('')

  const clearValidation = () => {
    setFirstNameError(false)
    setLastNameError(false)
    setPhoneError(false)
    setPasswordError(false)
    setEmailError(false)
    setPasswordRepeatedError(false)
    setFirstNameHelperText('')
    setLastNameHelperText('')
    setPhoneHelperText('')
    setPasswordHelperText('')
    setPasswordRepeatedHelperText('')
    setEmailHelperText('')
  }

  const validation = (formData: FormData) => {
    clearValidation()
    const email = formData.get('email')?.toString() || ''
    const password = formData.get('password')?.toString() || ''
    const passwordRepeated = formData.get('passwordRepeated')?.toString() || ''
    const firstName = formData.get('firstName')?.toString() || ''
    const lastName = formData.get('lastName')?.toString() || ''
    const telephone = formData.get('telephone')?.toString() || ''
    if (firstName.length < 3) {
      setFirstNameError(true)
      setFirstNameHelperText('Imię musi zawierać minimum 3 znaki')
    } else if (firstName.length > 30) {
      setFirstNameError(true)
      setFirstNameHelperText('Imię musi zawierać maksimum 30 znaków')
    }
    if (firstName.length < 3) {
      setLastNameError(true)
      setLastNameHelperText('Nazwisko musi zawierać minimum 3 znaki')
    } else if (firstName.length > 30) {
      setLastNameError(true)
      setLastNameHelperText('Nazwisko musi zawierać maksimum 30 znaków')
    }
    // eslint-disable-next-line no-useless-escape
    if (!telephone.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)) {
      setPhoneError(true)
      setPhoneHelperText('Telefon musi być prawidłowy')
    }
    // eslint-disable-next-line no-useless-escape
    if (
      !email.match(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      setEmailError(true)
      setEmailHelperText('Email musi być prawidłowy')
    }

    if (password.length < 6) {
      setPasswordError(true)
      setPasswordRepeatedError(true)
      setPasswordRepeatedHelperText('Hasła muszą się zgadzać')
      setPasswordHelperText('Hasło musi się składać z minimum 6 liter')
    }
    if (passwordRepeated !== password) {
      setPasswordRepeatedError(true)
      setPasswordRepeatedHelperText('Hasła muszą się zgadzać')
    }
    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      phoneError ||
      passwordError ||
      passwordRepeatedError
    ) {
      return true
    } else {
      return false
    }
  }

  const handleClose = () => {
    setOpen(false)
  }
  const registerMutation = useMutation<registerModelResponse, AxiosError, registerModelRequest>(
    (newUser) => {
      return axios.post('http://localhost:3001/register', newUser)
    },
    {
      onSuccess: (res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.role.toString())
        userContext.setUser(res.data)
        setSeverity('success')
        setOpen(true)
        setMessage('Pomyślnie utworzono użytkownika')
        routerHistory.push('/specialists')
      },
      onError: (err) => {
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
    const isError = validation(formData)
    if (!isError) {
      registerMutation.mutate({
        email: formData.get('email')?.toString() || '',
        password: formData.get('password')?.toString() || '',
        firstName: formData.get('firstName')?.toString() || '',
        lastName: formData.get('lastName')?.toString() || '',
        phone: formData.get('telephone')?.toString() || '',
      })
    }
  }

  return (
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
                error={firstNameError}
                helperText={firstNameHelperText}
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
                error={lastNameError}
                helperText={firstNameHelperText}
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
                error={emailError}
                helperText={emailHelperText}
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
                error={phoneError}
                helperText={phoneHelperText}
                required
                fullWidth
                name="telephone"
                label="Telefon"
                id="telephone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordError}
                helperText={passwordHelperText}
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordRepeatedError}
                helperText={passwordRepeatedHelperText}
                required
                fullWidth
                name="passwordRepeated"
                label="Hasło powtórzone"
                type="password"
                id="passwordRepeated"
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
  )
}
