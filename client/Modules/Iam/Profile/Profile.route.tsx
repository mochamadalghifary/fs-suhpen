import React from 'react'
import { Route } from 'react-router-dom'
import Profile from './Profile'
import ProfileForm from './ProfileForm'

export const routesProfile = {
  Profile: '/profile',
  ProfileEdit: '/profile/edit',
}

export default [
  <Route
    key={routesProfile.Profile}
    path={routesProfile.Profile}
    element={<Profile />}
  />,
  <Route
    key={routesProfile.ProfileEdit}
    path={routesProfile.ProfileEdit}
    element={<ProfileForm />}
  />,
]
