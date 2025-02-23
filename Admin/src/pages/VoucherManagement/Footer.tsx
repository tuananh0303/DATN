import React from 'react';

interface FooterProps {
  copyright?: string;
  termsLink?: string;
  privacyLink?: string;
  handCrafted?: string;
}

const Footer: React.FC<FooterProps> = ({
  copyright = "Copyright @ 2023 Safelet. All rights reserved.",
  termsLink = "Terms of Use",
  privacyLink = "Privacy Policy",
  handCrafted = "Hand Crafted & made with Love"
}) => {
  return (
    <div style={{
      width: '100%',
      height: '60px',
      backgroundColor: '#e6e6e6',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '320px',
      padding: '0 20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1156px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px'
      }}>
        <span style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          lineHeight: '16px',
          color: '#191919'
        }}>
          {copyright}
        </span>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '15px'
        }}>
          <a 
            href="#" 
            style={{
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: '16px',
              color: '#5858fa',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            {termsLink}
          </a>
          <div style={{
            width: '1px',
            height: '20px',
            backgroundColor: '#000000'
          }} />
          <a 
            href="#"
            style={{
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: '16px',
              color: '#5858fa',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            {privacyLink}
          </a>
        </div>

        <span style={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          lineHeight: '16px',
          color: '#191919'
        }}>
          {handCrafted}
        </span>
      </div>
    </div>
  );
};

export default Footer;

