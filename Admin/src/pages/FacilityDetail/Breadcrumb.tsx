import React from 'react';

interface BreadcrumbProps {
  style?: React.CSSProperties;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ style }) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '4px',
        alignItems: 'center',
        minWidth: '287px',
        height: '20px',
        ...style
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <span
          style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            color: '#3d4d54',
            textTransform: 'uppercase'
          }}
        >
          FACILITY MANAGEMENT
        </span>
      </div>

      <img 
        src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/icons.png"
        alt="arrow-right"
        style={{
          width: '16px',
          height: '16px',
          display: 'flex',
          alignItems: 'center'
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        <span
          style={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            color: '#126da6',
            textTransform: 'uppercase'
          }}
        >
          FACILITY DETAIL
        </span>
      </div>
    </div>
  );
};

Breadcrumb.defaultProps = {
  style: {}
};

export default Breadcrumb;

