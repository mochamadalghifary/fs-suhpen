import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Route as HttpRoute } from './Enums/Route'
import MainLayout from './Layouts/MainLayout/MainLayout'
import Login from './Modules/Auth/Login'
import Register from './Modules/Auth/Register'
import Dashboard from './Modules/Dashboard/Dashboard'
import NotFound from './Modules/NotFound'
import Profile from './Modules/Profile/Profile'
import UserDetail from './Modules/User/UserDetail'
import UserForm from './Modules/User/UserForm'
import Users from './Modules/User/Users'

const Routers: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes>
        {/* <Route path={HttpRoute.Home} element={<Home />} /> */}
        <Route path={HttpRoute.Login} element={<Login />} />
        <Route path={HttpRoute.Register} element={<Register />} />
      </Routes>

      <MainLayout>
        <Routes>
          {/* <--- Dashboard ---> */}

          <Route path={HttpRoute.Dashboard} element={<Dashboard />} />

          {/* <--- Profile ---> */}

          <Route path={HttpRoute.Profile} element={<Profile />} />
          <Route path={HttpRoute.ProfileEdit} element={<Profile />} />

          {/* <--- User ---> */}

          <Route path={HttpRoute.Users} element={<Users />} />
          <Route path={HttpRoute.UserForm} element={<UserForm />} />
          <Route path={HttpRoute.UserDetail} element={<UserDetail />} />
          <Route path={HttpRoute.UserEdit} element={<UserForm />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </>
)

export default Routers
