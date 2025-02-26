import React, { useState } from 'react';

interface ContentAreaProps {
  data?: Array<{
    id: string;
    serviceName: string;
    ownerName: string;
    facilityName: string;
    createdAt: string;
    typeSport: string;
    status: number;
    price: string;
  }>;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  language?: string;
}

const defaultData = [
  {
    id: '0001',
    serviceName: 'Tennis',
    ownerName: 'Nguyễn Tuấn Anh',
    facilityName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    typeSport: 'Tennis',
    status: 20,
    price: '200.000đ'
  },
  {
    id: '0002',
    serviceName: 'Football',
    ownerName: 'Dương Văn Nghĩa',
    facilityName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    typeSport: 'Football', 
    status: 20,
    price: '200.000đ'
  },
  // Add more default data items as needed
];

const ContentArea: React.FC<ContentAreaProps> = ({ 
  data = defaultData,
  userName = "Moni Roy",
  userRole = "Admin",
  notificationCount = 6,
  language = "English"
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  // const [filterType, setFilterType] = useState('');
  // const [filterStatus, setFilterStatus] = useState('');
  // const [filterDate, setFilterDate] = useState('');

  return (

    <>
    {/* TopBar Section */}
    <div className="w-full h-[90px] bg-white border-b border-[#e8e8e8] flex items-center justify-between px-[30px] min-w-[1200px] box-border">
    <div className="text-[40px] font-sans font-bold tracking-[1px] text-black">
      Service Management
    </div>
    <div className="flex items-center gap-5">
      <div className="relative cursor-pointer">
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/notifica.png" 
          alt="notification" 
          className="w-[27px] h-[27px]"
        />
        {notificationCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-[#f93c65] text-white w-4 h-5 rounded-[10px] flex items-center justify-center text-xs font-sans font-bold">
            {notificationCount}
          </div>
        )}
      </div>
      <div className="flex items-center gap-[10px] cursor-pointer">
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/flag.png" 
          alt="language flag" 
          className="w-[40px] h-[35px]"
        />
        <span className="font-sans text-sm font-semibold text-[#646464]">{language}</span>
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/drop-dow-2.png" 
          alt="dropdown" 
          className="w-2 h-[6px]"
        />
      </div>
      <div className="flex items-center gap-[15px] cursor-pointer">
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/man-4380.png" 
          alt="profile" 
          className="w-11 h-[57px]"
        />
        <div className="flex flex-col gap-1">
          <span className="font-sans text-sm font-bold text-[#404040]">{userName}</span>
          <span className="font-sans text-xs font-semibold text-[#565656]">{userRole}</span>
        </div>
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/more.png" 
          alt="more options" 
          className="w-[18px] h-[23px]"
        />
      </div>
    </div>
  </div>
    <div className="flex flex-col p-5 bg-[#f5f6fa] min-h-screen w-full box-border">
      {/* Search Bar */}
      <div className="w-full max-w-[540px] h-10 relative mb-[34px]">
        <input
          type="text"
          placeholder="Search by Fullname/ Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-full px-[18px] py-[9px] border-[0.6px] border-[#d5d5d5] rounded-[19px] bg-white text-sm font-nunito opacity-50"
        />
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/search.png"
          alt="search"
          className="absolute right-[18px] top-1/2 -translate-y-1/2 w-5 h-[22px] cursor-pointer"
        />
      </div>

      {/* Filter Bar */}
      <div className="w-full max-w-[800px] h-[50px] bg-[#f9f9fb] rounded-[10px] border-[0.6px] border-[#d5d5d5] flex items-center px-5 mb-[30px]">
        <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/filter-i.png" alt="filter" className="w-[43px] h-[50px]" />
        
        <div className="flex items-center gap-10 ml-10">
          <div className="flex items-center">
            <span className="font-nunito font-semibold text-sm text-[#202224]">Filter By</span>
            <div className="w-[1px] h-[50px] bg-[#979797] opacity-69 mx-5" />
          </div>

          <div className="flex items-center gap-10">
            {['Created_At', 'Type Sport', 'Status'].map((filter, index) => (
              <div key={filter} className="flex items-center">
                <span className="font-nunito font-semibold text-sm text-[#202224]">{filter}</span>
                <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/ic-keybo.png" alt="dropdown" className="ml-[10px]" />
                {index < 2 && <div className="w-[1px] h-[50px] bg-[#979797] opacity-69 mx-5" />}
              </div>
            ))}
          </div>

          <div className="flex items-center text-[#ea0234] cursor-pointer ml-5">
            <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/ic-repla.png" alt="reset" className="mr-2" />
            <span className="font-nunito font-semibold text-sm">Reset Filter</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-[#fdfdfd] rounded-[15px] w-full max-w-[1109px] mb-[30px] overflow-x-auto">
        {/* Header */}
        <div className="flex p-5 bg-[#448ff0b2] border-b border-[#979797]">
          {['Service Name', 'Owner Name', 'Facility Name', 'Created_At', 'Type Sport', 'Status', 'Price', 'Action'].map((header) => (
            <div key={header} className={`${header === 'Action' ? 'flex-none w-[50px]' : 'flex-1'} font-opensans font-bold text-[15px] text-black`}>
              {header}
            </div>
          ))}
        </div>

        {/* Rows */}
        {data.map((item) => (
          <div key={item.id} className="flex p-[14px_20px] border-b border-[#979797] bg-white">
            <div className="flex-1 font-opensans font-semibold text-sm">{item.id}</div>
            <div className="flex-1 font-opensans font-semibold text-sm">{item.ownerName}</div>
            <div className="flex-1 font-opensans font-semibold text-sm">{item.facilityName}</div>
            <div className="flex-1 font-opensans font-semibold text-sm">{item.createdAt}</div>
            <div className="flex-1 font-opensans font-semibold text-sm text-center">{item.typeSport}</div>
            <div className="flex-1 font-nunito font-semibold text-sm text-center">{item.status}</div>
            <div className="flex-1 font-nunito font-semibold text-sm">{item.price}</div>
            <div className="flex-none w-[50px]">
              <div className="w-12 h-8 bg-[#fafbfd] rounded-lg border-[0.6px] border-[#d5d5d5] flex items-center justify-center cursor-pointer">
                <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/error.png" alt="action" className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center gap-[10px] self-end mr-[46px]">
        <span className="font-nunito text-base text-[#c91416] leading-[19px]">144 Total</span>
        
        <div className="flex items-center gap-[14px] bg-white rounded-[10px] p-[5px_10px]">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/componen.png" alt="prev" className="cursor-pointer" />
          {[1, 2, 3, '...', 12].map((page, index) => (
            <div
              key={index}
              className={`w-[30px] h-[30px] flex items-center justify-center rounded-[10px] font-nunito text-base cursor-pointer
                ${currentPage === page ? 'bg-[#c91416] text-white' : 'bg-transparent text-[#737373]'}`}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
          <img src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/paginati.png" alt="next" className="cursor-pointer" />
        </div>
      </div>
    </div>
    </>
  );
};

export default ContentArea;

