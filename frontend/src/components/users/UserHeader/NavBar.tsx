import TogleColumn from '@/assets/toggle-column.svg'
import PersonCropCircle from '@/assets/person-crop-circle.svg'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

const NavBar = () => {
  const [isExpand, setIsExpand] = useState<boolean>(false)
  const divRef = useRef<HTMLDivElement>(null)

  const handleExpand = () => {
    setIsExpand(preState => !preState)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!divRef.current?.contains(event.target as Node)) {
        setIsExpand(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative' ref={divRef}>
      <button onClick={handleExpand} className="h-full flex flex-row justify-around items-center gap-3 border border-slate-300 py-1 px-4 rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-transform duration-150">
        <img src={TogleColumn} />
        <img src={PersonCropCircle}/>
      </button>
      { isExpand && <div className='absolute border-2 border-slate-300 rounded-xl -left-full right-0 font-semibold bg-white mt-2'>
        <div className='border-b-2'>
          <Link to={'/login'} onClick={handleExpand}><p className='px-3 py-3 hover:bg-blue-500 hover:text-white rounded-t-xl'>Đăng ký</p></Link>
          <Link to={'/register'} ><p className='px-3 py-3 hover:bg-blue-500 hover:text-white'>Đăng nhập</p></Link>
        </div>
        <div>
          <Link to={'#'} onClick={handleExpand}><p className='px-3 py-3 hover:bg-blue-500 hover:text-white'>Thông tin tài khoản</p></Link>
          <Link to={'#'} onClick={handleExpand}><p className='px-3 py-3 hover:bg-blue-500 hover:text-white'>Sân đã đặt</p></Link>
          <Link to={'#'} onClick={handleExpand}><p className='px-3 py-3 hover:bg-blue-500 hover:text-white'>Tin nhắn</p></Link>
          <Link to={'#'} onClick={handleExpand}><p className='px-3 py-3 hover:bg-blue-500 hover:text-white rounded-b-xl'>Đăng xuất</p></Link>
        </div>
      </div> }
    </div>
  )
}

export default NavBar