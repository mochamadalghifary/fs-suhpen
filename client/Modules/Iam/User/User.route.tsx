import React from 'react'
import { Route } from 'react-router-dom'
import UserDetail from './UserDetail'
import UserForm from './UserForm'
import UserS from './UserS'

export const routesUser = {
  Users: '/users',
  UserDetail: '/users/:id',
  UserForm: '/users/save',
  UserEdit: '/users/save/:id',
}

export default [
  <Route path={routesUser.Users} element={<UserS />} />,
  <Route path={routesUser.UserForm} element={<UserForm />} />,
  <Route path={routesUser.UserDetail} element={<UserDetail />} />,
  <Route path={routesUser.UserEdit} element={<UserForm />} />,
]
