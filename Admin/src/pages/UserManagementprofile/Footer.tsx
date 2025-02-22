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
      minWidth: '300px',
      padding: '0 20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1156px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Copyright text */}
        <div style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '16px',
          color: '#191919'
        }}>
          Copyright @ 2023 Safelet. All rights reserved.
        </div>

        {/* Links section */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '15px',
          alignItems: 'center'
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

        {/* Hand crafted text */}
        <div style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400,
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

