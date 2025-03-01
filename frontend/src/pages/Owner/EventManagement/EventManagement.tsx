import React, { useState } from 'react';

interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  timeRange: string;
  status: 'Đang diễn ra' | 'Sắp diễn ra' | 'Đã kết thúc';
}

const EventManagement: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState('Sân cầu lông Phạm Kha');
  
  const events: Event[] = [
    {
      id: 'ANH-2607',
      name: 'Nguyễn Tuấn Anh',
      description: 'Nguyễn Tuấn Anh',
      image: 'Nguyễn Tuấn Anh',
      timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
      status: 'Đang diễn ra'
    },
    {
      id: 'ANH-2607',
      name: 'Nguyễn Tuấn Anh',
      description: 'Nguyễn Tuấn Anh',
      image: 'Nguyễn Tuấn Anh',
      timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
      status: 'Sắp diễn ra'
    },
    {
      id: 'ANH-2607',
      name: 'Nguyễn Tuấn Anh',
      description: 'Nguyễn Tuấn Anh',
      image: 'Nguyễn Tuấn Anh',
      timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
      status: 'Đã kết thúc'
    }
  ];

  return (
    <div className="p-6">
      {/* Banner Section */}
      <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Tạo ngay Event để thu hút người chơi đến cơ sở của bạn nào!!!</h1>
          <p className="text-gray-600">Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo Voucher ưu đãi cho Khách hàng.</p>
          <button className="mt-4 bg-[#d65b3b] text-white px-6 py-2 rounded-lg flex items-center">
            Tạo Event ngay!
            <span className="ml-2">→</span>
          </button>
        </div>
        <div className="flex-shrink-0">
          <img 
            src="/path-to-your-sports-image.jpg" 
            alt="Sports Events" 
            className="w-96 rounded-lg border-4 border-blue-200"
          />
        </div>
      </div>

      {/* Event List Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Danh sách sự kiện</h2>
        
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

        {/* Events Table */}
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-4 text-left">Tên sự kiện</th>
              <th className="p-4 text-left">Mô tả</th>
              <th className="p-4 text-left">Hình ảnh minh họa</th>
              <th className="p-4 text-left">Thời gian diễn ra sự kiện</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">
                  <div>
                    <div className="font-medium">{event.name}</div>
                    <div className="text-gray-500">{event.id}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium">{event.description}</div>
                  <div className="text-gray-500">{event.id}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium">{event.image}</div>
                  <div className="text-gray-500">{event.id}</div>
                </td>
                <td className="p-4">
                  <div>
                    <span className={`
                      ${event.status === 'Đang diễn ra' && 'text-green-500'}
                      ${event.status === 'Sắp diễn ra' && 'text-yellow-500'}
                      ${event.status === 'Đã kết thúc' && 'text-red-500'}
                    `}>
                      {event.status}
                    </span>
                    <div className="text-gray-500">{event.timeRange}</div>
                  </div>
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

export default EventManagement; 