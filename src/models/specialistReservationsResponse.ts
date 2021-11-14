interface specialistReservationsResponse {
  id: number
  name: string
  client_id: number | null
  specialist_id: number
  reservation_status: string
  reservation_timestamp: null | string
  datetime_start: null | string
  datetime_end: null | string
}

export type specialistReservationsListResponse = specialistReservationsResponse[]
