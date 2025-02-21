import Footer from '@/components/users/Footer'
import UserHeader from '@/components/users/UserHeader/UserHeader'
import { Outlet } from 'react-router-dom'

const UserRootLayout = () => {
  return (
    <div className='font-main'>
      <UserHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserRootLayout