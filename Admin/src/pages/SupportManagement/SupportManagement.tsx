import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import ContentArea_Footer from './ContentArea_Footer';

const SupportManagementLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: '240px' }}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Top Bar */}
        <div style={{ height: '90px' }}>
          <TopBar />
        </div>

        {/* Content Area and Footer */}
        <div style={{ flexGrow: 1, backgroundColor: '#f5f6fa', display: 'flex', flexDirection: 'row' }}>
          {/* Message List */}
          <div style={{ flexBasis: '30%', borderRight: '1px solid #e0e0e0', overflowY: 'auto' }}>
            {/* Placeholder for Message List */}
          </div>
          {/* Main Content */}
          <div style={{ flexGrow: 1 }}>
            <ContentArea_Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportManagementLayout;

