import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import Breadcrumb from './Breadcrumb';
import FacilityDetails from './FacilityDetails';
import ImageVideoSection from './ImageVideoSection';
import RegardingSection from './RegardingSection';
import Footer from './Footer';

const FacilityDetailManagement: React.FC = () => {
  return (    
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
        <Sidebar style={{ flexGrow: 0, width: '240px', height: 'auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <TopBar style={{ flexGrow: 0, height: '90px' }} />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                <Breadcrumb style={{ marginBottom: '20px' }} />
                <FacilityDetails style={{ marginBottom: '20px' }} />
                <ImageVideoSection style={{ marginBottom: '20px' }} />
                <RegardingSection style={{ marginBottom: '20px' }} />
            </div>
            <Footer style={{ flexGrow: 0, height: '60px' }} />
        </div>
    </div>
  );
};

export default FacilityDetailManagement;

