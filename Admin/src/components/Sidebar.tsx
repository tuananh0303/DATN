import React from 'react';

interface SidebarProps {
  onMenuItemClick?: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuItemClick = () => {} }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/icons.png', isActive: true },
    { id: 'users', label: 'Users', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/vector.png' },
    { id: 'approvals', label: 'Approvals', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/approve.png' },
    { id: 'facilities', label: 'Facilities', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/factory.png' },
    { id: 'fields', label: 'Fields', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/field.png' },
    { id: 'services', label: 'Services', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/vector-2.png' },
    { id: 'vouchers', label: 'Vouchers', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/vector-3.png' },
    { id: 'events', label: 'Events', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/event.png' },
    { id: 'reviews', label: 'Reviews', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/vector-4.png' },
    { id: 'supports', label: 'Supports', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/vector-5.png' },
    { id: 'reports', label: 'Reports', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/vector-6.png' },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/vector-7.png' },
    { id: 'logout', label: 'Logout', icon: 'https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/vector-8.png' },
  ];

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    marginBottom: '12px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    width: '100%',
  };

  const activeStyle = {
    backgroundColor: '#4880ff',
    color: '#ffffff',
  };

  const regularStyle = {
    backgroundColor: '#ffffff',
    color: '#000000',
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  };

  return (
    <div style={{
      width: '240px',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #d8d8d8',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '20px 16px',
        marginBottom: '20px',
      }}>
        <img src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/frame-37.png" alt="Logo" style={{ width: '42px', height: '30px' }} />
        <img src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/frame.png" alt="Brand" style={{ width: '82px', height: '41px', marginLeft: '10px' }} />
      </div>

      <div style={{ borderBottom: '1px solid #d8d8d8', marginBottom: '20px' }} />

      <div style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onMenuItemClick(item.id)}
            style={{
              ...menuItemStyle,
              ...(item.isActive ? activeStyle : regularStyle),
            }}
          >
            <img 
              src={item.icon} 
              alt={item.label}
              style={{ 
                width: '25px', 
                height: '25px',
                marginRight: '10px',
                filter: item.isActive ? 'brightness(0) invert(1)' : 'none'
              }} 
            />
            <span style={{
              fontFamily: 'Roboto',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '23px',
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #d8d8d8', marginTop: '20px', paddingTop: '20px' }}>
        {bottomItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onMenuItemClick(item.id)}
            style={{
              ...menuItemStyle,
              ...regularStyle,
            }}
          >
            <img 
              src={item.icon} 
              alt={item.label} 
              style={{ width: '25px', height: '25px', marginRight: '10px' }}
            />
            <span style={{
              fontFamily: 'Roboto',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '23px',
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

