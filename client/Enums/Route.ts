export type RouteType = {
  permissions: string[]
  name: string
  href: string
  icon?: any
}

export type RouteListType = RouteType & {
  items?: RouteType[]
}

export const Route = {
  // <--- IAM --->

  Home: '/',
  Dashboard: '/dashboard',

  Login: '/auth/login',
  Register: '/auth/register',
  Logout: '/auth/logout',

  Profile: '/profile',
  ProfileEdit: '/profile/edit',

  Roles: '/roles',

  Users: '/users',
  UserDetail: '/users/:id',
  UserForm: '/users/save',
  UserEdit: '/users/save/:id',

  Attachment: '/attachments',

  // <--- Feature --->
}
