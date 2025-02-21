import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserRootLayout from '@/layouts/users/UserRoot'
import HomePage from '@/pages/Home'
import LoginPage from '@/pages/Login'
import RegisterPage from '@/pages/Register'
import FacilityCard from './components/UI/FacilityCard'

import BadmintonIcon from '@/assets/badminton.svg'
import BasketballIcon from '@/assets/basketball.svg'
import FootballIcon from '@/assets/football.svg'
import PingPongIcon from '@/assets/ping-pong.svg'
import SwimmingIcon from '@/assets/swimming.svg'

const sportIcons = [BadmintonIcon, BasketballIcon, PingPongIcon, FootballIcon, SwimmingIcon]

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserRootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  },
  {
    path: 'test',
    element: <div className='flex bg-white min-h-screen justify-center items-center'>
      <FacilityCard facilityName='Thể thao 247 - cơ sở Thủ Đức' sportIcons={sportIcons} startTime='5:00' endTime='22:00' location='phường linh Trung, Thủ Đức, Tp. HCM' ratingScore={4.8} quantityRating={8} />
    </div>
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
