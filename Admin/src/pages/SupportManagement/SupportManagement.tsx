import React from 'react';

const SupportManagement: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-full bg-[#f5f6fa]">
      {/* Main Content Area */}
      <div className="flex-1 flex justify-center items-center flex-col p-5">
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z7oUuVCHtJJZ6wCw/rectangl-8.png" 
          alt="Welcome"
          className="w-full max-w-[334px] h-auto mb-5"
        />
        <h1 className="font-inter font-semibold text-2xl mb-[10px] text-center">
          Welcome to support Management!
        </h1>
        <p className="font-inter font-normal text-xl m-0 text-center">
          Bắt đầu trả lời người dùng!
        </p>
      </div>

      {/* Footer */}
      <div className="h-[60px] bg-[#e6e6e6] flex items-center px-5">
        <div className="flex justify-between items-center w-full">
          <span className="font-roboto text-sm text-[#191919]">
            Copyright @ 2023 Safelet. All rights reserved.
          </span>

          <div className="flex items-center gap-[15px]">
            <a href="#" className="font-roboto text-sm font-bold text-[#5858fa] no-underline">
              Terms of Use
            </a>
            <div className="w-[1px] h-5 bg-black" />
            <a href="#" className="font-roboto text-sm font-bold text-[#5858fa] no-underline">
              Privacy Policy
            </a>
            <span className="font-roboto text-sm text-[#191919] ml-[15px]">
              Hand Crafted & made with Love
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportManagement;

