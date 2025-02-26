import React from 'react';
import Sidebar from '@/components/Sidebar';
import ContentArea_Footer from './ContentArea_Footer';

const SupportManagementLayout: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen">
      {/* Sidebar */}
      <div className="flex-none w-60">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Content Area and Footer */}
        <div className="flex flex-row flex-grow bg-[#f5f6fa]">
          {/* Message List */}
          <div className="w-[30%] border-r border-[#e0e0e0] overflow-y-auto">
            {/* Placeholder for Message List */}
          </div>
          {/* Main Content */}
          <div className="flex-grow">
            <ContentArea_Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportManagementLayout;

