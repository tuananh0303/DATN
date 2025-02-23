import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import ReviewList from './ReviewList';
import Pagination from './Pagination';
import Footer from './Footer';

const ReviewManagementLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      {/* Sidebar */}
      <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: '240px' }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <div style={{ flexGrow: 0, flexShrink: 0, height: '90px' }}>
          <TopBar />
        </div>

        {/* Content Area */}
        <div style={{ flexGrow: 1, padding: '20px', boxSizing: 'border-box' }}>
          {/* Search and Filter */}
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px', gap: '20px' }}>
            <div style={{ flexGrow: 1 }}>
              <SearchBar />
            </div>
            <div style={{ flexGrow: 1 }}>
              <FilterBar />
            </div>
          </div>

          {/* Review List */}
          <div style={{ flexGrow: 1, backgroundColor: '#fdfdfd', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <ReviewList />
          </div>

          {/* Pagination */}
          <div style={{ flexGrow: 0, marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Pagination />
          </div>
        </div>

        {/* Footer */}
        <div style={{ flexGrow: 0, flexShrink: 0, height: '60px' }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ReviewManagementLayout;

