import React, { useState } from 'react';

interface OverviewStats {
  unpaid: {
    total: number;
    orders: number;
  };
  paid: {
    weekly: {
      total: number;
      orders: number;
    };
    monthly: {
      total: number;
      orders: number;
    };
    total: {
      total: number;
      orders: number;
    };
  };
}

interface BookingDetail {
  id: string;
  bookingInfo: string;
  paymentTransferDate: string;
  status: string;
  paymentMethod: string;
  amount: number;
}

const ReportManagement: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState('Sân cầu lông Phạm Kha');
  const [activeTab, setActiveTab] = useState('all');
  
  const stats: OverviewStats = {
    unpaid: {
      total: 2000000,
      orders: 10
    },
    paid: {
      weekly: {
        total: 10000000,
        orders: 40
      },
      monthly: {
        total: 10000000,
        orders: 800
      },
      total: {
        total: 10000000,
        orders: 22000
      }
    }
  };

  return (
    <div className="p-6">
      {/* Facility Selector */}
      <div className="mb-6">
        <select
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          className="w-full md:w-auto p-2 border rounded-lg"
        >
          <option value="Sân cầu lông Phạm Kha">Sân cầu lông Phạm Kha</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overview Section */}
        <div className="md:col-span-2 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Tổng quan</h2>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Unpaid Stats */}
            <div className="space-y-2">
              <h3 className="font-medium">Chưa thanh toán</h3>
              <div className="text-gray-600">Tổng cộng</div>
              <div className="text-2xl font-bold">đ {stats.unpaid.total.toLocaleString()}</div>
              <div>{stats.unpaid.orders} đơn</div>
            </div>

            {/* Paid Stats */}
            <div className="space-y-4">
              <h3 className="font-medium">Đã thanh toán</h3>
              
              <div>
                <div className="text-gray-600">Tuần này</div>
                <div className="text-2xl font-bold">đ {stats.paid.weekly.total.toLocaleString()}</div>
                <div>{stats.paid.weekly.orders} đơn</div>
              </div>

              <div>
                <div className="text-gray-600">Tháng này</div>
                <div>đ {stats.paid.monthly.total.toLocaleString()}</div>
                <div>{stats.paid.monthly.orders} đơn</div>
              </div>

              <div>
                <div className="text-gray-600">Tổng cộng</div>
                <div>đ {stats.paid.total.total.toLocaleString()}</div>
                <div>{stats.paid.total.orders} đơn</div>
              </div>
            </div>
          </div>
        </div>

        {/* Income Reports Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Báo cáo thu nhập</h2>
            <button className="text-blue-500 hover:underline">Xem &gt;</button>
          </div>

          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>01/01/2024 - 07/01/2024</span>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Details Section */}
      <div className="mt-6 bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Chi tiết đơn đặt sân</h2>

        <div className="space-y-4">
          {/* Filter Tabs */}
          <div className="flex gap-4">
            <button 
              className={`${activeTab === 'all' ? 'text-blue-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('all')}
            >
              Tất cả
            </button>
            <button 
              className={`${activeTab === 'unpaid' ? 'text-blue-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('unpaid')}
            >
              Chưa thanh toán
            </button>
            <button 
              className={`${activeTab === 'paid' ? 'text-blue-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('paid')}
            >
              Đã thanh toán
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Tìm kiếm cơ sở theo tên hoặc địa điểm"
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <svg className="w-4 h-4 absolute left-2 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="relative">
              <button className="flex items-center gap-2 p-2 border rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Thời gian
                <span className="text-gray-400">Chọn thời gian</span>
              </button>
            </div>

            <button className="p-2 border rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>

          {/* Bookings Table */}
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="p-4 text-left">Đơn đặt sân</th>
                <th className="p-4 text-left">Thanh toán đã chuyển vào</th>
                <th className="p-4 text-left">Trạng thái</th>
                <th className="p-4 text-left">Phương thức thanh toán</th>
                <th className="p-4 text-left">Số tiền thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {/* Table content will be populated here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportManagement; 