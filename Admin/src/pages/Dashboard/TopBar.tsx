import React from 'react';

interface TopBarProps {
  userName?: string;
  userRole?: string;
  language?: string;
  notificationCount?: number;
}

const TopBar: React.FC<TopBarProps> = ({
  userName = "Moni Roy",
  userRole = "Admin",
  language = "English",
  notificationCount = 6
}) => {
  return (
    <div style={{
      width: '100%',
      minWidth: '1200px',
      height: '76.78px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e8e8e8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      boxSizing: 'border-box'
    }}>
      {/* Dashboard Title */}
      <div style={{
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: '40px',
        letterSpacing: '1px',
        color: '#000000'
      }}>
        Dashboard
      </div>

      {/* Right Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Notification */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/notifica.png" 
            alt="notifications"
            style={{
              width: '27px',
              height: '27px'
            }}
          />
          {notificationCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '16px',
              height: '17.55px',
              backgroundColor: '#f93c65',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '12px',
              fontFamily: 'Nunito Sans',
              fontWeight: 700
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
            src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/flag.png" 
            alt="language flag"
            style={{
              width: '40px',
              height: '29.62px'
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
            src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/drop-dow.png" 
            alt="dropdown"
            style={{
              width: '8.16px',
              height: '5.12px'
            }}
          />
        </div>

        {/* Profile Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          cursor: 'pointer'
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/man-4380.png" 
            alt="profile"
            style={{
              width: '44px',
              height: '48.26px',
              borderRadius: '50%'
            }}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column'
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
            src="https://dashboard.codeparrot.ai/api/image/Z7m9jVCHtJJZ6wBz/more.png" 
            alt="more options"
            style={{
              width: '18px',
              height: '19.74px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

