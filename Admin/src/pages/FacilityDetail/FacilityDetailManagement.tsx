import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import Breadcrumb from './Breadcrumb';
import FacilityDetails from './FacilityDetails';
import ImageVideoSection from './ImageVideoSection';
import RegardingSection from './RegardingSection';
import Footer from '@/components/Footer';

const FacilityDetailManagement: React.FC = () => {
  return (    
    <div className="flex flex-row w-full min-h-screen bg-[#f5f6fa]">
        <Sidebar />
        <div className="flex flex-col flex-grow">
            <TopBar className="flex-none h-[90px]" />
            <div className="flex-grow p-5">
                <Breadcrumb className="mb-5" />
                <FacilityDetails className="mb-5" />
                <ImageVideoSection className="mb-5" />
                <RegardingSection className="mb-5" />
            </div>
            <Footer />
        </div>
    </div>
  );
};

export default FacilityDetailManagement;

