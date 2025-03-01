import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routers/constants';
import { ICONS } from '@/constants/owner/sidebar/icons';

interface SidebarProps {
  onMenuItemClick?: (itemId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuItemClick = () => {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { id: 'calendar', label: 'Lịch đặt sân', icon: ICONS.CALENDAR, activeIcon: ICONS.CALENDAR, path: ROUTES.PLAY_SCHEDULE },
    { id: 'facility', label: 'Quản lý cơ sở', icon: ICONS.FACILITY, activeIcon: ICONS.FACILITY, path: ROUTES.FACILITY_MANAGEMENT },
    { id: 'field', label: 'Quản lý sân', icon: ICONS.FIELD, activeIcon: ICONS.FIELD, path: ROUTES.FIELD_MANAGEMENT },
    { id: 'service', label: 'Quản lý dịch vụ', icon: ICONS.SERVICE, activeIcon: ICONS.SERVICE, path: ROUTES.SERVICE_MANAGEMENT },
    { id: 'voucher', label: 'Quản lý voucher', icon: ICONS.VOUCHER, activeIcon: ICONS.VOUCHER, path: ROUTES.VOUCHER_MANAGEMENT },
    { id: 'ads', label: 'Quản lý sự kiện', icon: ICONS.EVENT, activeIcon: ICONS.EVENT, path: ROUTES.EVENT_MANAGEMENT },
  ];

  const customerCareItems = [
    { id: 'chat', label: 'Quản lý chat', icon: ICONS.CHAT, activeIcon: ICONS.CHAT, path: ROUTES.CHAT },
    { id: 'review', label: 'Quản lý đánh giá', icon: ICONS.REVIEW, activeIcon: ICONS.REVIEW, path: ROUTES.REVIEW_MANAGEMENT },
  ];

  // Customer Care Section
  const [isCustomerCareOpen, setCustomerCareOpen] = useState(false);

  const financeItems = [
    { id: 'report', label: 'Doanh thu', icon: ICONS.REVENUE, activeIcon: ICONS.REVENUE, path: ROUTES.REPORT_MANAGEMENT },
    { id: 'bank', label: 'Ngân hàng', icon: ICONS.BANK, activeIcon: ICONS.BANK, path: ROUTES.BANKING },
  ];

  // Finance Section
  const [isFinanceOpen, setFinanceOpen] = useState(false);

  const bottomItems = [
    { id: 'support', label: 'Hỗ trợ liên hệ', icon: ICONS.SUPPORT, activeIcon: ICONS.SUPPORT, path: ROUTES.ERROR },
    { id: 'delete', label: 'Xóa tài khoản', icon: ICONS.DELETE, activeIcon: ICONS.DELETE, textColor: 'text-[#ff4b4b]', path: ROUTES.ERROR },
    { id: 'logout', label: 'Đăng xuất', icon: ICONS.LOGOUT, activeIcon: ICONS.LOGOUT, path: ROUTES.HOME },
  ];

  const handleItemClick = (path: string, id: string) => {
    onMenuItemClick(id);
    navigate(path);
  };

  const isActiveRoute = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-60'} fixed h-screen bg-white p-[10px] flex flex-col border-r border-[#d8d8d8] transition-all duration-300 ease-in-out`}>
      {/* Header - Fixed */}
      <div className="flex-shrink-0">
        {/* Toggle Sidebar */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center h-[90px]' : 'px-[20px]'} pt-[10px] pb-[20px]`}>
          <img 
            src={ICONS.TOGGLE_SIDEBAR} 
            alt="Toggle Sidebar" 
            className="w-[30px] h-[20px] cursor-pointer"
            onClick={toggleSidebar}
          />
          {!isCollapsed && (
            <div className="border-0 bg-transparent cursor-pointer" onClick={() => navigate(ROUTES.PLAY_SCHEDULE)}>
              <img src={ICONS.BRAND} alt="Brand" className="w-[120px] h-[60px] ml-[15px]" />
            </div>
          )}
        </div>
        <div className="border-b border-[#d8d8d8] mb-5" />
      </div>

      {/* Scrollable Middle Section */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Menu Items */}
        <div className="pt-1 pb-[8px] flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.path, item.id)}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-5'} p-[10px] mb-2 rounded-[10px] cursor-pointer w-full h-[43px]
                  ${isActive ? 'bg-[#4880ff] text-white' : 'bg-white text-black hover:bg-[#f5f5f5]'}`}
              >
                <img 
                  src={item.icon}
                  alt={item.label}
                  className={`w-[23px] h-[23px] ${!isCollapsed && 'mr-[10px]'} ${isActive ? 'brightness-0 invert' : ''} transition-transform duration-300`}
                />
                {!isCollapsed && (
                  <span className="font-roboto text-lg font-semibold leading-[23px] whitespace-nowrap transition-transform duration-300">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-b border-[#d8d8d8]" />

        {/* Customer Care Section */}
        <div className="mt-1.5">
          {!isCollapsed ? (
            <>
              <div 
                className="flex justify-between items-center px-2 pt-2.5 pb-3.5 rounded-[10px] cursor-pointer"
                onClick={() => setCustomerCareOpen(!isCustomerCareOpen)}
              >
                <span className="font-semibold text-lg leading-[23px] text-black whitespace-nowrap transition-transform duration-300">Chăm sóc khách hàng</span>
                <img
                  src={ICONS.DROPDOWN}
                  alt="Dropdown"
                  className={`w-[13px] h-[8px] transition-transform duration-300 ${isCustomerCareOpen ? 'rotate-180' : ''}`}
                />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${isCustomerCareOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {customerCareItems.map((item) => {
                  const isActive = isActiveRoute(item.path);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item.path, item.id)}
                      className={`flex items-center px-5 p-[10px] mb-2 rounded-[10px] cursor-pointer transition-colors w-full
                        ${isActive ? 'bg-[#4880ff] text-white' : 'bg-white text-black hover:bg-[#f5f5f5]'}`}
                    >
                      <img 
                        src={item.icon}
                        alt={item.label}
                        className={`w-[23px] h-[23px] mr-[10px] ${isActive ? 'brightness-0 invert' : ''} transition-transform duration-300`}
                      />
                      <span className="font-roboto text-lg font-semibold leading-[23px] whitespace-nowrap transition-transform duration-300">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {customerCareItems.map((item) => {
                const isActive = isActiveRoute(item.path);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.path, item.id)}
                    className={`flex items-center justify-center p-[10px] mb-2 rounded-[10px] cursor-pointer transition-colors w-full
                      ${isActive ? 'bg-[#4880ff] text-white' : 'bg-white text-black hover:bg-[#f5f5f5]'}`}
                  >
                    <img 
                      src={item.icon}
                      alt={item.label}
                      className={`w-[23px] h-[23px] ${isActive ? 'brightness-0 invert' : ''}`}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>

        <div className="border-b border-[#d8d8d8]" />

        {/* Finance Section */}
        <div className="mt-1.5">
          {!isCollapsed ? ( 
            <>
              <div 
                className="flex justify-between items-center px-2 pt-2.5 pb-3.5 rounded-[10px] cursor-pointer"
                onClick={() => setFinanceOpen(!isFinanceOpen)}
          >
            <span className="font-semibold text-lg leading-[23px] text-black whitespace-nowrap transition-transform duration-300">Báo cáo tài chính</span>
            <img
              src={ICONS.DROPDOWN}
              alt="Dropdown"
              className={`w-[13px] h-[8px] transition-transform duration-300 ${isFinanceOpen ? 'rotate-180' : ''}`}
            />
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isFinanceOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {financeItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.path, item.id)}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-5'} p-[10px] mb-2 rounded-[10px] cursor-pointer transition-colors w-full
                  ${isActive ? 'bg-[#4880ff] text-white' : 'bg-white text-black hover:bg-[#f5f5f5]'}`}
              >
                <img 
                  src={item.icon}
                  alt={item.label}
                  className={`w-[23px] h-[23px] ${!isCollapsed && 'mr-[10px]'} ${isActive ? 'brightness-0 invert' : ''} transition-transform duration-300`}
                />
                {!isCollapsed && (
                  <span className="font-roboto text-lg font-semibold leading-[23px] whitespace-nowrap transition-transform duration-300">
                    {item.label}
                  </span>
                )}
              </div>
                );
              })}            
          </div>
          </>
          ) : (
            <>
              {financeItems.map((item) => {
                const isActive = isActiveRoute(item.path);  
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.path, item.id)}
                    className={`flex items-center justify-center p-[10px] mb-2 rounded-[10px] cursor-pointer transition-colors w-full
                      ${isActive ? 'bg-[#4880ff] text-white' : 'bg-white text-black hover:bg-[#f5f5f5]'}`}
                  >
                    <img 
                      src={item.icon}
                      alt={item.label}
                      className={`w-[23px] h-[23px] ${isActive ? 'brightness-0 invert' : ''}`}
                    />
                  </div>
                );
              })}
            </>
          )}    
        </div>
      </div>

      {/* Footer - Fixed */}
      <div className="flex-shrink-0">
        <div className="w-full h-[1px] bg-[#e0e0e0]" />
        {/* Bottom Items */}
        <div className="pt-3.5 pb-3 flex flex-col gap-1">
          {bottomItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.path, item.id)}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-5'} p-[10px] mb-2 rounded-[10px] cursor-pointer transition-colors w-full
                  ${isActive ? 'bg-[#4880ff] text-white' : 'bg-white text-black hover:bg-[#f5f5f5]'}`}
              >
                <img 
                  src={item.icon}
                  alt={item.label}
                  className={`w-[23px] h-[23px] ${!isCollapsed && 'mr-[10px]'} ${isActive ? 'brightness-0 invert' : ''} transition-transform duration-300`}
                />
                {!isCollapsed && (
                  <span className="font-roboto text-lg font-semibold leading-[23px] whitespace-nowrap transition-transform duration-300">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
