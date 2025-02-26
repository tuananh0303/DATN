import React from 'react';
import Sidebar from '@/components/Sidebar';
import ContentArea from './ContentAre';
import Footer from '@/components/Footer';

const ApprovalManagement: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <div className="w-[240px] flex-none shadow-[2px_0_5px_rgba(0,0,0,0.1)]">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        <div className="flex-none">
          <ContentArea />
        </div>
        <div className="flex-none">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default ApprovalManagement;

