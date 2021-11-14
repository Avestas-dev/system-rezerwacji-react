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
import axios from 'axios'
import { useMutation } from 'react-query'
import { loginModelRequest } from '../models/loginModelRequest'
import { Alert, AlertColor, Snackbar } from '@mui/material'
import { useHistory } from 'react-router'
import UserContext from '../common/UserContext'
import { loginModelResponse } from '../models/loginModelResponse'
const theme = createTheme()

export default function SignIn() {
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('info')
  const [message, setMessage] = useState('Pomyślnie zarejestrowano.')
  const routerHistory = useHistory()
  const userContext = useContext(UserContext)

  const handleClose = () => {
    setOpen(false)
  }

  const loginMutation = useMutation<loginModelResponse, unknown, loginModelRequest>(
    (loginUser) => {
      return axios.post('/login', loginUser)
    },
    {
      onSuccess: ({ data }) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role.toString())
        userContext.setUser(data)
        setSeverity('success')
        setOpen(true)
        setMessage('Logowanie pomyślne.')
        routerHistory.push({ pathname: '/specialists', state: { isSuccess: true } })
      },
      onError: () => {
        setSeverity('error')
        setOpen(true)
        setMessage('Błędne dane logowania.')
      },
    },
  )
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    loginMutation.mutate({
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
    })
  }

  return (
    <ThemeProvider theme={theme}>
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
            Zaloguj się
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adres email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              disabled={loginMutation.isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: open && severity === 'success' ? 'green' : 'blue',
              }}
            >
              Zaloguj się
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {'Nie masz konta? Zarejestruj się'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
