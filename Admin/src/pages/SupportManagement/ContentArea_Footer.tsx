import React from 'react';

const ContentArea_Footer: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      width: '100%',
      minHeight: '100%',
      backgroundColor: '#f5f6fa'
    }}>
      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px'
      }}>
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7oUuVCHtJJZ6wCw/rectangl-8.png" 
          alt="Welcome"
          style={{
            width: '100%',
            maxWidth: '334px',
            height: 'auto',
            marginBottom: '20px'
          }}
        />
        <h1 style={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: '24px',
          margin: '0 0 10px 0',
          textAlign: 'center'
        }}>
          Welcome to support Management!
        </h1>
        <p style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '20px',
          margin: 0,
          textAlign: 'center'
        }}>
          Bắt đầu trả lời người dùng!
        </p>
      </div>

      {/* Footer */}
      <div style={{
        height: '60px',
        backgroundColor: '#e6e6e6',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          <span style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            color: '#191919'
          }}>
            Copyright @ 2023 Safelet. All rights reserved.
          </span>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <a href="#" style={{
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontWeight: 700,
              color: '#5858fa',
              textDecoration: 'none'
            }}>
              Terms of Use
            </a>
            <div style={{
              width: '1px',
              height: '20px',
              backgroundColor: '#000000'
            }} />
            <a href="#" style={{
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontWeight: 700,
              color: '#5858fa',
              textDecoration: 'none'
            }}>
              Privacy Policy
            </a>
            <span style={{
              fontFamily: 'Roboto',
              fontSize: '14px',
              color: '#191919',
              marginLeft: '15px'
            }}>
              Hand Crafted & made with Love
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentArea_Footer;

