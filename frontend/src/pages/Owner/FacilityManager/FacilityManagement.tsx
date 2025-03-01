import React from 'react';
import TopNavigationBar from './TopNavigationBar';
import Header_FacilityList_Footer from './Header_FacilityList_Footer';

const FacilityManagement: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-[1204px] mx-auto bg-[#f5f6fa]">
      <div className="flex-none h-auto">
        <TopNavigationBar />
      </div>
      <div className="flex-1 h-auto">
        <Header_FacilityList_Footer />
      </div>
    </div>
  );
};

export default FacilityManagement;

