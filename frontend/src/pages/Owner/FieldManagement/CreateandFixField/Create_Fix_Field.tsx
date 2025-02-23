import React from 'react';
import Sidebar from '@/components/Owner/Sidebar';
import TopBar_Content from './TopBar_Content';
import Footer from './Footer';

const CreateandFixField: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar style={{ flexGrow: 0, width: '236px', height: 'auto', backgroundColor: '#fff' }} />
        <TopBar_Content style={{ flexGrow: 1, height: 'auto', backgroundColor: '#fff' }} />
      </div>
      <Footer style={{ width: '100%', height: '60px', backgroundColor: '#e6e6e6' }} />
    </div>
  );
};

export default CreateandFixField;

