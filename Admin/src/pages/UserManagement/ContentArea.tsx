import React, { useState } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  joined: string;
  permissions: 'Admin' | 'Player' | 'Owner';
}

interface ContentAreaProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  language?: string;
}
const ContentArea: React.FC<ContentAreaProps> = ({
  userName = "Moni Roy",
  userRole = "Admin",
  notificationCount = 6,
  language = "English"
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const mockUsers: User[] = [
    { id: '0001', fullName: 'Nguyễn Tuấn Anh', email: 'anheello564@gmail.com', joined: '14/07/2024', permissions: 'Admin' },
    { id: '0002', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Player' },
    { id: '0003', fullName: 'Nguyễn Tuấn Anh', email: 'anhhello@gmail.com', joined: '14/07/2024', permissions: 'Owner' },
    { id: '0004', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Owner' },
    { id: '0005', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Player' },
    { id: '0006', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Player' },
    { id: '0007', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Admin' },
    { id: '0008', fullName: 'Dương Văn Nghĩa', email: 'Nghiaduong@gmail.com', joined: '14/07/2024', permissions: 'Player' },
  ];

  const getPermissionStyle = (permission: string) => {
    switch (permission) {
      case 'Admin':
        return 'bg-[#e33c3cb2]';
      case 'Player':
        return 'bg-[#6ef153b2]';
      case 'Owner':
        return 'bg-[#eae559b2]';
      default:
        return '';
    }
  };

  return (
    <>  
    {/* TopBar Section */}
    <div className="w-full h-[90px] bg-white border-b border-[#e8e8e8] flex items-center justify-between px-[30px] min-w-[1200px] box-border">
    <div className="text-[40px] font-sans font-bold tracking-[1px] text-black">
      User Management
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
    <div className="p-[35px_96px] bg-[#f5f6fa] min-h-screen">
      {/* Search Bar */}
      <div className="w-full max-w-[540px] h-10 relative mb-5">
        <input
          type="text"
          placeholder="Search by Fullname/ Email"
          className="w-full h-full rounded-[19px] border-[0.6px] border-[#d5d5d5] px-12 bg-white font-nunito text-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/search.png"
          alt="search"
          className="absolute right-[18px] top-1/2 -translate-y-1/2 opacity-60"
        />
      </div>

      {/* Filter Bar */}
      <div className="w-full max-w-[711px] h-[50px] bg-[#f9f9fb] rounded-[10px] border-[0.6px] border-[#d5d5d5] flex items-center mb-5">
        <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/filter-i.png" alt="filter" className="ml-5" />
        
        <div className="ml-5 flex items-center h-full gap-10">
          <div className="flex items-center">
            <span className="font-nunito font-semibold text-sm text-[#202224]">Filter By</span>
            <div className="w-[1px] h-[50px] bg-[#979797] opacity-70 mx-5" />
          </div>

          <div className="flex items-center">
            <span className="font-nunito font-semibold text-sm text-[#202224]">Joined</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/ic-keybo.png" alt="dropdown" className="ml-[10px]" />
            <div className="w-[1px] h-[50px] bg-[#979797] opacity-70 mx-5" />
          </div>

          <div className="flex items-center">
            <span className="font-nunito font-semibold text-sm text-[#202224]">Permissions</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/ic-keybo-2.png" alt="dropdown" className="ml-[10px]" />
          </div>
        </div>

        <div className="ml-auto mr-5 flex items-center cursor-pointer">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/ic-repla.png" alt="reset" className="mr-2" />
          <span className="font-nunito font-semibold text-sm text-[#ea0234]">Reset Filter</span>
        </div>
      </div>

      {/* User List */}
      <div className="w-full max-w-[996px] bg-[#fdfdfd] rounded-[15px] overflow-hidden">
        {/* Header */}
        <div className="flex px-5 py-[25px] bg-[#448ff080] border-b border-[#979797]">
          <div className="w-5">
            <input type="checkbox" />
          </div>
          <div className="w-20 font-opensans font-bold text-sm">ID</div>
          <div className="w-[200px] font-opensans font-bold text-base">Full Name</div>
          <div className="w-[200px] font-opensans font-bold text-base">Email</div>
          <div className="w-[100px] font-opensans font-bold text-base">Joined</div>
          <div className="w-[120px] font-opensans font-bold text-base">Permissions</div>
          <div className="w-[100px] font-opensans font-bold text-sm">Action</div>
        </div>

        {/* User Rows */}
        {mockUsers.map((user) => (
          <div key={user.id} className="flex px-5 py-[15px] border-b border-[#979797] bg-white">
            <div className="w-5">
              <input type="checkbox" />
            </div>
            <div className="w-20 font-opensans font-semibold text-sm">{user.id}</div>
            <div className="w-[200px] font-opensans font-semibold text-sm">{user.fullName}</div>
            <div className="w-[200px] font-opensans font-semibold text-sm">{user.email}</div>
            <div className="w-[100px] font-opensans font-semibold text-sm">{user.joined}</div>
            <div className="w-[120px]">
              <span className={`px-[15px] py-[5px] rounded-[10px] font-opensans font-semibold text-sm ${getPermissionStyle(user.permissions)}`}>
                {user.permissions}
              </span>
            </div>
            <div className="w-[100px] flex gap-[10px]">
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/error.png" alt="action" className="cursor-pointer" />
              <div className="w-[1px] h-8 bg-[#979797] opacity-70" />
              <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/vector.png" alt="delete" className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center mt-5 gap-[10px]">
        <span className="font-nunito text-base text-[#c91416]">144 Total</span>
        <div className="flex gap-[14px] p-[10px] bg-white rounded-[10px] items-center">
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/componen.png" alt="prev" className="cursor-pointer" />
          <span className="px-[10px] py-[5px] rounded-[10px] bg-[#c91416] text-white font-nunito text-base">1</span>
          <span className="px-[10px] py-[5px] font-nunito text-base text-[#737373]">2</span>
          <span className="px-[10px] py-[5px] font-nunito text-base text-[#737373]">3</span>
          <span className="px-[10px] py-[5px] font-nunito text-base text-[#737373]">...</span>
          <span className="px-[10px] py-[5px] font-nunito text-base text-[#737373]">12</span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z7nDLTHWD6EJo6uj/paginati.png" alt="next" className="cursor-pointer" />
        </div>
      </div>
    </div>
    </>
  );
};

export default ContentArea;

