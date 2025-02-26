import React from 'react';
import Sidebar from '@/components/Sidebar';
import UserProfile from './UserProfile';
import HistoryBooking from './HistoryBooking';
import Footer from '@/components/Footer';
import TopBar from './TopBar';

const UserManagementProfile: React.FC = () => {
  return (
    <div className="flex flex-row flex-grow">
      {/* Sidebar */}
      <div className="flex-none">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full min-h-screen bg-[#f5f6fa]">
        <TopBar />
        {/* Main Content */}
        <div className="flex-grow p-5">
          {/* Breadcrumb */}
          <div className="font-roboto text-sm text-[#858585] mb-5">
            USER MANAGEMENT &gt; <span className="text-black font-bold">USER DETAIL</span>
          </div>

          {/* User Profile Section */}
          <UserProfile />

          {/* Action Buttons */}
          <div className="flex gap-5 my-5">
            <button className="px-5 py-[10px] border-2 border-[#ff8c00] rounded-[10px] bg-transparent text-[#ff8c00] font-roboto font-semibold cursor-pointer">
              Warning
            </button>
            <button className="px-5 py-[10px] border-none rounded-[10px] bg-[#4880ff] text-white font-roboto font-semibold cursor-pointer">
              Ban
            </button>
          </div>

          {/* History Booking Section */}
          <HistoryBooking />
        </div>

        {/* Footer */}
        <div className="flex-none">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserManagementProfile;

