import React from 'react';

const Footer: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '60px',
      backgroundColor: '#e6e6e6',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '1200px',
      padding: '0 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1156.64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontSize: '14px',
        lineHeight: '16px'
      }}>
        {/* Copyright text */}
        <div style={{ color: '#191919' }}>
          Copyright @ 2023 Safelet. All rights reserved.
        </div>

        {/* Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <a href="/terms" style={{
            color: '#5858fa',
            textDecoration: 'none',
            fontWeight: 700,
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
            color: '#5858fa',
            textDecoration: 'none',
            fontWeight: 700,
            cursor: 'pointer'
          }}>
            Privacy Policy
          </a>
        </div>

        {/* Hand crafted text */}
        <div style={{ color: '#191919' }}>
          Hand Crafted & made with Love
        </div>
      </div>
    </div>
  );
};

export default Footer;

