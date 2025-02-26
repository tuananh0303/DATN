import React from 'react';

interface ErrorPageProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  onGoHome?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title = "Oops! the page not found.",
  subtitle = "Or simply leverage the expertise of our consultation team.",
  imageSrc = "https://dashboard.codeparrot.ai/api/image/Z73Bu3nogYAtZdS-/404-erro.png",
  onGoHome = () => console.log("Go home clicked")
}) => {
  return (
    <div className="w-full min-h-screen bg-[#f4f6f8] flex flex-col items-center justify-center p-5">
      <div 
        className="w-[706px] h-[335px] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      
      <div className="mt-10 flex flex-col items-center gap-[15px]">
        <h1 className="font-['DM_Sans'] text-[42px] font-bold tracking-[-0.84px] text-[#161c24] m-0 text-center max-w-[505px]">
          {title}
        </h1>
        
        <p className="font-['DM_Sans'] text-sm font-normal leading-7 text-[#637381] m-0 text-center max-w-[375px]">
          {subtitle}
        </p>
        
        <button 
          onClick={onGoHome}
          className="mt-5 px-5 py-[14px] bg-[#448ff0] hover:bg-[#3672c2] rounded-lg text-white font-['Inter'] text-sm font-semibold tracking-[-0.42px] cursor-pointer transition-colors duration-200"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

