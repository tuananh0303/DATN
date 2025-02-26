import React, { useState } from 'react';

interface ContentProps {
  data?: Array<{
    facilityId: string;
    facilityName: string;
    ownerName: string;
    createdAt: string;
    totalFields: number;
    location: string;
    status: 'Active' | 'Suspended';
  }>;
  title?: string;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  language?: string;
}

const defaultData = [
  {
    facilityId: '0001',
    facilityName: 'Nguyễn Tuấn Anh',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 10,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityId: '0002',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 10,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityId: '0003',
    facilityName: 'Nguyễn Tuấn Anh',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 10,
    location: '089 Kutch Green Apt. 448',
    status: 'Suspended'
  },
  {
    facilityId: '0004',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 5,
    location: '089 Kutch Green Apt. 448',
    status: 'Suspended'
  },
  {
    facilityId: '0005',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 8,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityId: '0006',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 15,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityId: '0007',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 14,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  },
  {
    facilityId: '0008',
    facilityName: 'Dương Văn Nghĩa',
    ownerName: 'Nguyễn Tuấn Anh',
    createdAt: '14/07/2024',
    totalFields: 16,
    location: '089 Kutch Green Apt. 448',
    status: 'Active'
  }
];

const Content: React.FC<ContentProps> = ({ 
  data = defaultData,
  title = "Facility Management",
  userName = "Moni Roy",
  userRole = "Admin",
  notificationCount = 6,
  language = "English"
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      {/* TopBar Section */}
      <div className="w-full h-[90px] bg-white border-b border-[#e8e8e8] flex items-center justify-between px-5 box-border">
        <div className="text-[40px] font-sans font-bold tracking-[1px] text-black">
          {title}
        </div>
        <div className="flex items-center gap-5">
          <div className="relative">
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/notifica.png" 
              alt="notification"
              className="w-[27px] h-[27px] cursor-pointer"
            />
            {notificationCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-[#f93c65] text-white w-4 h-5 rounded-[10px] flex items-center justify-center text-xs font-sans font-bold">
                {notificationCount}
              </div>
            )}
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer">
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/flag.png" 
              alt="language flag"
              className="w-[40px] h-[35px]"
            />
            <span className="font-sans text-sm font-semibold text-[#646464]">{language}</span>
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/drop-dow.png" 
              alt="dropdown"
              className="w-2 h-[6px]"
            />
          </div>
          <div className="flex items-center gap-[15px]">
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/man-4380.png" 
              alt="profile"
              className="w-11 h-[57px]"
            />
            <div className="flex flex-col">
              <span className="font-sans text-sm font-bold text-[#404040]">{userName}</span>
              <span className="font-sans text-xs font-semibold text-[#565656]">{userRole}</span>
            </div>
            <img 
              src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wCi/more.png" 
              alt="more options"
              className="w-[18px] h-[23px] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-5 min-w-[1200px] h-full bg-[#f5f6fa]">
        <input
          className="w-full max-w-[540px] h-[40px] px-[18px] border-[0.6px] border-[#d5d5d5] rounded-[19px] bg-white mb-5 font-sans text-sm"
          placeholder="Search by Fullname/ Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="flex items-center w-full max-w-[674px] h-[50px] px-5 bg-[#f9f9fb] rounded-[10px] border-[0.6px] border-[#d5d5d5] mb-5">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wBz/filter-i.png" alt="filter" className="w-[42px] h-[50px]" />
          <div className="flex items-center gap-[10px] font-sans text-sm font-semibold text-[#202224] cursor-pointer">
            <span>Filter By</span>
            <div className="w-[1px] h-[50px] bg-[#979797] opacity-69" />
          </div>
          <div className="flex items-center gap-[10px] font-sans text-sm font-semibold text-[#202224] cursor-pointer">
            <span>Created_At</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wBz/ic-keybo.png" alt="dropdown" />
            <div className="w-[1px] h-[50px] bg-[#979797] opacity-69" />
          </div>
          <div className="flex items-center gap-[10px] font-sans text-sm font-semibold text-[#202224] cursor-pointer">
            <span>Status</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wBz/ic-keybo-2.png" alt="dropdown" />
          </div>
          <div className="flex items-center gap-2 text-[#ea0234] font-sans text-sm font-semibold cursor-pointer ml-auto">
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wBz/ic-repla.png" alt="reset" className="w-[18px] h-[18px]" />
            <span>Reset Filter</span>
          </div>
        </div>

        <div className="w-full bg-white rounded-[15px] overflow-hidden">
          <div className="flex p-[25px_20px] bg-[#448ff0b2] border-b border-[#979797]">
            <div className="font-sans font-bold text-[15px] text-black w-[75px]">Facility ID</div>
            <div className="font-sans font-bold text-[15px] text-black w-[120px] ml-[50px]">Facility Name</div>
            <div className="font-sans font-bold text-[15px] text-black w-[125px] ml-[30px]">Owner Name</div>
            <div className="font-sans font-bold text-[15px] text-black w-[90px] ml-[65px]">Created_At</div>
            <div className="font-sans font-bold text-[15px] text-black w-[90px] ml-[30px]">Total Fields</div>
            <div className="font-sans font-bold text-[15px] text-black w-[170px] ml-[30px]">Location</div>
            <div className="font-sans font-bold text-[15px] text-black w-[85px] ml-[115px]">Status</div>
            <div className="font-sans font-bold text-[15px] text-black w-[50px] ml-[65px]">Action</div>
          </div>

          {data.map((item, index) => (
            <div key={index} className="flex p-[15px_20px] border-b border-[#979797] bg-white">
              <div className="font-sans font-semibold text-sm text-black w-[75px]">{item.facilityId}</div>
              <div className="font-sans font-semibold text-sm text-black w-[120px] ml-[50px]">{item.facilityName}</div>
              <div className="font-sans font-semibold text-sm text-black w-[125px] ml-[30px]">{item.ownerName}</div>
              <div className="font-sans font-semibold text-sm text-black w-[90px] ml-[65px]">{item.createdAt}</div>
              <div className="font-sans font-semibold text-sm text-black w-[90px] ml-[30px]">{item.totalFields}</div>
              <div className="font-sans font-semibold text-sm text-black w-[170px] ml-[30px]">{item.location}</div>
              <div className="ml-[115px]">
                <div className={`w-[85px] py-[2px] ${item.status === 'Active' ? 'bg-[#6ef153cc]' : 'bg-[#eae559cc]'} rounded-[10px] text-center font-sans font-semibold text-sm`}>
                  {item.status}
                </div>
              </div>
              <div className="ml-[65px]">
                <button className="w-[48px] h-[32px] bg-[#fafbfd] border-[0.6px] border-[#d5d5d5] rounded-lg flex items-center justify-center cursor-pointer">
                  <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wBz/error.png" alt="action" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-[14px] mt-5">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wBz/componen.png" alt="prev" className="cursor-pointer" />
          {[1, 2, 3, '...', 12].map((page, index) => (
            <div key={index} 
              className={`w-[30px] h-[30px] flex items-center justify-center rounded-[10px] cursor-pointer font-sans text-base
                ${page === 1 ? 'bg-[#c91416] text-white' : 'bg-white text-[#737373]'}`}>
              {page}
            </div>
          ))}
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nyf1CHtJJZ6wBz/paginati.png" alt="next" className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Content;

