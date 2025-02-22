import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import OverviewCards from './OverviewCards';
import RecentActivity from './RecentActivity';
import FacilitiesList from './FacilityList';
import Footer from './Footer';

const DashboardLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', flexDirection: 'row', backgroundColor: '#f5f6fa' }}>
      <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: '240px', borderRight: '1px solid #d8d8d8' }}>
        <Sidebar />
      </div>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexGrow: 0 }}>
          <TopBar />
        </div>
        <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
          <h2 style={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '32px', color: '#000', marginBottom: '20px' }}>Overview</h2>
          <OverviewCards />
          <h2 style={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '32px', color: '#000', margin: '40px 0 20px' }}>Recent Activity</h2>
          <RecentActivity />
          <h2 style={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '32px', color: '#000', margin: '40px 0 20px' }}>New Facilities and Fields</h2>
          <FacilitiesList />
        </div>
        <div style={{ flexGrow: 0 }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

