import React from 'react';

interface FooterProps {
  style?: React.CSSProperties;
}

const Footer: React.FC<FooterProps> = ({ style }) => {
  return (
    <div style={{
      width: '100%',
      height: '60px',
      backgroundColor: '#e6e6e6',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '320px',
      ...style
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        maxWidth: '1160px',
        padding: '0 20px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400,
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

Footer.defaultProps = {
  style: {}
};

export default Footer;

