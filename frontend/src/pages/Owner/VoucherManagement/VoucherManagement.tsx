import React, { useState } from 'react';

interface Voucher {
  id: string;
  name: string;
  discountType: string;
  discountValue: string;
  totalCodes: number;
  usedCodes: number;
  status: 'Đang diễn ra' | 'Sắp diễn ra' | 'Đã kết thúc';
  timeRange: string;
}

const VoucherManagement: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState('Sân cầu lông Phạm Kha');
  
  const vouchers: Voucher[] = [
    {
      id: 'ANH-2607',
      name: 'Nguyễn Tuấn Anh',
      discountType: 'Giảm theo số tiền',
      discountValue: '15.000đ',
      totalCodes: 100,
      usedCodes: 5,
      status: 'Đang diễn ra',
      timeRange: '20:00 05/12/2024 - 11:00 08/12/2024'
    },
    {
      id: 'ANH-2607',
      name: 'Nguyễn Tuấn Anh',
      discountType: 'Giảm theo %',
      discountValue: '5%',
      totalCodes: 100,
      usedCodes: 5,
      status: 'Sắp diễn ra',
      timeRange: '20:00 05/12/2024 - 11:00 08/12/2024'
    },
    {
      id: 'ANH-2607',
      name: 'Nguyễn Tuấn Anh',
      discountType: 'Giảm theo số tiền',
      discountValue: '15.000đ',
      totalCodes: 100,
      usedCodes: 5,
      status: 'Đã kết thúc',
      timeRange: '20:00 05/12/2024 - 11:00 08/12/2024'
    }
  ];

  return (
    <div className="p-6">
      {/* Banner Section */}
      <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Tạo ngay Voucher để tăng doanh thu cho cơ sở của bạn!!!</h1>
          <p className="text-gray-600">Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo Voucher ưu đãi cho Khách hàng.</p>
          <button className="mt-4 bg-[#d65b3b] text-white px-6 py-2 rounded-lg flex items-center">
            Tạo Voucher ngay!
            <span className="ml-2">→</span>
          </button>
        </div>
        <div className="flex-shrink-0">
          <img src="/path-to-your-voucher-image.jpg" alt="Voucher Promotion" className="w-96" />
        </div>
      </div>

      {/* Voucher List Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Danh sách mã giảm giá</h2>
        
        {/* Facility Dropdown */}
        <div className="relative mb-6">
          <select 
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg appearance-none"
          >
            <option value="Sân cầu lông Phạm Kha">Sân cầu lông Phạm Kha</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 mb-6">
          <button className="text-blue-500 font-medium">Tất cả</button>
          <button className="text-gray-600">Đang diễn ra</button>
          <button className="text-gray-600">Sắp diễn ra</button>
          <button className="text-gray-600">Đã kết thúc</button>
        </div>

        {/* Vouchers Table */}
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-4 text-left">Tên Voucher / Mã Voucher</th>
              <th className="p-4 text-left">Loại giảm giá | Giá giảm</th>
              <th className="p-4 text-left">Tổng số mã giảm giá</th>
              <th className="p-4 text-left">Đã dùng</th>
              <th className="p-4 text-left">Trạng thái | Thời gian dùng mã giảm giá</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">
                  <div>
                    <div className="font-medium">{voucher.name}</div>
                    <div className="text-gray-500">{voucher.id}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div>{voucher.discountType}</div>
                    <div>{voucher.discountValue}</div>
                  </div>
                </td>
                <td className="p-4">{voucher.totalCodes}</td>
                <td className="p-4">{voucher.usedCodes}</td>
                <td className="p-4">
                  <div>
                    <span className={`
                      ${voucher.status === 'Đang diễn ra' && 'text-green-500'}
                      ${voucher.status === 'Sắp diễn ra' && 'text-yellow-500'}
                      ${voucher.status === 'Đã kết thúc' && 'text-red-500'}
                    `}>
                      {voucher.status}
                    </span>
                    <div className="text-gray-500">{voucher.timeRange}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button className="p-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="p-2 text-red-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherManagement; 