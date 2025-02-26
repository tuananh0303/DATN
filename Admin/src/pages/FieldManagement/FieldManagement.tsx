import React from 'react';
import Sidebar from '@/components/Sidebar';
import ContentArea_Footer from './ContentArea';
import Footer from '@/components/Footer';

const FieldManagement: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <div className="flex-[0_0_240px] h-auto shadow-[2px_0_5px_rgba(0,0,0,0.1)]">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow h-auto">
      <ContentArea_Footer />
       <Footer/>
      </div>
    </div>
  );
};

export default FieldManagement;

