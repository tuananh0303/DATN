import React from 'react';

interface Facility {
  name: string;
  location: string;
  openingHours: string;
  status: 'active' | 'maintenance' | 'pending';
  image: string;
}

const Header_FacilityList_Footer: React.FC = () => {
  const facilities: Facility[] = [
    {
      name: 'Sân cầu lông Phạm Kha',
      location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
      openingHours: '5:00 - 23:00',
      status: 'active',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/rectangl.png'
    },
    {
      name: 'Sân cầu lông Phạm Kha',
      location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh', 
      openingHours: '5:00 - 23:00',
      status: 'active',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/rectangl-2.png'
    },
    {
      name: 'Sân cầu lông Phạm Kha',
      location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
      openingHours: '5:00 - 23:00',
      status: 'maintenance',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/rectangl-3.png'
    },
    {
      name: 'Sân cầu lông Phạm Kha',
      location: 'Bình Chánh, tp Hồ Chí Minh',
      openingHours: '5:00 - 23:00',
      status: 'pending',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/rectangl-4.png'
    },
    {
      name: 'Sân cầu lông Phạm Kha', 
      location: 'Bình Chánh, tp Hồ Chí Minh',
      openingHours: '5:00 - 23:00',
      status: 'maintenance',
      image: 'https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/rectangl-5.png'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'text-[#20b202]';
      case 'maintenance': return 'text-[#c24008]';
      case 'pending': return 'text-[#d2c209]';
      default: return '';
    }
  };

  return (
    <div className="p-5 bg-white max-w-[1204px] mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-roboto text-2xl font-semibold tracking-wider">Cơ sở thể thao của bạn</h1>
        <button className="bg-[#197dfe] text-white rounded px-5 py-2.5 font-roboto text-base cursor-pointer transition-colors hover:bg-[#0066e8]">
          Tạo cơ sở mới
        </button>
      </div>

      <div className="flex gap-5 mb-5">
        <div className="px-[30px] py-[15px] rounded bg-[rgba(68,143,240,0.13)] text-[#448ff0] font-opensans font-bold text-[15px] cursor-pointer">
          Tất cả cơ sở
        </div>
        {['Đang hoạt động', 'Đang bảo trì', 'Đang chờ phê duyệt'].map((filter) => (
          <div key={filter} className="px-[30px] py-[15px] rounded font-opensans font-bold text-[15px] cursor-pointer">
            {filter}
          </div>
        ))}
      </div>

      <div className="bg-[#fdfdfd] rounded-[15px] overflow-hidden">
        <div className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr] p-5 bg-[rgba(68,143,240,0.7)] border-b border-[#d8d8d880]">
          {['Cơ sở', 'Vị trí', 'Giờ mở cửa', 'Trạng thái', 'Thao tác'].map((header) => (
            <div key={header} className="font-opensans font-bold text-[15px]">{header}</div>
          ))}
        </div>

        {facilities.map((facility, index) => (
          <div key={index} className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr] p-5 border-b border-[#d8d8d880] bg-white">
            <div className="flex items-center gap-[5px] font-opensans text-sm">
              <img src={facility.image} alt="Facility" className="w-[62px] h-[51px] object-cover" />
              <span>{facility.name}</span>
            </div>
            <div className="font-nunito text-sm">{facility.location}</div>
            <div className="font-nunito text-sm">{facility.openingHours}</div>
            <div className={`font-nunito font-extrabold text-sm ${getStatusColor(facility.status)}`}>
              {facility.status === 'active' && 'Đang hoạt động'}
              {facility.status === 'maintenance' && 'Đang bảo trì'}
              {facility.status === 'pending' && 'Đang chờ phê duyệt'}
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-[#fafbfd] border-[0.6px] border-[#d5d5d5] rounded-lg p-3 cursor-pointer transition-colors hover:bg-[#f0f0f0]">
                <img src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/edit.png" alt="Edit" className="w-5 h-5" />
              </button>
              <div className="w-[1px] h-8 bg-[#d8d8d880] opacity-70"></div>
              <button className="bg-[#fafbfd] border-[0.6px] border-[#d5d5d5] rounded-lg p-3 cursor-pointer transition-colors hover:bg-[#f0f0f0]">
                <img src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/bin.png" alt="Delete" className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-5 py-5 bg-[#e6e6e6]">
        <div className="flex justify-between items-center px-5 font-roboto text-sm leading-4 text-[#191919]">
          <span>Copyright © 2023 Safelet. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#5858fa] font-bold no-underline">Terms of Use</a>
            <div className="w-[1px] h-5 bg-black"></div>
            <a href="#" className="text-[#5858fa] font-bold no-underline">Privacy Policy</a>
          </div>
          <span>Hand Crafted & made with Love</span>
        </div>
      </footer>
    </div>
  );
};

export default Header_FacilityList_Footer;

