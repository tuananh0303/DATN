import LogoIcon from '@/assets/Logo.svg'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  const handleNavigateHome = () => {
    navigate('/')
  }
  return (
    <footer className="bg-[#2C3E50] px-8 tables:px-32 w-full h-fit bg-footerColor pt-5 pb-2 text-slate-300">
      <div className='flex flex-col gap-10 md:flex-row md:justify-start xl:gap-14'>
        <div className='text-sm'>
          <img src={LogoIcon} className='w-56 cursor-pointer' onClick={handleNavigateHome} />
          <p className='mt-10'>Địa chỉ: 268 Lý Thường kiệt, Phường 14, Quận 10, TP. HCM</p>
          <p className='mt-3'>SĐT: 0367459330</p>
          <p className='mt-3 mb-5'>Email: tan@company.com</p>
        </div>
        <div className='flex flex-row gap-10 md:flex-col md:mt-5 lg:flex-row lg:justify-start lg:mt-20 xl:gap-20'>
          <div>
            <h3 className='text-lg font-bold'>Quy định và chính sách</h3>
          </div>
          <div>
            <h3 className='text-lg font-bold'>Liên kết nhanh</h3>
          </div>
        </div>
      </div>
      <div className='w-fit mx-auto pt-2 border-t border-slate-500'>
        <p className='text-center text-xs'>Copyright © 2025 - TAN SPORT. All rights reserved. Designed by TAN</p>
      </div>
    </footer>
  )
}

export default Footer