import React, { useState } from 'react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  bookingId: string;
  service: string;
  rating: number;
  comment: string;
  timestamp: string;
}

const ReviewManagement: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState('Sân cầu lông Phạm Kha');
//   const [selectedRating, setSelectedRating] = useState<number[]>([1,2,3,4,5]);
//   const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  
  const reviews: Review[] = [
    {
      id: '123456789',
      userId: 'ANH',
      userName: 'Nguyễn Tuấn Anh',
      userAvatar: '/path-to-avatar.jpg',
      bookingId: '123456789',
      service: 'Bóng đá | Sân bóng 1 | Dịch vụ: Áo đấu, Bóng, Trọng tài',
      rating: 5,
      comment: 'Sân tuyệt vời, chất lượng sân Ok, không có vấn đề gì!!!',
      timestamp: '16:00 27/11/2024'
    },
    // ... more reviews
  ];

  return (
    <div className="p-6">
      {/* Rating Overview */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="Sân cầu lông Phạm Kha">Sân cầu lông Phạm Kha</option>
          </select>
        </div>

        <h2 className="text-xl font-bold mb-4">
          Đánh giá cơ sở <span className="text-red-500">4.8</span>/5
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Tổng lượt đánh giá</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold">10</div>
            <div className="text-sm text-gray-500">So với 30 ngày trước</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Tỷ lệ đánh giá tốt</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm text-gray-500">So với 30 ngày trước</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Đánh giá tiêu cực cần phản hồi</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-500">0</span>
              <button className="text-blue-500 hover:underline">Xem &gt;</button>
            </div>
            <div className="text-sm text-gray-500">Các đánh giá có 1 & 2 sao cần bạn phản hồi</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Đánh giá gần đây</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-500">0</span>
              <button className="text-blue-500 hover:underline">Xem &gt;</button>
            </div>
            <div className="text-sm text-gray-500">Đánh giá mới được cập nhật từ lần truy cập trước.</div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Danh sách đánh giá của cơ sở: {selectedFacility}
        </h2>

        {/* Filters */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Trạng thái</span>
            <button className="px-3 py-1 rounded-full bg-blue-100 text-blue-600">Tất cả (0)</button>
            <button className="px-3 py-1 rounded-full border">Cần phản hồi (0)</button>
            <button className="px-3 py-1 rounded-full border">Đã trả lời (0)</button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">Số sao đánh giá</span>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked /> Tất cả
            </label>
            {[5,4,3,2,1].map(star => (
              <label key={star} className="flex items-center gap-1">
                <input type="checkbox" checked /> {star} sao (0)
              </label>
            ))}
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Tên đăng nhập người chơi, Thể loại,..."
              className="flex-1 p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Chọn thời gian"
              className="flex-1 p-2 border rounded-lg"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Tìm kiếm</button>
            <button className="px-4 py-2 border rounded-lg">Đặt lại</button>
          </div>
        </div>

        {/* Reviews Table */}
        <table className="w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-4 text-left">Thông tin đánh giá</th>
              <th className="p-4 text-left">Đánh giá của Người chơi</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <img src={review.userAvatar} alt="" className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {review.userName}
                        <span className="bg-red-100 text-red-600 text-xs px-1 rounded">AD</span>
                      </div>
                      <div className="text-gray-500">ID đơn đặt sân {review.bookingId}</div>
                      <div className="text-sm mt-2">{review.service}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p>{review.comment}</p>
                  <div className="text-gray-500 text-sm mt-1">{review.timestamp}</div>
                </td>
                <td className="p-4">
                  <button className="text-blue-500 hover:underline">Trả lời</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewManagement; 