import LoginBackgroundImage from '@/assets/login-background.png'
import UserHeader from '@/components/users/UserHeader/UserHeader'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${LoginBackgroundImage})` }}
      className='min-h-screen bg-no-repeat bg-cover bg-center pt-5'
    >
      <div className='max-w-2xl h-fit mx-auto p-5'>
        <form className='space-y-5 bg-white p-10 rounded-xl'>
          <div className='flex justify-center'>
            <h2 className='text-3xl font-bold'>Đăng ký</h2>
          </div>
          <div className=' flex flex-row justify-around'>
            <div className='flex flex-row gap-2'>
              <input type='radio' name='role' id='owner' />
              <label htmlFor='owner'>Chủ sân</label>
            </div>
            <div className='flex flex-row gap-2'>
              <input type='radio' name='role' id='player' />
              <label htmlFor='player'>Người chơi</label>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' name='email' className='bg-inputField w-full h-12 rounded-lg px-5 focus:bg-white' />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='phoneNumber'>Số điện thoại</label>
            <input type='text' id='phoneNumber' name='phoneNumber' className='bg-inputField w-full h-12 rounded-lg px-5 focus:bg-white' />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='name'>Họ và tên</label>
            <input type='text' id='name' name='name' className='bg-inputField w-full h-12 rounded-lg px-5 focus:bg-white' />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='password'>Mật khẩu</label>
            <input type='text' id='password' name='password' className='bg-inputField w-full h-12 rounded-lg px-5 focus:bg-white' />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='retypePassword'>Nhập lại mật khẩu</label>
            <input type='text' id='retypePassword' name='retypePassword' className='bg-inputField w-full h-12 rounded-lg px-5 focus:bg-white' />
          </div>
          <div className='flex flex-row items-center gap-2'>
            <input id='accept' type='checkbox' className='h-4 w-4 accent-blue-500' />
            <label htmlFor='accept'>Đồng ý với TAN về <Link to={'#'} className='text-blue-500'>Điều khoản dịch vụ</Link> và <Link to={'#'} className='text-blue-500'>Chính sách bảo mật</Link></label>
          </div>
          <div className='flex justify-center'>
            <button className='bg-blue-500 text-white w-3/4 h-12 rounded-lg hover:bg-blue-700 hover:ring-1 active:ring-blue-900'>
              Đăng ký
            </button>
          </div>
          <div className='flex flex-row justify-center gap-2'>
            <p className='text-gray-500'>Bạn đã có tài khoản?</p>
            <Link to={'/login'} className='hover:text-blue-500'>Đăng nhập</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage