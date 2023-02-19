import React from 'react'
import { Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

export const routesAuth = {
  Login: '/auth/login',
  Register: '/auth/register',
  Logout: '/auth/logout',
}

export default [
  <Route path={routesAuth.Login} element={<Login />} />,
  <Route path={routesAuth.Register} element={<Register />} />,
]
