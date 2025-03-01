import React from 'react';

const TopNavigationBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between h-[77px] w-full max-w-[1204px] bg-white border-b border-[#e8e8e8] px-5 box-border">
      <div className="relative flex-grow max-w-[540px] mr-5">
        <input 
          type="text" 
          placeholder="Tìm kiếm cơ sở theo tên hoặc địa điểm"
          className="w-full h-10 px-10 border-[0.6px] border-[#d5d5d5] rounded-[19px] font-nunito text-sm text-[#202224] box-border placeholder:opacity-50 hover:border-[#007bff] focus:border-[#007bff] focus:outline-none"
        />
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/search.png" 
          alt="Search" 
          className="absolute right-[18px] top-1/2 -translate-y-1/2 w-5 h-[22px] opacity-60" 
        />
      </div>
      
      <div className="flex items-center gap-5">
        <div className="relative">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/notifica.png" 
            alt="Notifications" 
            className="w-[27px] h-[27px] hover:opacity-80 cursor-pointer"
          />
          <div className="absolute -top-[5px] -right-[5px] bg-[#f93c65] rounded-full w-4 h-[17.6px] flex items-center justify-center">
            <span className="text-white font-nunito font-bold text-xs">6</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/vietnam.png" 
            alt="Vietnam" 
            className="w-11 h-[42px] hover:opacity-80 cursor-pointer"
          />
          <div className="flex items-center gap-[5px] font-nunito font-semibold text-sm text-[#646464] md:hidden lg:flex">
            <span>Vietnamese</span>
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/drop-dow.png" 
              alt="Dropdown" 
              className="w-2 h-[5px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/man-4380.png" 
            alt="Profile" 
            className="w-11 h-12"
          />
          <div className="flex flex-col lg:flex md:hidden">
            <div className="font-nunito font-bold text-sm text-[#404040]">Moni Roy</div>
            <div className="font-nunito font-semibold text-xs text-[#565656]">Admin</div>
          </div>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7mynVCHtJJZ6wBl/more.png" 
            alt="More" 
            className="w-[18px] h-5 cursor-pointer hover:opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default TopNavigationBar;

