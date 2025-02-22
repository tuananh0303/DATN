import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import UserProfile from './UserProfile';
import HistoryBooking from './HistoryBooking';
import Footer from './Footer';

const UserManagementProfile: React.FC = () => {
  return (
    
      

      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        {/* Sidebar */}
        <div style={{ flexGrow: 0 }}>
          <Sidebar />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
        {/* Top Bar */}
      <div>
        <TopBar />
      </div>
        {/* Main Content */}
        <div style={{ flexGrow: 1, padding: '20px' }}>
          {/* Breadcrumb */}
          <div style={{ fontFamily: 'Roboto', fontSize: '14px', color: '#858585', marginBottom: '20px' }}>
            USER MANAGEMENT &gt; <span style={{ color: '#000000', fontWeight: 700 }}>USER DETAIL</span>
          </div>

          {/* User Profile Section */}
          <UserProfile />

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
            <button style={{
              padding: '10px 20px',
              border: '2px solid #ff8c00',
              borderRadius: '10px',
              backgroundColor: 'transparent',
              color: '#ff8c00',
              fontFamily: 'Roboto',
              fontWeight: 600,
              cursor: 'pointer'
            }}>Warning</button>
            <button style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#4880ff',
              color: '#ffffff',
              fontFamily: 'Roboto',
              fontWeight: 600,
              cursor: 'pointer'
            }}>Ban</button>
          </div>

          {/* History Booking Section */}
          <HistoryBooking />
        </div>
        {/* Footer */}
      <div style={{ flexGrow: 0 }}>
        <Footer />
      </div>
      </div>

      
    </div>
  );
};

export default UserManagementProfile;

