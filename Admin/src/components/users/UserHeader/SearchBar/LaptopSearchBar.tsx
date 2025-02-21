import SelectedField from '@/components/UI/SelectedField'

import SearchIcon from '@/assets/search.svg'
import BadmintonIcon from '@/assets/badminton.svg'
import BasketballIcon from '@/assets/basketball.svg'
import FootballIcon from '@/assets/football.svg'
import PingPongIcon from '@/assets/ping-pong.svg'
import SwimmingIcon from '@/assets/swimming.svg'

const DUMMYDATA_TIME = [
  { id: '01', name: '30 phút' },
  { id: '02', name: '60 phút' },
  { id: '03', name: '90 phút' },
  { id: '04', name: '120 phút' },
  { id: '05', name: '150 phút' },
  { id: '06', name: '180 phút' }
]

const DUMMYDATA__SPORT = [
  { id: '01', name: 'Bóng đá', icon: FootballIcon },
  { id: '02', name: 'Bóng rổ', icon: BasketballIcon },
  { id: '03', name: 'Bóng bàn', icon: PingPongIcon },
  { id: '04', name: 'Bơi lội', icon: SwimmingIcon },
  { id: '05', name: 'Cầu lông', icon: BadmintonIcon }
]

const LaptopSearchBar = () => {
  return (
    // <div></div>
    <div className="flex flex-row justify-center border-2 border-slate-400 px-5 py-2 rounded-full w-full gap-5">
      {/* Search properties */}
      <div className="grid grid-cols-12 items-center w-full">
        <div className=" col-span-5 flex flex-col">
          <p className="font-semibold">Địa điểm</p>
          <input type="text" placeholder="Nhập địa điểm tìm kiếm" className="font-semibold placeholder:font-normal focus:outline-none" />
        </div>
        <div className="col-span-2 flex flex-col px-2">
          <SelectedField title='Loại hình' placeholder='Chọn loại hình' selectedData={DUMMYDATA__SPORT} />
        </div>
        <div className="col-span-3 flex flex-col pl-2">
          <p className="font-semibold">Thời gian</p>
          <input type="text" placeholder="Chọn thời gian bắt đầu" className="font-semibold placeholder:font-normal focus:outline-none" />
        </div>
        <div className="col-span-2 flex flex-col pl-2">
          <SelectedField title='Giờ chơi' placeholder='Chọn thời gian' selectedData={DUMMYDATA_TIME} />
        </div>
      </div>
      {/* Search button */}
      <div>
        {/* large w14 h14; small w8 h8 */}
        <button className='w-14 h-14 shadow-lg flex items-center justify-center bg-blue-500 hover:bg-blue-700 active:bg-blue-900 rounded-full p-1'>
          <img src={SearchIcon} className='w-3/4' />
        </button>
      </div>
    </div>
  )
}

export default LaptopSearchBar