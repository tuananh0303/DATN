import FacilityCard from '@/components/UI/FacilityCard'
import { useState, useRef, useEffect } from 'react'
import EventImage from '@/assets/event.png'
import ArrowIcon from '@/assets/arrow.svg'


import BadmintonIcon from '@/assets/badminton.svg'
import BasketballIcon from '@/assets/basketball.svg'
import FootballIcon from '@/assets/football.svg'
import PingPongIcon from '@/assets/ping-pong.svg'
import SwimmingIcon from '@/assets/swimming.svg'
import AvatarImage from '@/assets/avatar-robber.jpg'
import Testimonial from '@/components/users/Testimonial'
import { data } from 'react-router-dom'

const sportIcons = [BadmintonIcon, BasketballIcon, PingPongIcon, FootballIcon, SwimmingIcon]

const DUMMYDATA = [
  {
    id: '01',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức 01',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  },
  {
    id: '02',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức  02',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  },
  {
    id: '03',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức 03',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  },
  {
    id: '04',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức 04',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  },
  {
    id: '05',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức 05',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  },
  {
    id: '06',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức 06',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  }
]

const testimonialData = [
  {
    image: AvatarImage,
    userName: 'Dương Văn Nghĩa',
    testimonial: 'Website được thiết kế chuyên nghiệp, giao diện thân thiện với người dùng, nội dung phong phú và tốc độ tải trang nhanh, mang lại trải nghiệm tuyệt vời cho người truy cập.'
  },
  {
    image: AvatarImage,
    userName: 'Nguyễn Tuấn Anh',
    testimonial: 'Giao diện dễ sử dụng, đặt sân nhanh chóng và tiện lợi. Sẽ tiếp tục sử dụng dịch vụ này!'
  },
  {
    image: AvatarImage,
    userName: 'Dương Văn A',
    testimonial: 'Nhiều lựa chọn sân bãi, giá cả hợp lý. Hỗ trợ khách hàng rất nhiệt tình!'
  },
  {
    image: AvatarImage,
    userName: 'Nguyễn Văn C',
    testimonial: 'Nhiều lựa chọn sân bãi, giá cả hợp lý. Hỗ trợ khách hàng rất nhiệt tình!'
  }
]

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [width, setWidth] = useState<number>(window.innerWidth)

  const handleNext = () => {
    if (width >= 1024) {
      setCurrentIndex(preIndex => preIndex >= DUMMYDATA.length - 3 ? 0 : preIndex + 1)
    } else if (width >= 768) {
      setCurrentIndex(preIndex => preIndex >= DUMMYDATA.length - 2 ? 0 : preIndex + 1)
    } else {
      setCurrentIndex(preIndex => preIndex >= DUMMYDATA.length - 1 ? 0 : preIndex + 1)
    }
  }

  const handlePre = () => {
    if (width >= 1024) {
      setCurrentIndex(preIndex => preIndex === 0 ? DUMMYDATA.length - 3 : preIndex -1)
    } else if (width >= 768) {
      setCurrentIndex(preIndex => preIndex === 0 ? DUMMYDATA.length - 2 : preIndex -1)
    } else {
      setCurrentIndex(preIndex => preIndex === 0 ? DUMMYDATA.length - 1 : preIndex -1)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setCurrentIndex(0)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='px-8 tables:px-32'>
      <div className='py-5 border-b border-slate-300'>
        <h2 className='text-xl tables:text-2xl font-bold'>Sự kiện</h2>
        <img src={EventImage} alt="event" className='object-contain mx-auto mt-5'/>
      </div>
      <div className='py-5 border-b border-slate-300'>
        <h2 className='text-xl tables:text-2xl font-bold'>Cơ sở hàng đầu</h2>
        <div className='relative mt-5 w-72 md:w-[37rem] lg:w-[56rem] mx-auto'>
          {/* faciliti card */}
          <div className='overflow-hidden w-full'>
            <div className='flex flex-row gap-4 transition-transform duration-500' style={{ transform: `translateX(-${currentIndex*304}px)` }}>
              { DUMMYDATA.map(data => <FacilityCard key={data.id} {...data} />) }
            </div>
          </div>
          {/* left arrow button */}
          <div onClick={handlePre} className='absolute top-24 -left-20 border p-2 rounded-xl border-slate-400 cursor-pointer hover:border-0 hover:bg-blue-500' >
            <img src={ArrowIcon} className='w-10 h-10 z-10 fill-white' />
          </div>
          {/* right arrow button */}
          <div onClick={handleNext} className='absolute top-24 -right-20 border p-2 rounded-xl border-slate-400 cursor-pointer hover:border-0 hover:bg-blue-500'>
            <img src={ArrowIcon} className='w-10 h-10 z-10 fill-white rotate-180' />
          </div>
        </div>
      </div>
      <div className='py-5'>
        <h2 className='text-xl tables:text-2xl font-bold'>Nhận xét của khách hàng</h2>
        <div className='mt-5 flex flex-col md:flex-row md:flex-wrap justify-center gap-5 mb-10'>
          { testimonialData.map(data => <Testimonial key={data.userName} {...data} />)}
        </div>
      </div>
    </div>
  )
}

export default HomePage