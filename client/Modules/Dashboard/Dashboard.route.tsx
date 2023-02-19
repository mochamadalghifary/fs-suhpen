import React from 'react'
import { Route } from 'react-router-dom'
import Dashboard from './Dashboard'

export const routesDashboard = {
  Dashboard: '/dashboard',
}

export default [
  <Route path={routesDashboard.Dashboard} element={<Dashboard />} />,
]
