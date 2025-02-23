import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from './TopBar';
import SearchBar from './SearchBar';
import VoucherList from './VoucherList';
import Pagination from './Pagination';
import Footer from './Footer';

const VoucherManagementLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      {/* Sidebar */}
      <div style={{ flexGrow: 0, flexShrink: 0, width: '240px' }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <div style={{ flexGrow: 0, height: '90px' }}>
          <TopBar />
        </div>

        {/* Content Area */}
        <div style={{ flexGrow: 1, padding: '20px', backgroundColor: '#ffffff' }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <SearchBar />
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#e0e0e0', border: 'none', cursor: 'pointer' }}>All</button>
              <button style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#e0e0e0', border: 'none', cursor: 'pointer' }}>In progress</button>
              <button style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#e0e0e0', border: 'none', cursor: 'pointer' }}>Coming soon</button>
              <button style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#e0e0e0', border: 'none', cursor: 'pointer' }}>Finished</button>
            </div>
            <button style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#ff7f50', border: 'none', color: '#ffffff', cursor: 'pointer' }}>Create Voucher</button>
          </div>

          {/* Voucher List */}
          <div style={{ flexGrow: 1, marginBottom: '20px' }}>
            <VoucherList />
          </div>

          {/* Pagination */}
          <div style={{ flexGrow: 0, marginBottom: '20px' }}>
            <Pagination />
          </div>
        </div>

        {/* Footer */}
        <div style={{ flexGrow: 0, height: '60px' }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default VoucherManagementLayout;

