import React from 'react';

const Footer: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      minWidth: '320px',
      height: '60px',
      backgroundColor: '#e6e6e6',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1156px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          lineHeight: '16px',
          color: '#191919'
        }}>
          Copyright @ 2023 Safelet. All rights reserved.
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '15px'
        }}>
          <a href="/terms" style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '16px',
            color: '#5858fa',
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            Terms of Use
          </a>
          <div style={{
            width: '1px',
            height: '20px',
            backgroundColor: '#000000'
          }} />
          <a href="/privacy" style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '16px',
            color: '#5858fa',
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            Privacy Policy
          </a>
        </div>

        <div style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          lineHeight: '16px',
          color: '#191919'
        }}>
          Hand Crafted & made with Love
        </div>
      </div>
    </div>
  );
};

export default Footer;

