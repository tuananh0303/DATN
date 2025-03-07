import React from 'react';

interface ImageVideoSectionProps {
  className?: string;
}

const ImageVideoSection: React.FC<ImageVideoSectionProps> = ({ className }) => {
  const images = [
    'https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/frame-37.png',
    'https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/bg.png',
    'https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/bg-2.png',
    'https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/bg-3.png'
  ];

  return (
    <div className={`w-full min-w-[320px] max-w-[1014px] h-auto bg-white p-5 flex flex-col items-center ${className || ''}`}>
      <h2 className="text-2xl font-roboto font-semibold text-black mb-5 text-center">
        IMAGE & VIDEO
      </h2>
      
      <div className="flex gap-2.5 justify-center flex-wrap w-full max-w-[946px] h-auto overflow-hidden">
        {images.map((image, index) => (
          <div 
            key={index}
            className="flex-[1_1_200px] max-w-[220px] h-auto cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <img 
              src={image}
              alt={`Facility image ${index + 1}`}
              className="w-full h-auto object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageVideoSection;
