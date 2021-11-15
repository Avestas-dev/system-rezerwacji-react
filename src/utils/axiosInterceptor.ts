import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = 'https://projektkam.pl/'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error && error.request && error.request.status === 403) {
      window.location.href = 'https://projektkam.pl/unauthorized'
    }
    return Promise.reject(error)
  },
)

axios.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem('token')
  if (config && config.headers) config.headers['Authorization'] = token || ''
  return config
})
