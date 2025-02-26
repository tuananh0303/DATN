import React from 'react';
import Sidebar from '@/components/Sidebar';
import Content_StatisticsCards from './Content_StatisticsCards';
import Footer from '@/components/Footer';

const ReportManagementLayout: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f6fa]">
      <div className="flex flex-row flex-grow">
        <div className="flex-[0_0_240px] h-auto bg-white">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-grow">             
            <Content_StatisticsCards />
            <Footer />          
        </div>
      </div>     
    </div>
  );
};

export default ReportManagementLayout;

