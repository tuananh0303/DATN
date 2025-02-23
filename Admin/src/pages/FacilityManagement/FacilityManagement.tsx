import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import Content from './Content';

const FacilityManagement: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <div style={{ flexGrow: 0, width: '240px', height: 'auto', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
        <Sidebar />
      </div>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: 'auto' }}>
        <div style={{ height: '90px', width: '100%', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <TopBar />
        </div>
        <div style={{ flexGrow: 1, width: '100%', height: 'auto', padding: '20px' }}>
          <Content />
        </div>
      </div>
    </div>
  );
};

export default FacilityManagement;

