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
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e8e8e8',
      padding: '0 42px',
      minWidth: '1200px',
      height: '90px',
      boxSizing: 'border-box',
      ...style
    }}>
      {/* Logo and Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{
          fontFamily: 'Roboto',
          fontWeight: 700,
          fontSize: '40px',
          letterSpacing: '1px',
          color: '#000000'
        }}>
          Facility Management
        </span>
      </div>

      {/* Right Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px'
      }}>
        {/* Notification */}
        <div style={{ position: 'relative' }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/notifica.png" 
            alt="notification"
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
            backgroundColor: '#f93c65',
            color: '#ffffff',
            width: '16px',
            height: '20px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Nunito Sans',
            fontWeight: 700,
            fontSize: '12px'
          }}>
            6
          </div>
        </div>

        {/* Language Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/flag.png" 
            alt="language"
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
            English
          </span>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/drop-dow.png" 
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
          gap: '15px',
          cursor: 'pointer'
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/man-4380.png" 
            alt="profile"
            style={{
              width: '44px',
              height: '57px'
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
              Moni Roy
            </span>
            <span style={{
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: '12px',
              color: '#565656'
            }}>
              Admin
            </span>
          </div>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/more.png" 
            alt="more"
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

