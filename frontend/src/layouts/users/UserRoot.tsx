import UserHeader from '@/components/users/UserHeader/UserHeader'
import { Outlet } from 'react-router-dom'

const UserRootLayout = () => {
  return (
    <div className='font-main'>
      <UserHeader />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default UserRootLayout