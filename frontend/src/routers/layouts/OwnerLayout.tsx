import React, { Suspense ,useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Owner/Sidebar';
import Topbar from '@/components/Owner/Topbar';
import Footer from '@/components/Owner/Footer';
import { useAppSelector } from '@/hooks/reduxHooks';

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);


export const OwnerLayout: React.FC = () => {
  const { isLoading } = useAppSelector(state => state.user);
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Show loading while authentication is being checked
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex w-full min-h-screen bg-[#f5f6fa]">
        <div className={`${sidebarCollapsed ? 'flex-[0_0_80px]' : 'flex-[0_0_240px]'} transition-all duration-300 ease-in-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`}>
          <Sidebar onToggle={setSidebarCollapsed} />
        </div>
        <div className="flex-[1_1_auto] flex flex-col overflow-hidden">
          <div className={`fixed top-0 ${sidebarCollapsed ? 'left-[80px]' : 'left-[240px]'} right-0 z-50 transition-all duration-300 ease-in-out`}>
          <Topbar />
          </div>
          <div className='mt-[75px]'>
          <main>
            <Outlet />
        </main>                
          <Footer />
          </div>  
        </div>
      </div>
    </Suspense>
  );
};