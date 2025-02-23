import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import ContentArea_Pagination_Footer from './ContentArea_Pagination_Footer';

const EventManagementLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <Sidebar style={{ flexGrow: 0, width: '240px', height: 'auto', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: 'auto' }}>
        <TopBar style={{ flexGrow: 0, width: '100%', height: '90px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
        <ContentArea_Pagination_Footer style={{ flexGrow: 1, width: '100%', height: 'auto', padding: '20px' }} />
      </div>
    </div>
  );
};

export default EventManagementLayout;

