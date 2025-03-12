import React from 'react';

interface BreadcrumbProps {
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className }) => {
  return (
    <div className={`flex flex-row gap-1 items-center min-w-[287px] h-5 ${className || ''}`}>
      <div className="flex flex-row gap-2.5 items-center cursor-pointer">
        <span className="font-sans text-sm font-normal leading-5 text-[#3d4d54] uppercase">
          FACILITY MANAGEMENT
        </span>
      </div>

      <img 
        src="https://dashboard.codeparrot.ai/api/image/Z7n1xTHWD6EJo6vC/icons.png"
        alt="arrow-right"
        className="w-4 h-4 flex items-center"
      />

      <div className="flex flex-row gap-2.5 items-center">
        <span className="font-sans text-sm font-normal leading-5 text-[#126da6] uppercase">
          FACILITY DETAIL
        </span>
      </div>
    </div>
  );
};

export default Breadcrumb;

