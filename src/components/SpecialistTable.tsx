import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import { DataGrid, GridColDef, GridRowModel, GridValueGetterParams, plPL } from '@mui/x-data-grid'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { plPL as coreplPL } from '@mui/material/locale'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useMutation, useQueryClient } from 'react-query'
import axios, { AxiosError } from 'axios'
import { deleteSpecialistRequest } from '../models/deleteSpecialistRequest'
import { useHistory } from 'react-router-dom'
import { Alert, AlertColor, Box, Button, Modal, Snackbar, Typography } from '@mui/material'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const renderDetailsButton = (params: any) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const routerHistory = useHistory()

  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [message, setMessage] = useState('Pomyślnie zarejestrowano.')
  const handleClose = () => {
    setOpen(false)
  }

  const deleteMutation = useMutation<unknown, AxiosError, any>(
    (id) => {
      console.log('HERERERERERERER ' + id)
      return axios.delete(`/specialist/${id}`)
    },
    {
      onSuccess: (res) => {
        setSeverity('success')
        setOpen(true)
        setMessage('Pomyślnie usunięto użytkownika.')
        queryClient.invalidateQueries('specialists')
        routerHistory.push('/specialists-list')
      },
      onError: (err) => {
        setSeverity('error')
        setOpen(true)
        setMessage('Wystąpił błąd przy usuwaniu.')
      },
    },
  )
  return (
    <strong tw="m-auto">
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography tw="text-center" id="modal-modal-title" variant="h6" component="h2">
            Czy na pewno chcesz usunąć użytkownika?
          </Typography>
          <div tw="text-center">
            <Button
              onClick={() => setOpenModal(false)}
              tw="bg-blue-600 text-white m-5 hover:(opacity-80 bg-blue-600 transform scale-105)"
            >
              Nie
            </Button>
            <Button
              onClick={() => deleteMutation.mutate(params.id)}
              tw="bg-red-600 text-white m-5 hover:(opacity-80 bg-red-600 transform scale-105)"
            >
              Tak
            </Button>
          </div>
        </Box>
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <a
        tw="cursor-pointer"
        onClick={() => {
          setOpenModal(true)
        }}
      >
        <DeleteForeverIcon tw="text-red-500" />
      </a>
    </strong>
  )
}
const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  plPL,
  coreplPL,
)

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', flex: 1 },
  { field: 'firstName', headerName: 'Imię', flex: 1 },
  { field: 'lastName', headerName: 'Nazwisko', flex: 1 },
  { field: 'phone', headerName: 'Telefon', flex: 1 },
  { field: 'email', headerName: 'E-mail', flex: 1 },
  { field: 'job', headerName: 'Zawód', flex: 1 },
  {
    field: 'remove',
    headerName: 'Usuń',
    renderCell: renderDetailsButton,
    width: 80,
    sortable: false,
    align: 'center',
  },
]

interface SpecialistTableProps {
  rows: readonly GridRowModel[]
}

const SpecialistTable = ({ rows }: SpecialistTableProps) => {
  return (
    <div tw="max-w-4xl m-auto">
      <ThemeProvider theme={theme}>
        <DataGrid
          disableColumnMenu
          disableExtendRowFullWidth={true}
          // autoHeight
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
          autoHeight
        />
      </ThemeProvider>
    </div>
  )
}

export default SpecialistTable
