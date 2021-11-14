import React from 'react'
import { Route, Switch } from 'react-router'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Owner from '../pages/Owner'
import Register from '../pages/Register'
import Specialists from '../pages/Specialists'
import Unauthorized from '../pages/Unauthorized'
import SpecialistAddVisit from '../pages/SpecialistAddVisit'

import SpecialistsList from '../pages/SpecialistsList'
import OwnerAddSpecialist from '../pages/OwnerAddSpecialist'
import SpecialistVisits from '../pages/SpecialistVisits'
import SpecialistRemoveVisits from '../pages/SpecialistRemoveVisits'
import UserSpecialistVisits from '../pages/UserSpecialistVisits'
import UserReservations from '../pages/UserReservations'

const Navigation = () => {
  return (
    <Switch>
      {/* common */}
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/unauthorized" component={Unauthorized} exact />
      {/* user */}
      <Route path="/specialists" component={Specialists} exact />
      <Route path="/specialist-visits/:id" component={UserSpecialistVisits} exact />
      <Route path="/logout" component={Logout} exact />
      <Route path="/user-reservations" component={UserReservations} exact />
      {/* specialists */}
      <Route path="/add-visit" component={SpecialistAddVisit} exact />
      <Route path="/show-visits" component={SpecialistVisits} exact />
      <Route path="/specialists-list" component={SpecialistsList} exact />
      <Route path="/delete-visits" component={SpecialistRemoveVisits} exact />
      {/* owner */}
      <Route path="/owner" component={Owner} exact />

      <Route path="/specialist-add" component={OwnerAddSpecialist} exact />
    </Switch>
  )
}

export default Navigation
