import React from 'react'
import 'tailwindcss/tailwind.css'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Specialists from './pages/Specialists'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/specialists" component={Specialists} exact />
        </Switch>
      </main>
    </QueryClientProvider>
  )
}

export default App
