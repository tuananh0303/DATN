import { Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';
import Header from '@/components/Player/Header';
import Footer from '@/components/Player/Footer';

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

export const PublicLayout: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="font-main overflow-x-hidden relative">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Suspense>
  );
};

