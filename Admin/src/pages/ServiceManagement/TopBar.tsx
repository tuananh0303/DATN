import React from 'react';

interface TopBarProps {
  title?: string;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  language?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  title = "Service Management",
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
      boxSizing: 'border-box',
    }}>
      {/* Title */}
      <div style={{
        fontSize: '40px',
        fontFamily: 'Roboto',
        fontWeight: 700,
        letterSpacing: '1px',
        color: '#000000',
      }}>
        {title}
      </div>

      {/* Right Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
      }}>
        {/* Notification */}
        <div style={{ position: 'relative' }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/notifica.png" 
            alt="notification"
            style={{
              width: '27px',
              height: '27px',
              cursor: 'pointer',
            }}
          />
          {notificationCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#f93c65',
              color: '#ffffff',
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
            src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/flag.png" 
            alt="language"
            style={{
              width: '40px',
              height: '35px',
            }}
          />
          <span style={{
            fontSize: '14px',
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            color: '#646464',
          }}>
            {language}
          </span>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/drop-dow.png" 
            alt="dropdown"
            style={{
              width: '8px',
              height: '6px',
            }}
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
            src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/man-4380.png" 
            alt="profile"
            style={{
              width: '44px',
              height: '57px',
              borderRadius: '50%',
            }}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span style={{
              fontSize: '14px',
              fontFamily: 'Nunito Sans',
              fontWeight: 700,
              color: '#404040',
            }}>
              {userName}
            </span>
            <span style={{
              fontSize: '12px',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              color: '#565656',
            }}>
              {userRole}
            </span>
          </div>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oMqDHWD6EJo6vW/more.png" 
            alt="more"
            style={{
              width: '18px',
              height: '23px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

