import React from 'react';

interface TopBarProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  language?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  userName = "Moni Roy",
  userRole = "Admin",
  notificationCount = 6,
  language = "English"
}) => {
  return (
    <div style={{
      width: '100%',
      height: '90px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e8e8e8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      minWidth: '1200px',
      boxSizing: 'border-box',
    }}>
      {/* Left - Title */}
      <div style={{
        fontSize: '40px',
        fontFamily: 'Roboto',
        fontWeight: 700,
        letterSpacing: '1px',
        color: '#000000',
      }}>
        Approval Management
      </div>

      {/* Right - Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        {/* Notification */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/notifica.png" 
            alt="notification" 
            style={{ width: '27px', height: '27px' }}
          />
          {notificationCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#f93c65',
              color: 'white',
              width: '16px',
              height: '20px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontFamily: 'Nunito Sans',
              fontWeight: 700,
            }}>
              {notificationCount}
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/flag.png" 
            alt="language flag" 
            style={{ width: '40px', height: '35px' }}
          />
          <span style={{
            fontFamily: 'Nunito Sans',
            fontSize: '14px',
            fontWeight: 600,
            color: '#646464',
          }}>
            {language}
          </span>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/drop-dow-2.png" 
            alt="dropdown" 
            style={{ width: '8px', height: '6px' }}
          />
        </div>

        {/* Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          cursor: 'pointer',
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/man-4380.png" 
            alt="profile" 
            style={{ width: '44px', height: '57px' }}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            <span style={{
              fontFamily: 'Nunito Sans',
              fontSize: '14px',
              fontWeight: 700,
              color: '#404040',
            }}>
              {userName}
            </span>
            <span style={{
              fontFamily: 'Nunito Sans',
              fontSize: '12px',
              fontWeight: 600,
              color: '#565656',
            }}>
              {userRole}
            </span>
          </div>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nri1CHtJJZ6wCT/more.png" 
            alt="more options" 
            style={{ width: '18px', height: '23px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

