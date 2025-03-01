import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// Loading component
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

const Sidebar = lazy(() => import('@/components/Owner/Sidebar'));
const Topbar = lazy(() => import('@/components/Owner/Topbar'));
const Footer = lazy(() => import('@/components/Owner/Footer'));

export const OwnerLayout: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex w-full min-h-screen bg-[#f5f6fa]">
        <div className="flex-[0_0_240px] shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <Sidebar />
        </div>
        <div className="flex-[1_1_auto] flex flex-col">
          <div className="fixed top-0 right-0 left-[240px] z-50">
          <Topbar />
          </div>
          <div className='mt-[75px]'>
          <Outlet />                  
          <Footer />
          </div>  
        </div>
      </div>
    </Suspense>
  );
};