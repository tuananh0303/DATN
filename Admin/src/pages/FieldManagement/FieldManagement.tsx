import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import ContentArea_Footer from './ContentArea';

const FieldManagement: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      {/* Sidebar */}
      <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: '240px', height: 'auto', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, flexDirection: 'column', display: 'flex', height: 'auto' }}>
        {/* Top Bar */}
        <div style={{ flexGrow: 0, flexShrink: 0, height: '90px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <TopBar />
        </div>

        {/* Content Area and Footer */}
        <div style={{ flexGrow: 1, height: 'auto', padding: '20px' }}>
          <ContentArea_Footer />
        </div>
      </div>
    </div>
  );
};

export default FieldManagement;

