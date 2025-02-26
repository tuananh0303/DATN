import React from 'react';
import Sidebar from '@/components/Sidebar';
import ContentDashboard from './ContentDashboard';
import Footer from '@/components/Footer';
const DashboardLayout: React.FC = () => {
  return (
    <div className="flex w-full min-h-screen flex-row bg-[#f5f6fa]">
      <div className="flex-none w-60 border-r border-[#d8d8d8]">
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col">
        <div className="flex-none">
          <ContentDashboard />
        </div>
        <div className="flex-none">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

