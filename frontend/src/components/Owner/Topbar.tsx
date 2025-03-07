import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ICONS } from '@/constants/owner/topbar/topbar';

interface TopBarProps {
  className?: string;
}

// Định nghĩa mapping giữa route và title
const ROUTE_TITLES: { [key: string]: string } = {
  '/owner/play-schedule': 'Lịch đặt sân',
  '/owner/facility-management': 'Quản lý cơ sở',
  '/owner/field-management': 'Quản lý sân',
  '/owner/service-management': 'Quản lý dịch vụ',
  '/owner/voucher-management': 'Quản lý voucher',
  '/owner/event-management': 'Quản lý sự kiện',
  '/owner/chat': 'Quản lý chat',
  '/owner/review-management': 'Quản lý đánh giá',
  '/owner/report-management': 'Doanh thu',
  '/owner/banking': 'Ngân hàng', 
  '/owner/create-facility': 'Quản lý cơ sở',
  '/owner/create-field': 'Quản lý sân',
  '/owner/create-service': 'Quản lý dịch vụ',
  '/owner/create-voucher': 'Quản lý voucher',
  '/owner/create-event': 'Quản lý sự kiện',
};

const LANGUAGES = [
  { code: 'vi', name: 'Vietnamese', flag: ICONS.VIETNAM },
  { code: 'en', name: 'English', flag: ICONS.ENGLISH },
];

const TopBar: React.FC<TopBarProps> = () => {
  const location = useLocation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  // Lấy title dựa trên current route
  const currentTitle = ROUTE_TITLES[location.pathname] || 'Lịch đặt sân';

  const handleLanguageSelect = (language: typeof LANGUAGES[0]) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  };

  return (
    <div className={`flex items-center justify-between bg-white border-b border-[#e8e8e8] px-[42px] min-w-[960px] h-[75px] box-border`}>
      {/*Title */}
      <div className="flex items-center gap-2.5">
        <span className="font-sans font-bold text-[29px] tracking-[1px] text-black">
          {currentTitle}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-[30px]">
        {/* Notification */}
        <div className="relative">
          <img 
            src={ICONS.NOTIFICATION} 
            alt="notification"
            className="w-[27px] h-[27px] cursor-pointer"
          />
          <div className="absolute -top-2 -right-2 bg-[#f93c65] text-white w-4 h-5 rounded-[10px] flex items-center justify-center font-['Nunito_Sans'] font-bold text-xs">
            6
          </div>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <img src={selectedLanguage.flag} alt={selectedLanguage.name} />
            <div className="flex items-center gap-[5px] font-nunito text-sm font-semibold text-[#646464]">
              <span>{selectedLanguage.name}</span>
              <img 
                src={ICONS.DROPDOWN} 
                alt="Dropdown"
                className={`transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </div>

          {/* Language Dropdown */}
          {isLanguageOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-[160px] z-50">
              {LANGUAGES.map((language) => (
                <div
                  key={language.code}
                  className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer
                    ${selectedLanguage.code === language.code ? 'bg-gray-50' : ''}`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  <img src={language.flag} alt={language.name} className="w-5 h-4" />
                  <span className="font-nunito text-sm text-[#646464]">{language.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-[15px] cursor-pointer">
          <img 
            src={ICONS.AVATAR} 
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />          
        </div>
      </div>
    </div>
  );
};

export default TopBar;

