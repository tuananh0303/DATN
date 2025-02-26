import React from 'react';
import Sidebar from '@/components/Sidebar';
import ContentReview from './ContentReview';
import Footer from '@/components/Footer';

const ReviewManagementLayout: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <div className="flex-[0_0_240px]">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <ContentReview />
        <Footer />
      </div>
    </div>
  );
};

export default ReviewManagementLayout;

