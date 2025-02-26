import React from 'react';
import Sidebar from '@/components/Sidebar';
import Content from './Content';
import Footer from '@/components/Footer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f6fa]">
      <div className="w-[240px] flex-none h-auto">
        <Sidebar onMenuItemClick={(item) => console.log(item)} />
      </div>
      <div className="flex-grow flex flex-col h-auto">
        <div className="flex-none">
          <Content />
        </div>
        <div className="flex-none">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;

