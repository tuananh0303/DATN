import React from 'react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import ContentArea from './ContentArea_Pagination_Footer';

const EventManagementLayout: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f6fa]">
      <div className="w-[240px] flex-none h-auto shadow-[2px_0_5px_rgba(0,0,0,0.1)]">
        <Sidebar onMenuItemClick={(item) => console.log(item)} />
      </div>
      <div className="flex-grow flex flex-col h-auto">
        <ContentArea />
        <Footer/>
      </div>
    </div>
  );
};

export default EventManagementLayout;

