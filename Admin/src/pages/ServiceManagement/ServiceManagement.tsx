import React from 'react';
import Sidebar from '@/components/Sidebar';
import ContentArea from './ContentArea';
import Footer from '@/components/Footer';

const ServiceManagement: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <div className="flex-none w-60 h-auto shadow-md">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow h-auto">
        {/* Content Area */}
        <div className="flex-grow h-auto p-5">
          <ContentArea />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ServiceManagement;

