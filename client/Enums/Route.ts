import { routesDashboard } from '../Modules/Dashboard/dashboard.route'
import { routesAuth } from '../Modules/Iam/Auth/auth.route'
import { routesProfile } from '../Modules/Iam/Profile/profile.route'
import { routesUser } from '../Modules/Iam/User/user.route'

export const Route = {
  Home: '/',
  Attachment: '/attachments',

  ...routesDashboard,
  ...routesAuth,
  ...routesProfile,
  ...routesUser,

  // <--- Feature --->
}
