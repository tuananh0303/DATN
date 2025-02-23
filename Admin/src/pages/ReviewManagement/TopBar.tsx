import React from 'react';

interface TopBarProps {
  title?: string;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  language?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  title = "Review Management",
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
      padding: '0 20px',
      minWidth: '1000px',
      boxSizing: 'border-box',
    }}>
      {/* Left Section - Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <h1 style={{
          fontSize: '40px',
          fontWeight: 700,
          fontFamily: 'Roboto',
          letterSpacing: '1px',
          color: '#000000',
          margin: 0,
        }}>
          {title}
        </h1>
      </div>

      {/* Right Section - Notification, Language, Profile */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
      }}>
        {/* Notification */}
        <div style={{ position: 'relative' }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/notifica.png" 
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
              top: '-5px',
              right: '-5px',
              backgroundColor: '#f93c65',
              color: '#ffffff',
              width: '16px',
              height: '20px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: 'Nunito Sans',
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
            src="https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/flag.png" 
            alt="language flag"
            style={{
              width: '40px',
              height: '35px',
            }}
          />
          <span style={{
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Nunito Sans',
            color: '#646464',
          }}>
            {language}
          </span>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/drop-dow.png" 
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
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/man-4380.png" 
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
              fontWeight: 700,
              fontFamily: 'Nunito Sans',
              color: '#404040',
            }}>
              {userName}
            </span>
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Nunito Sans',
              color: '#565656',
            }}>
              {userRole}
            </span>
          </div>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oSRzHWD6EJo6va/more.png" 
            alt="more options"
            style={{
              width: '18px',
              height: '23px',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

