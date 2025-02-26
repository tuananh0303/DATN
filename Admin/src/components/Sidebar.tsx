import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routers/constants';
import { ICONS } from '@/constants/icons';

interface SidebarProps {
  onMenuItemClick?: (itemId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuItemClick = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.DASHBOARD, activeIcon: ICONS.DASHBOARD_ACTIVE, path: ROUTES.DASHBOARD },
    { id: 'users', label: 'Users', icon: ICONS.USERS, activeIcon: ICONS.USERS_ACTIVE, path: ROUTES.USERS },
    { id: 'approvals', label: 'Approvals', icon: ICONS.APPROVALS, activeIcon: ICONS.APPROVALS_ACTIVE, path: ROUTES.APPROVALS },
    { id: 'facilities', label: 'Facilities', icon: ICONS.FACILITIES, activeIcon: ICONS.FACILITIES_ACTIVE, path: ROUTES.FACILITIES },
    { id: 'fields', label: 'Fields', icon: ICONS.FIELDS, activeIcon: ICONS.FIELDS_ACTIVE, path: ROUTES.FIELDS },
    { id: 'services', label: 'Services', icon: ICONS.SERVICES, activeIcon: ICONS.SERVICES_ACTIVE, path: ROUTES.SERVICES },
    { id: 'vouchers', label: 'Vouchers', icon: ICONS.VOUCHERS, activeIcon: ICONS.VOUCHERS_ACTIVE, path: ROUTES.VOUCHERS },
    { id: 'events', label: 'Events', icon: ICONS.EVENTS, activeIcon: ICONS.EVENTS_ACTIVE, path: ROUTES.EVENTS },
    { id: 'reviews', label: 'Reviews', icon: ICONS.REVIEWS, activeIcon: ICONS.REVIEWS_ACTIVE, path: ROUTES.REVIEWS },
    { id: 'supports', label: 'Supports', icon: ICONS.SUPPORTS, activeIcon: ICONS.SUPPORTS_ACTIVE, path: ROUTES.SUPPORTS },
    { id: 'reports', label: 'Reports', icon: ICONS.REPORTS, activeIcon: ICONS.REPORTS_ACTIVE, path: ROUTES.REPORTS },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/vector-7.png', path: ROUTES.DASHBOARD },
    { id: 'logout', label: 'Logout', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/vector-8.png', path: ROUTES.DASHBOARD },
  ];

  const handleItemClick = (path: string, id: string) => {
    onMenuItemClick(id);
    navigate(path);
  };

  const isActiveRoute = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <div className="w-60 min-h-screen bg-white p-[10px] flex flex-col border-r border-[#d8d8d8]">
      <div className="flex items-center p-5 px-4 mb-5">
        <img src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/frame-37.png" alt="Logo" className="w-[42px] h-[30px]" />
        <img src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/frame.png" alt="Brand" className="w-[82px] h-[41px] ml-[10px]" />
      </div>

      <div className="border-b border-[#d8d8d8] mb-5" />

      <div className="flex-1">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.path, item.id)}
            className={`flex items-center p-[10px] px-5 mb-3 rounded-[10px] cursor-pointer transition-colors w-full
              ${isActiveRoute(item.path) ? 'bg-[#4880ff] text-white' : 'bg-white text-black hover:bg-[#f5f5f5]'}`}
          >
            <img 
              src={isActiveRoute(item.path) ? item.activeIcon : item.icon} 
              alt={item.label}
              className={`w-[25px] h-[25px] mr-[10px] ${isActiveRoute(item.path) ? 'brightness-0 invert' : ''}`}
            />
            <span className="font-roboto text-xl font-semibold leading-[23px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-[#d8d8d8] mt-5 pt-5">
        {bottomItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.path, item.id)}
            className={`flex items-center p-[10px] px-5 mb-3 rounded-[10px] cursor-pointer transition-colors w-full
              ${isActiveRoute(item.path) ? 'bg-[#4880ff] text-white' : 'bg-white text-black hover:bg-[#f5f5f5]'}`}
          >
            <img 
              src={item.icon} 
              alt={item.label} 
              className={`w-[25px] h-[25px] mr-[10px] ${isActiveRoute(item.path) ? 'brightness-0 invert' : ''}`}
            />
            <span className="font-roboto text-xl font-semibold leading-[23px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

