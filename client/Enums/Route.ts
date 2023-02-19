import { routesDashboard } from '../Modules/Dashboard/Dashboard.route'
import { routesAuth } from '../Modules/Iam/Auth/Auth.route'
import { routesProfile } from '../Modules/Iam/Profile/Profile.route'
import { routesRole } from '../Modules/Iam/Role/Role.route'
import { routesUser } from '../Modules/Iam/User/User.route'

export const Route = {
  Home: '/',
  Attachment: '/attachments',

  ...routesDashboard,
  ...routesAuth,
  ...routesProfile,
  ...routesUser,
  ...routesRole,

  // <--- Feature --->
}
