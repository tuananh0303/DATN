import React from 'react';
import Sidebar from '@/components/Sidebar';
import Content from './Content';
import Footer from '@/components/Footer';

const FacilityManagement: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f6fa]">
      <div className="w-[240px] h-auto shadow-[2px_0_5px_rgba(0,0,0,0.1)]">
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col h-auto">
        <Content />
        <div className="flex-none">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default FacilityManagement;

