import LoginBackgroundImage from '@/assets/login-background.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isEmail, isPassword } from '@/utils/checkInput'
import UserHeader from '@/components/users/UserHeader/UserHeader'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassowrd] = useState<string>('')
  const [role, setRole] = useState<string>('')

  const correctEmail = isEmail(email)
  const correctPassword = isPassword(password)

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassowrd(event.target.value)
  }

  return (
    <div
      style={{ backgroundImage: `url(${LoginBackgroundImage})` }}
      className='min-h-screen bg-no-repeat bg-cover bg-center p-5'
    >
      <div className='max-w-2xl h-fit mx-auto p-5'>
        <form className='space-y-5 bg-white p-10 rounded-xl'>
          <div className='flex justify-center'>
            <h2 className='text-3xl font-bold'>Đăng nhập</h2>
          </div>
          <div className=' flex flex-row justify-around'>
            <div className='flex flex-row gap-2'>
              <input type='radio' name='role' id='owner' value='owner' />
              <label htmlFor='owner'>Chủ sân</label>
            </div>
            <div className='flex flex-row gap-2'>
              <input type='radio' name='role' id='player' value='player' />
              <label htmlFor='player'>Người chơi</label>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              name='email'
              className='bg-inputField w-full h-12 rounded-lg px-5 focus:bg-white'
              value={email}
              onChange={handleChangeEmail}
            />
            { email.length !== 0 && !correctEmail && <p className='text-sm text-red-600'>Nhập sai định dạng email</p> }
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='password'>Mật khẩu</label>
            <input
              type='password'
              id='password'
              name='password'
              className='bg-inputField w-full h-12 rounded-lg px-5 focus:bg-white'
              value={password}
              onChange={handleChangePassword}
            />
            { password.length !== 0 && !correctPassword && <p className='text-sm text-red-600'>Nhập sai định dạng mật khẩu</p>}
          </div>
          <div>
            <Link to={'#'} className='font-semibold hover:text-blue-500'>Quên mật khẩu?</Link>
          </div>
          <div className='flex flex-col items-center w-full gap-3'>
            <button className='bg-blue-500 text-white w-3/4 h-12 rounded-lg hover:bg-blue-700 hover:ring-1 active:ring-blue-900'>Đăng nhập</button>
            <Link to={'/register'} className=' font-semibold hover:text-blue-500'>Bạn chưa có tài khoản?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage