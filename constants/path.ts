export const BASE_PATHS = {
  admin: {
    path: '/admin',
    users: {
      path: '/admin/users',
      create: '/admin/users/create',
      detail: (id: string) => `/admin/users/${id}`
    },
    projects: {
      path: '/admin/projects',
      create: '/admin/projects/create',
      detail: (id: string) => `/admin/projects/${id}`
    },
    posts: {
      path: '/admin/posts',
      create: '/admin/posts/create',
      detail: (id: string) => `/admin/posts/${id}`
    },
    dashboard: '/admin/dashboard'
  }
}
