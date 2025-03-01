import { Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';
import UserHeader from '@/components/users/UserHeader/UserHeader';
import Footer from '@/components/users/Footer';

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

export const UserLayout: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
    <div className='font-main'>
      <UserHeader />      
        <Outlet />      
        <Footer />
      </div>
    </Suspense>
  );
};

