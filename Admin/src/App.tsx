import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './pages/Dashboard/Dashboard'
import UserManagement from './pages/UserManagement/UserManagement'
import UserManagementProfile from './pages/UserManagementprofile/UserManagementProfile'
import ApprovalManagement from './pages/ApprovalManagement/ApprovalManagement';
import FacilityManagement from './pages/FacilityManagement/FacilityManagement';
import FacilityDetailManagement from './pages/FacilityDetail/FacilityDetailManagement';
import FieldManagement from './pages/FieldManagement/FieldManagement';
import FieldDetailManagement from './pages/FieldDetail/FieldDetailManagement';
import ServiceManagement from './pages/ServiceManagement/ServiceManagement';
import VoucherManagementLayout from './pages/VoucherManagement/VoucherManagement';
import EventManagementLayout from './pages/EventManagement/EventManagement';
import ReviewManagementLayout from './pages/ReviewManagement/ReviewManagement';
import SupportManagementLayout from './pages/SupportManagement/SupportManagement';
import ReportManagementLayout from './pages/ReportManagement/ReportManagement';


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
  },
  {
    path: '/FacilityManagement',
    element: <FacilityManagement />, 
  },
  {
    path: '/FacilityDetailManagement',
    element: <FacilityDetailManagement />, 
  },
  {
    path: '/FieldManagement',
    element: <FieldManagement />, 
  },
  {
    path: '/FieldDetail',
    element: <FieldDetailManagement />, 
  },
  {
    path: '/ServiceManagement',
    element: <ServiceManagement />, 
  },
  {
    path: '/VoucherManagement',
    element: <VoucherManagementLayout />, 
  },
  {
    path: '/EventManagement',
    element: <EventManagementLayout />, 
  },
  {
    path: '/ReviewManagement',
    element: <ReviewManagementLayout />, 
  },
  {
    path: '/SupportManagement',
    element: <SupportManagementLayout />, 
  },
  {
    path: '/ReportManagement',
    element: <ReportManagementLayout />, 
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
