import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import Content from './Content';

const Layout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <div style={{ flexGrow: 0, flexShrink: 0, width: '240px', height: 'auto' }}>
        <Sidebar onMenuItemClick={(item) => console.log(item)} />
      </div>
      <div style={{ flexGrow: 1, flexShrink: 1, height: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '90px', flexShrink: 0 }}>
          <TopBar />
        </div>
        <div style={{ flexGrow: 1, flexShrink: 1, height: 'auto', padding: '20px' }}>
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Layout;

