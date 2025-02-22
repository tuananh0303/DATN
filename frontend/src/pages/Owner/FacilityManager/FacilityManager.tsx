import React from 'react';
import Sidebar from '@/components/Owner/Sidebar';
import Content from '@/pages/Owner/FacilityManager/Content';
import './FacilityManager.css';

const FacilityManager: React.FC = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <Content />
    </div>
  );
};

export default FacilityManager;

