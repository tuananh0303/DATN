import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Avatar, Button, MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { logout } from '@/store/slices/userSlice';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const TopbarProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Menu for authenticated users
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin tài khoản',
      onClick: () => {
        // Determine the profile path based on user role
        const profilePath = user?.role === 'player' ? '/user/profile' : '/owner/profile';
        navigate(profilePath);
      }
    },
    ...(user?.role === 'owner' ? [{
      key: 'owner-dashboard',
      label: 'Trang chủ chủ sân',
      onClick: () => navigate('/owner')
    }] : []),
    ...(user?.role === 'player' ? [{
      key: 'bookings',
      label: 'Lịch sử đặt sân',
      onClick: () => navigate('/user/booking')
    }] : []),
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout
    }
  ];

  // const handleLoginSuccess = (userData: {name: string, role: 'player' | 'owner'}) => {
  //   setShowLoginModal(false);
  //   setShowRegisterModal(false);
  // };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <div className="ml-2">
      {isAuthenticated ? (
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
          <div className="flex items-center cursor-pointer">
            <Avatar 
              src={user?.avatarUrl} 
              icon={!user?.avatarUrl && <UserOutlined />} 
              className="mr-2"
            />
            <span className="text-sm font-medium hidden md:inline">
              {user?.name}
            </span>
          </div>
        </Dropdown>
      ) : (
        <div className="flex gap-2">
          <Button 
            type="text" 
            size="small" 
            onClick={() => setShowLoginModal(true)}
          >
            Đăng nhập
          </Button>
          <Button 
            type="primary" 
            size="small" 
            onClick={() => setShowRegisterModal(true)}
          >
            Đăng ký
          </Button>
        </div>
      )}

      <LoginModal 
        visible={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      
      <RegisterModal 
        visible={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
        onSuccess={handleRegisterSuccess}
      />
    </div>
  );
};

export default TopbarProfile;