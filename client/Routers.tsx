import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutMain from './Layouts/MainLayout/LayoutMain'
import Dashboard from './Modules/Dashboard/Dashboard'
import DashboardRoute from './Modules/Dashboard/Dashboard.route'
import { authAction } from './Modules/Iam/Auth/auth.action'
import AuthRoute from './Modules/Iam/Auth/Auth.route'
import ProfileRoute from './Modules/Iam/Profile/Profile.route'
import Unauthorized from './Modules/Unauthorized'

const user = authAction.loggedUser()

const Routers: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes>
        {/* <Route path={HttpRoute.Home} element={<Home />} /> */}
        {AuthRoute}
        {!user && <Route path="*" element={<Unauthorized />} />}
      </Routes>

      {user && (
        <LayoutMain>
          <Routes>
            {DashboardRoute}
            {ProfileRoute}
            {/* {UserRoute}
            {RoleRoute} */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </LayoutMain>
      )}
    </BrowserRouter>
  </>
)

export default Routers
