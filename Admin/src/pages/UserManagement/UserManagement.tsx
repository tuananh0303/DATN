import React from 'react';
import Sidebar from '@/components/Sidebar';
import ContentArea from './ContentArea';
import Footer from '@/components/Footer';

const UserManagement: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <div className="w-[240px] flex-none h-auto shadow-[2px_0_5px_rgba(0,0,0,0.1)]">
        <Sidebar />
      </div>
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-auto">      
        {/* Content Area */}
        <div className="flex-grow h-auto p-5">
          <ContentArea />
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default UserManagement;

