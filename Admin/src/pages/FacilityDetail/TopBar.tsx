import React from 'react';

interface TopBarProps {
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-between bg-white border-b border-[#e8e8e8] px-[42px] min-w-[1200px] h-[90px] box-border ${className}`}>
      {/* Logo and Title */}
      <div className="flex items-center gap-2.5">
        <span className="font-sans font-bold text-[40px] tracking-[1px] text-black">
          Facility Management
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-[30px]">
        {/* Notification */}
        <div className="relative">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/notifica.png" 
            alt="notification"
            className="w-[27px] h-[27px] cursor-pointer"
          />
          <div className="absolute -top-2 -right-2 bg-[#f93c65] text-white w-4 h-5 rounded-[10px] flex items-center justify-center font-['Nunito_Sans'] font-bold text-xs">
            6
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/flag.png" 
            alt="language"
            className="w-10 h-[35px]"
          />
          <span className="font-['Nunito_Sans'] font-semibold text-sm text-[#646464]">
            English
          </span>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/drop-dow.png" 
            alt="dropdown"
            className="w-2 h-1.5"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-[15px] cursor-pointer">
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/man-4380.png" 
            alt="profile"
            className="w-11 h-[57px]"
          />
          <div className="flex flex-col">
            <span className="font-['Nunito_Sans'] font-bold text-sm text-[#404040]">
              Moni Roy
            </span>
            <span className="font-['Nunito_Sans'] font-semibold text-xs text-[#565656]">
              Admin
            </span>
          </div>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/more.png" 
            alt="more"
            className="w-[18px] h-[23px]"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

