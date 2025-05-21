import LogoIcon from '@/assets/Logo.svg'
import { useNavigate } from 'react-router-dom'
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons'

const Footer = () => {
  const navigate = useNavigate()

  const handleNavigateHome = () => {
    navigate('/')
  }

  return (
    <footer className="bg-gradient-to-b from-[#2C3E50] to-[#1a2530] text-white">
      {/* Main footer content */}
      <div className="w-full px-6 pt-14 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <img 
              src={LogoIcon} 
              alt="HI5PORT" 
              className="w-44 md:w-56 h-auto cursor-pointer mb-6 hover:opacity-90 transition-opacity" 
              onClick={handleNavigateHome} 
            />
            
          </div>

          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-5 pb-2 border-b border-gray-600 inline-block">Thông tin liên hệ</h3>
            <div className="space-y-4">
              <p className="flex items-start group">
                <EnvironmentOutlined className="text-lg mr-3 mt-1 text-blue-300 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">405-H6 Block A Tòa nhà Sky Center 5B Phổ Quang, Phường 2, Quận Tân Bình, Thành phố Hồ Chí Minh, Việt Nam</span>
              </p>
              <p className="flex items-center group">
                <PhoneOutlined className="text-lg mr-3 text-blue-300 group-hover:text-blue-400 transition-colors" />
                <a href="tel:0976032687" className="text-sm text-gray-300 hover:text-blue-300 transition-colors">0976032687</a>
              </p>
              <p className="flex items-center group">
                <MailOutlined className="text-lg mr-3 text-blue-300 group-hover:text-blue-400 transition-colors" />
                <a href="mailto:anhhello564@gmail.com" className="text-sm text-gray-300 hover:text-blue-300 transition-colors">anhhello564@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Rules & Policies */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-5 pb-2 border-b border-gray-600 inline-block">Quy định và chính sách</h3>
            <ul className="space-y-3 text-sm">
              <li className="transition-transform duration-300 hover:translate-x-1">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">Hướng dẫn sử dụng</a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-1">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">Quy chế Hoạt động ứng dụng</a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-1">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">Thông tin về thanh toán</a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-1">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">Chính sách bảo mật thông tin cá nhân</a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-1">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">Thông tin chăm sóc khách hàng</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-5 pb-2 border-b border-gray-600 inline-block">Liên kết nhanh</h3>
            <ul className="space-y-3 text-sm">
              <li className="transition-transform duration-300 hover:translate-x-1">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">Trang chủ</a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-1">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">Dành cho đối tác</a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-1">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">Tin tức</a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-1">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">Về chúng tôi</a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-1">
                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">Liên hệ</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-gray-700">
        <div className="w-full px-6 py-5">
          <p className="text-center text-sm text-gray-400">
            Copyright © 2025 – <span className="text-red-500 font-semibold">TAN sport</span>. All rights reserved. Designed by <a href="https://aegona.com" className="text-blue-400 hover:text-blue-300 transition-colors">Aegona</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer