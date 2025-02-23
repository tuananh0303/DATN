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
      padding: '0 31px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #e8e8e8',
      minWidth: '1000px',
      height: '90px',
      ...style
    }}>
      {/* Title */}
      <div style={{
        fontSize: '40px',
        fontFamily: 'Roboto',
        fontWeight: 700,
        letterSpacing: '1px',
        color: '#000000'
      }}>
        Report Management
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
            src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/notifica.png" 
            alt="notification"
            style={{
              width: '27px',
              height: '27px'
            }}
          />
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
          gap: '10px',
          cursor: 'pointer'
        }}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/flag.png" 
            alt="flag"
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
            src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/drop-dow-2.png" 
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
            src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/man-4380.png" 
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
            src="https://dashboard.codeparrot.ai/api/image/Z7ocejHWD6EJo6vq/more.png" 
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

