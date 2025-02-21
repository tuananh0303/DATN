import FacilityCard from '@/components/UI/FacilityCard'
import EventImage from '@/assets/event.png'
import ArrowIcon from '@/assets/arrow.svg'


import BadmintonIcon from '@/assets/badminton.svg'
import BasketballIcon from '@/assets/basketball.svg'
import FootballIcon from '@/assets/football.svg'
import PingPongIcon from '@/assets/ping-pong.svg'
import SwimmingIcon from '@/assets/swimming.svg'
import { data } from 'react-router-dom'

const sportIcons = [BadmintonIcon, BasketballIcon, PingPongIcon, FootballIcon, SwimmingIcon]

const DUMMYDATA = [
  {
    id: '01',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  },
  {
    id: '02',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  },
  {
    id: '03',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  },
  {
    id: '04',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  },
  {
    id: '05',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  },
  {
    id: '06',
    facilityName: 'Thể thao 247 - cơ sở Thủ Đức',
    sportIcons: sportIcons,
    startTime: '5:00',
    endTime: '22:00',
    location: 'phường linh Trung, Thủ Đức, Tp. HCM',
    ratingScore: 4.8,
    quantityRating: 8
  }
]

const HomePage = () => {
  return (
    <div className='px-8 tables:px-32'>
      <div className='py-5 border-b border-slate-300'>
        <h2 className='text-xl tables:text-2xl font-bold'>Sự kiện</h2>
        <img src={EventImage} alt="event" className='object-contain mx-auto mt-5'/>
      </div>
      <div className='py-5 border-b border-slate-300'>
        <h2 className='text-xl tables:text-2xl font-bold'>Cơ sở hàng đầu</h2>
        <div className='relative mt-5'>
          {/* left arrow button */}
          <div className='absolute top-24 left-3 border p-2 rounded-xl border-slate-400 cursor-pointer hover:border-0 hover:bg-white'>
            <img src={ArrowIcon} className='w-10 h-10 z-10 fill-white' />
          </div>
          {/* fciliti card */}
          <div className='flex flex-row gap-4 overflow-hidden'>
            {DUMMYDATA.map(data => <FacilityCard key={data.id} {...data} />)}
          </div>
          {/* right arrow button */}
          <div className='absolute top-24 right-3 border p-2 rounded-xl border-slate-400 cursor-pointer hover:border-0 hover:bg-white'>
            <img src={ArrowIcon} className='w-10 h-10 z-10 fill-white rotate-180' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage