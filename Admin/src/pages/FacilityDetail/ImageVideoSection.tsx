import React from 'react';

interface ImageVideoSectionProps {
  style?: React.CSSProperties;
}

const ImageVideoSection: React.FC<ImageVideoSectionProps> = ({ style }) => {
  const images = [
    'https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/frame-37.png',
    'https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/bg.png',
    'https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/bg-2.png',
    'https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/bg-3.png'
  ];

  return (
    <div 
      style={{
        width: '100%',
        minWidth: '320px',
        maxWidth: '1014px',
        height: 'auto',
        backgroundColor: '#ffffff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...style
      }}
    >
      <h2 
        style={{
          fontSize: '24px',
          fontFamily: 'Roboto',
          fontWeight: 600,
          color: '#000000',
          marginBottom: '20px',
          textAlign: 'center'
        }}
      >
        IMAGE & VIDEO
      </h2>
      
      <div 
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '946px',
          height: 'auto',
          overflow: 'hidden'
        }}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            style={{
              flex: '1 1 200px',
              maxWidth: '220px',
              height: 'auto',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
          >
            <img 
              src={image}
              alt={`Facility image ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageVideoSection;
