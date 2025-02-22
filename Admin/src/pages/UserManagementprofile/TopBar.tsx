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
      padding: '0 42px',
      minWidth: '1200px',
      boxSizing: 'border-box'
    }}>
      {/* Left - Title */}
      <div style={{
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: '40px',
        letterSpacing: '1px',
        color: '#000000'
      }}>
        User Management
      </div>

      {/* Right - Notifications, Language, Profile */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px'
      }}>
        {/* Notification */}
        <div style={{ position: 'relative' }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/notifica.png" 
            alt="notification"
            style={{
              width: '27px',
              height: '27px',
              cursor: 'pointer'
            }}
          />
          {notificationCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              width: '16px',
              height: '20px',
              backgroundColor: '#f93c65',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
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
          cursor: 'pointer'
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/flag.png" 
            alt="language flag"
            style={{
              width: '40px',
              height: '35px'
            }}
          />
          <span style={{
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: '14px',
            color: '#646464'
          }}>
            {language}
          </span>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/drop-dow.png" 
            alt="dropdown"
            style={{
              width: '8px',
              height: '6px'
            }}
          />
        </div>

        {/* Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/man-4380.png" 
            alt="profile"
            style={{
              width: '44px',
              height: '57px'
            }}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px'
          }}>
            <span style={{
              fontFamily: 'Nunito Sans',
              fontWeight: 700,
              fontSize: '14px',
              color: '#404040'
            }}>
              {userName}
            </span>
            <span style={{
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: '12px',
              color: '#565656'
            }}>
              {userRole}
            </span>
          </div>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7nGolCHtJJZ6wB9/more.png" 
            alt="more options"
            style={{
              width: '18px',
              height: '23px',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

