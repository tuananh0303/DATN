import React from 'react';

interface ContentProps {
  style?: React.CSSProperties;
}

const PlaySchedule: React.FC<ContentProps> = () => {
  return (
    <div className="flex flex-col min-w-[320px] w-full bg-[#f5f6fa]" >
    
      {/* Main Content */}
      <div className="p-5 flex-grow">
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <div className="flex flex-col gap-2.5">
            <select className="w-full max-w-[416px] h-10 px-5 py-3 border border-black/70 rounded-[15px] font-roboto text-lg bg-white">
              <option>Sân cầu lông Phạm Kha</option>
            </select>
            <select className="w-full max-w-[416px] h-10 px-5 py-3 border border-black/70 rounded-[15px] font-roboto text-lg bg-white">
              <option>Cầu lông</option>
            </select>
          </div>

          <div className="relative w-full max-w-[450px]">
            <input 
              type="text" 
              placeholder="Tìm kiếm tên người chơi"
              className="w-full h-[45px] px-[18px] border border-[#d5d5d5] rounded-[19px] font-nunito text-sm" 
            />
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/search.png" 
              alt="Search"
              className="absolute right-[18px] top-1/2 -translate-y-1/2" 
            />
          </div>

          <div className="flex gap-2.5">
            <button className="w-full max-w-[122px] h-11 bg-white border border-black rounded font-roboto text-xl cursor-pointer">
              Hôm nay
            </button>
            <div className="w-full max-w-[270px] h-[45px] flex items-center justify-center gap-5 bg-white border border-black">
              <span>02/10/2024</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z7ftPkre4WBji0Ua/drop-dow-5.png" alt="Calendar" />
            </div>
          </div>

          <button className="px-2.5 py-2.5 bg-[#197dfe] text-white rounded font-roboto text-xl font-bold tracking-wider cursor-pointer">
            Đặt sân
          </button>
          <span className="font-roboto text-sm font-bold text-[#f90000] underline cursor-pointer">
            Lịch sử đặt sân
          </span>
        </div>

        <div className="bg-white rounded-[20px] p-5 overflow-x-auto">
          <div className="flex border-b border-[#e1e1e1]">
            <div className="w-[91px] h-[38px] flex items-center justify-center font-roboto text-sm font-medium border-r border-[#e1e1e1]">
              Thời gian/sân
            </div>
            {[1, 2, 3, 4, 5, 6, 7].map(court => (
              <div key={court} className="w-[150px] h-[38px] flex items-center justify-center border-r border-[#e1e1e1]">
                <div className="flex items-center gap-[5px]">
                  <div className="w-2.5 h-2.5 bg-[#20b202] rounded-full"></div>
                  <span>Sân {court}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="time-slots">
            {/* Time slots will be rendered here */}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PlaySchedule;

