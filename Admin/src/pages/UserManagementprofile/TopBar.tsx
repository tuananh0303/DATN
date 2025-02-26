import React from 'react';

interface TopBarProps {
  title?: string;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  language?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  title = "User Management",
  userName = "Moni Roy",
  userRole = "Admin",
  notificationCount = 6,
  language = "English"
}) => {
  return (
    <div className="w-full h-[90px] bg-white border-b border-[#e8e8e8] flex items-center justify-between px-4 min-w-[1000px] box-border">
      {/* Title */}
      <div className="text-[40px] font-roboto font-bold tracking-[1px] text-black">
        {title}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <div className="relative">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/notifica.png" 
            alt="notification"
            className="w-[27px] h-[27px] cursor-pointer"
          />
          {notificationCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-[#f93c65] text-white w-4 h-5 rounded-[10px] flex items-center justify-center text-xs font-nunito font-bold">
              {notificationCount}
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/flag.png" 
            alt="language"
            className="w-10 h-[35px]"
          />
          <span className="font-nunito text-sm font-semibold text-[#646464]">
            {language}
          </span>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/drop-dow.png" 
            alt="dropdown"
            className="w-2 h-[6px]"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/man-4380.png" 
            alt="profile"
            className="w-11 h-[57px]"
          />
          <div className="flex flex-col">
            <span className="font-nunito text-sm font-bold text-[#404040]">
              {userName}
            </span>
            <span className="font-nunito text-xs font-semibold text-[#565656]">
              {userRole}
            </span>
          </div>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oN01CHtJJZ6wCr/more.png" 
            alt="more"
            className="w-[18px] h-[23px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

