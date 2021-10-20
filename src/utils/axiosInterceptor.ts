import axios, { AxiosRequestConfig } from 'axios'
// TODO: API URL should come from env variable
axios.defaults.baseURL = 'http://localhost:3001/'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error && error.request && error.request.status === 403) {
      console.log('Forbidden.')
      //TODO: change this to env variable
      window.location.href = 'http://localhost:3000/unauthorized'
    }
    return Promise.reject(error)
  },
)

axios.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem('token')
  if (config && config.headers) config.headers['Authorization'] = token || ''
  return config
})
