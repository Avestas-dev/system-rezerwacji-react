import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
import Specialists from '../pages/Specialists'
import Unauthorized from '../pages/Unauthorized'

const Navigation = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/specialists" component={Specialists} exact />
      <Route path="/unauthorized" component={Unauthorized} exact />
      <Route path="/logout" component={Logout} exact />
    </Switch>
  )
}

export default Navigation
