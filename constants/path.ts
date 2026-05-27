export const BASE_PATHS = {
  admin: {
    path: '/admin',
    projects: {
      path: '/admin/projects',
      create: '/admin/projects/create',
      detail: (slug: string) => `/admin/projects/${slug}`
    },
    posts: {
      path: '/admin/posts',
      create: '/admin/posts/create',
      detail: (slug: string) => `/admin/posts/${slug}`
    },
    dashboard: '/admin/dashboard'
  }
}
