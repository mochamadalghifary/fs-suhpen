import React from 'react'
import { Route } from 'react-router-dom'
import RoleS from './RoleS'

export const routesRole = {
  Roles: '/roles',
}

export default [<Route path={routesRole.Roles} element={<RoleS />} />]
