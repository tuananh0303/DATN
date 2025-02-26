import React from 'react';
import Sidebar from '@/components/Sidebar';
import ContentVoucher from './ContentVoucher';
import Footer from '@/components/Footer';

const VoucherManagementLayout: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <div className="flex-none w-60">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <ContentVoucher />
        {/* Footer */}
        <div className="flex-none h-[60px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default VoucherManagementLayout;

