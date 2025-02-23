import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import Content_StatisticsCards from './Content_StatisticsCards';
import Footer from './Footer';

const ReportManagementLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Sidebar style={{ flexGrow: 0, width: '240px', height: 'auto', backgroundColor: '#fff' }} />
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <TopBar style={{ flexGrow: 0, height: '90px', width: '100%', backgroundColor: '#fff' }} />
          <Content_StatisticsCards style={{ flexGrow: 1, width: '100%', height: 'auto', padding: '20px' }} />
        </div>
      </div>
      <Footer style={{ flexGrow: 0, height: '60px', width: '100%', backgroundColor: '#e6e6e6' }} />
    </div>
  );
};

export default ReportManagementLayout;

