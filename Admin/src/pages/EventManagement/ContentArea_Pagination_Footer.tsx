import React from 'react';

interface ContentAreaProps {
  className?: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ className }) => {
  return (
    <>
      {/* TopBar Section */}
      <div className="flex items-center justify-between px-6 bg-white border-b border-[#e8e8e8] min-w-[1000px] h-[90px]">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/path.png" 
            alt="Logo"
            className="w-6 h-[31px] opacity-90"
          />
          <h1 className="m-0 font-sans text-[40px] font-bold tracking-[1px] text-black">
            Event Management
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Notification */}
          <div className="relative">
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/notifica.png"
              alt="Notification"
              className="w-[27px] h-[27px] cursor-pointer"
            />
            <div className="absolute -top-2 -right-2 w-4 h-5 bg-[#f93c65] rounded-full flex items-center justify-center text-white text-xs font-['Nunito_Sans'] font-bold">
              6
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/flag.png"
              alt="Language"
              className="w-[40px] h-[35px]"
            />
            <span className="font-['Nunito_Sans'] text-sm font-semibold text-[#646464]">
              English
            </span>
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/drop-dow.png"
              alt="Dropdown"
              className="w-2 h-[6px]"
            />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4 cursor-pointer">
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/man-4380.png"
              alt="Profile"
              className="w-11 h-[57px] rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-['Nunito_Sans'] text-sm font-bold text-[#404040]">
                Moni Roy
              </span>
              <span className="font-['Nunito_Sans'] text-xs font-semibold text-[#565656]">
                Admin
              </span>
            </div>
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/more.png"
              alt="More"
              className="w-[18px] h-[23px]"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col w-full min-w-[1200px] bg-[#f5f6fa] ${className}`}>
        {/* Search and Filter Section */}
        <div className="p-[40px_50px]">
          <div className="flex flex-row gap-[35px] items-center mb-10">
            <div className="bg-[#4880ff] bg-opacity-[0.13] px-[35px] py-[9px] rounded border-[0.6px] border-[#d5d5d5]">
              <span className="text-[#4880ff] font-sans text-lg font-medium">System</span>
            </div>
            <div className="px-[35px] py-[9px] rounded border-[0.6px] border-[#d5d5d5] bg-[#fcfdfd]">
              <span className="text-[#2b3034] opacity-40 font-sans text-lg">Owner</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-[540px] h-10 bg-white rounded-[19px] border-[0.6px] border-[#d5d5d5] flex items-center px-[18px]">
            <input 
              placeholder="Search by Event Name"
              className="border-none outline-none w-full font-['Nunito_Sans'] text-sm"
            />
            <img src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/search.png" alt="search" className="w-5 h-[22px]" />
          </div>
        </div>

        {/* Event List */}
        <div className="mx-[50px] bg-[#fdfdfd] rounded-[15px] border border-[#979797]">
          {/* Header */}
          <div className="flex p-[25px_20px] bg-[#448ff0b3] border-b border-[#979797]">
            <div className="w-[20%] font-['Open_Sans'] font-bold text-[15px]">Event Name</div>
            <div className="w-[25%] font-['Open_Sans'] font-bold text-[15px]">Description</div>
            <div className="w-[20%] font-['Open_Sans'] font-bold text-[15px]">Image</div>
            <div className="w-[20%] font-['Open_Sans'] font-bold text-[15px]">Status | Usage time</div>
            <div className="w-[15%] font-['Open_Sans'] font-bold text-[15px]">Action</div>
          </div>

          {/* Event Items */}
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div key={item} className="flex p-[14px_20px] bg-white border-b border-[#979797]">
              <div className="w-[20%] font-['Open_Sans'] font-semibold text-sm">Nguyễn Tuấn Anh</div>
              <div className="w-[25%] font-['Open_Sans'] font-semibold text-sm">Giải cầu lông được diễn ra,....</div>
              <div className="w-[20%] font-['Open_Sans'] font-semibold text-sm">=i&url=u-de-sports-ielts-</div>
              <div className="w-[20%] font-['Open_Sans'] font-bold text-[13px] leading-5">
                In Progress<br />
                20:00 05/12/2024 -<br />
                11:00 08/12/2024
              </div>
              <div className="w-[15%]">
                <div className="flex gap-4 px-3 bg-[#fafbfd] rounded-lg border-[0.6px] border-[#d5d5d5] h-7 items-center">
                  <img src={`https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/error${item > 1 ? `-${item}` : ''}.png`} alt="error" className="w-4 h-4" />
                  <img src={`https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/edit${item > 1 ? `-${item}` : ''}.png`} alt="edit" className="w-5 h-5" />
                  <img src={`https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/bin${item > 1 ? `-${item}` : ''}.png`} alt="delete" className="w-[17px] h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center gap-[10px] my-10">
          <span className="font-['Nunito'] text-base leading-[19px] text-[#c91416]">144 Total</span>
          <div className="flex gap-[14px] p-[5px_10px] bg-white rounded-[10px] items-center">
            <img src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/componen.png" alt="prev" className="w-[30px] h-[30px]" />
            {[1, 2, 3, '...', 12].map((num) => (
              <div 
                key={num} 
                className={`w-[30px] h-[30px] flex items-center justify-center rounded-[10px] cursor-pointer font-['Nunito'] text-base
                  ${num === 1 ? 'bg-[#c91416] text-white' : 'text-[#737373]'}`}
              >
                {num}
              </div>
            ))}
            <img src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/paginati.png" alt="next" className="w-[30px] h-[30px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentArea;

