import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Route as HttpRoute } from './Enums/Route'
import MainLayout from './Layouts/MainLayout/MainLayout'
import Dashboard from './Modules/Dashboard/Dashboard'
import Home from './Modules/Home'
import { authAction } from './Modules/Iam/Auth/auth.action'
import Login from './Modules/Iam/Auth/Login'
import Register from './Modules/Iam/Auth/Register'
import Profile from './Modules/Iam/Profile/Profile'
import RoleS from './Modules/Iam/Role/RoleS'
import UserDetail from './Modules/Iam/User/UserDetail'
import UserForm from './Modules/Iam/User/UserForm'
import UserS from './Modules/Iam/User/UserS'
import NotFound from './Modules/NotFound'
import Unauthorized from './Modules/Unauthorized'

const user = authAction.loggedUser()

const Routers: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path={HttpRoute.Home} element={<Home />} />
        <Route path={HttpRoute.Login} element={<Login />} />
        <Route path={HttpRoute.Register} element={<Register />} />
        {!user && <Route path="*" element={<Unauthorized />} />}
      </Routes>

      {user && (
        <MainLayout>
          <Routes>
            {/* <--- Dashboard ---> */}

            <Route path={HttpRoute.Dashboard} element={<Dashboard />} />

            {/* <--- Profile ---> */}

            <Route path={HttpRoute.Profile} element={<Profile />} />
            <Route path={HttpRoute.ProfileEdit} element={<Profile />} />

            {/* <--- User ---> */}

            <Route path={HttpRoute.Users} element={<UserS />} />
            <Route path={HttpRoute.UserForm} element={<UserForm />} />
            <Route path={HttpRoute.UserDetail} element={<UserDetail />} />
            <Route path={HttpRoute.UserEdit} element={<UserForm />} />

            {/* <--- Role ---> */}

            <Route path={HttpRoute.Roles} element={<RoleS />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      )}
    </BrowserRouter>
  </>
)

export default Routers
