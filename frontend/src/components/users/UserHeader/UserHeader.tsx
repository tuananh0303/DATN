import SearchBar from './SearchBar/SearchBar'
import NavBar from './NavBar'
import Logo from '@/assets/Logo.svg'
import { useNavigate } from 'react-router-dom'

const UserHeader = () => {
  const navigate = useNavigate()

  const handleHomeNavigate = () => {
    navigate('/')
  }

  return (
    <header className="w-full px-8 py-2 tables:px-32 flex flex-row justify-between items-start border-b border-black">
      {/* Logo */}
      <img src={Logo} className='object-fill h-14 cursor-pointer' onClick={handleHomeNavigate} />
      {/* SearchBar */}
      {/* <div className='w-190.75'>
        <SearchBar />
      </div> */}
      <div>
        <NavBar />
      </div>
    </header>
  )
}

export default UserHeader