import React from 'react'

const Admin = React.lazy(() => import('./pages/admin/Index'))


const routes = [
  { path: '/', exact: true, name: 'Home', element: Admin },
]

export default routes
