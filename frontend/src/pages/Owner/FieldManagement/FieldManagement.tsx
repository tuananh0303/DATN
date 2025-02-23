import React from 'react';
import Sidebar from '@/components/Owner/Sidebar';
import Content_TopBar_Footer from './Content';

const FieldManagement: React.FC = () => {
  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: '236px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Sidebar />
      </div>
      <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Content_TopBar_Footer />
      </div>
    </div>
  );
};

export default FieldManagement;

