import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './pages/Dashboard/Dashboard'
import UserManagement from './pages/UserManagement/UserManagement'
import UserManagementProfile from './pages/UserManagementprofile/UserManagementProfile'
import ApprovalManagement from './pages/ApprovalManagement/ApprovalManagement';


const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />, 
  },
  {
    path: '/usermanagement',
    element: <UserManagement />, 
  },
  {
    path: '/usermanagementprofile',
    element: <UserManagementProfile />, 
  },
  {
    path: '/ApprovalManagement',
    element: <ApprovalManagement />, 
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
