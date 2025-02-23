import React from 'react';

interface TopBarProps {
  style?: React.CSSProperties;
}

const TopBar: React.FC<TopBarProps> = ({ style }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #e8e8e8',
      minWidth: '1000px',
      height: '90px',
      ...style
    }}>
      {/* Logo and Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/path.png" 
          alt="Logo"
          style={{
            width: '24px',
            height: '31px',
            opacity: 0.9
          }}
        />
        <h1 style={{
          margin: 0,
          fontFamily: 'Roboto',
          fontSize: '40px',
          fontWeight: 700,
          letterSpacing: '1px',
          color: '#000000'
        }}>
          Event Management
        </h1>
      </div>

      {/* Right Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px'
      }}>
        {/* Notification */}
        <div style={{ position: 'relative' }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/notifica.png"
            alt="Notification"
            style={{
              width: '27px',
              height: '27px',
              cursor: 'pointer'
            }}
          />
          <div style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '16px',
            height: '20px',
            backgroundColor: '#f93c65',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '12px',
            fontFamily: 'Nunito Sans',
            fontWeight: 700
          }}>
            6
          </div>
        </div>

        {/* Language Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer'
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/flag.png"
            alt="Language"
            style={{
              width: '40px',
              height: '35px'
            }}
          />
          <span style={{
            fontFamily: 'Nunito Sans',
            fontSize: '14px',
            fontWeight: 600,
            color: '#646464'
          }}>
            English
          </span>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/drop-dow.png"
            alt="Dropdown"
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
          gap: '16px',
          cursor: 'pointer'
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/man-4380.png"
            alt="Profile"
            style={{
              width: '44px',
              height: '57px',
              borderRadius: '50%'
            }}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <span style={{
              fontFamily: 'Nunito Sans',
              fontSize: '14px',
              fontWeight: 700,
              color: '#404040'
            }}>
              Moni Roy
            </span>
            <span style={{
              fontFamily: 'Nunito Sans',
              fontSize: '12px',
              fontWeight: 600,
              color: '#565656'
            }}>
              Admin
            </span>
          </div>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7oQiFCHtJJZ6wCu/more.png"
            alt="More"
            style={{
              width: '18px',
              height: '23px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

TopBar.defaultProps = {
  style: {}
};

export default TopBar;

