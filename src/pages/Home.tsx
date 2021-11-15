import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import Navbar from '../components/Navbar'
import { pl } from 'date-fns/locale'
import TextField from '@mui/material/TextField'
import { Box, Button } from '@mui/material'
import moment from 'moment'

function Home() {
  const token = localStorage.getItem('token')
  const [showPasswords, setShowPasswords] = useState(false)
  const [error, setError] = useState(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const checkedPassword = formData.get('password')?.toString() || ''
    if (moment().format('HH:mm') === checkedPassword) {
      setShowPasswords(true)
    } else {
      setError(true)
    }
  }

  return (
    <div>
      <Navbar />
      {!showPasswords && (
        <div tw=" text-center ">
          <p tw="font-bold text-center text-2xl pb-5 ">
            Aby wyświetlić hasła użytkowników, podaj hasło:
          </p>

          <Box
            tw="flex flex-col align-items[center]"
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={error}
              tw="w-44"
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Hasło"
              name="password"
              autoFocus
            />
            <Button
              tw="w-44"
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                backgroundColor: 'blue',
              }}
            >
              Pokaż
            </Button>
          </Box>
        </div>
      )}

      {showPasswords && (
        <>
          <div>
            <p tw="font-bold text-center text-2xl pb-5 ">
              Aby zalogować się do systemu, użyj następujących danych:
            </p>

            <p tw="pt-2 pl-3 pr-3 font-weight[bold]">Logowanie użytkownika 1:</p>
            <ul tw="list-disc">
              <li tw="pt-2 pl-5 pr-3 ">Login: januszex123@o2.pl </li>
              <li tw="pt-2 pl-5 pr-3 ">Hasło: janusz123 </li>
            </ul>
            <p tw="pt-2 pl-3 pr-3 font-weight[bold]">Logowanie użytkownika 2:</p>
            <ul tw="list-disc">
              <li tw="pt-2 pl-5 pr-3 ">Login: maniek@o2.pl</li>
              <li tw="pt-2 pl-5 pr-3 ">Hasło: maniek123</li>
            </ul>
            <p tw="pt-2 pl-3 pr-3 font-weight[bold]">Logowanie specialisty 1:</p>
            <ul tw="list-disc">
              <li tw="pt-2 pl-5 pr-3 ">Login: leszek@o2.pl</li>
              <li tw="pt-2 pl-5 pr-3 ">Hasło: leszek123</li>
            </ul>
            <p tw="pt-2 pl-3 pr-3 font-weight[bold]">Logowanie specialisty 2:</p>
            <ul tw="list-disc">
              <li tw="pt-2 pl-5 pr-3 ">Login: mirosław@o2.pl</li>
              <li tw="pt-2 pl-5 pr-3 ">Hasło: mirek123</li>
            </ul>
            <p tw="pt-2 pl-3 pr-3 font-weight[bold]">Logowanie administratora:</p>
            <ul tw="list-disc">
              <li tw="pt-2 pl-5 pr-3 ">Login: admin@o2.pl</li>
              <li tw="pt-2 pl-5 pr-3 ">Hasło: admin123</li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
