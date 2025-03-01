import React, { useState } from 'react';

interface Service {
  id: string;
  name: string;
  type: string;
  price: string;
  time: string;
  sport: string;
  status: 'Còn' | 'Hết';
}

const ServiceManagement: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState('Sân cầu lông Phạm Kha');
  
  const services: Service[] = [
    {
      id: 'ANH-2607',
      name: 'Nguyễn Tuấn Anh',
      type: 'Theo thời gian',
      price: '15.000đ/h',
      time: '10:00 - 11:00',
      sport: 'Cầu lông',
      status: 'Còn'
    },
    {
      id: 'ANH-2607',
      name: 'Nguyễn Tuấn Anh',
      type: 'Theo sản phẩm',
      price: '20.000đ/đôi',
      time: '10:00 - 11:00',
      sport: 'Cầu lông',
      status: 'Còn'
    },
    {
      id: 'ANH-2607',
      name: 'Nguyễn Tuấn Anh',
      type: 'Theo thời gian',
      price: '15.000đ',
      time: '10:00 - 11:00',
      sport: 'Cầu lông',
      status: 'Hết'
    }
  ];

  return (
    <div className="p-6">
      {/* Banner Section */}
      <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Tạo ngay dịch vụ để thu hút người chơi đến cơ sở của bạn!!!</h1>
          <p className="text-gray-600">Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo Voucher ưu đãi cho Khách hàng.</p>
          <button className="mt-4 bg-[#d65b3b] text-white px-6 py-2 rounded-lg flex items-center">
            Tạo dịch vụ ngay!
            <span className="ml-2">→</span>
          </button>
        </div>
        <div className="flex-shrink-0">
          <img src="/path-to-your-sports-image.jpg" alt="Sports Services" className="w-96" />
        </div>
      </div>

      {/* Service List Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Danh sách dịch vụ</h2>
        
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
          <button className="text-gray-600">Theo thời gian</button>
          <button className="text-gray-600">Theo số lượng</button>
        </div>

        {/* Services Table */}
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-4 text-left">Tên dịch vụ</th>
              <th className="p-4 text-left">Loại dịch vụ | Giá</th>
              <th className="p-4 text-left">Thời gian áp dụng</th>
              <th className="p-4 text-left">Loại hình thể thao</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-gray-500">{service.id}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div>{service.type}</div>
                    <div>{service.price}</div>
                  </div>
                </td>
                <td className="p-4">{service.time}</td>
                <td className="p-4">{service.sport}</td>
                <td className="p-4">
                  <span className={`${
                    service.status === 'Còn' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {service.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
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

export default ServiceManagement; 