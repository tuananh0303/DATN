import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ICONS } from '@/constants/owner/Content/content';
import { Review, Facility, ReviewStats, ReviewFilter } from '@/services/reviewService';

const ITEMS_PER_PAGE = 5;

const ReviewManagement: React.FC = () => {
  // States
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [reviewStats, setReviewStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    positiveRatePercentage: 0,
    negativeReviewsCount: 0,
    newReviewsCount: 0
  });
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'replied'>('all');
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  const [playerNameFilter, setPlayerNameFilter] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    if (selectedFacility) {
      fetchReviewStats();
      fetchReviews();
    }
  }, [selectedFacility, statusFilter, ratingFilter, playerNameFilter, dateRange, currentPage]);

  const fetchFacilities = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await reviewService.getFacilities();
      // setFacilities(response.data);
      setFacilities([
        { id: '1', name: 'Sân cầu lông Phạm Kha' }
      ]);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const fetchReviewStats = async () => {
    try {
      // TODO: Replace with actual API call
      // const stats = await reviewService.getReviewStats(selectedFacility);
      // setReviewStats(stats);
      setReviewStats({
        averageRating: 4.8,
        totalReviews: 10,
        positiveRatePercentage: 100,
        negativeReviewsCount: 0,
        newReviewsCount: 0
      });
    } catch (error) {
      console.error('Error fetching review stats:', error);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const filters: ReviewFilter = {
        facilityId: selectedFacility,
        status: statusFilter === 'all' ? undefined : statusFilter,
        ratings: ratingFilter.length > 0 ? ratingFilter : undefined,
        playerName: playerNameFilter || undefined,
        dateRange: dateRange[0] && dateRange[1] ? {
          start: dateRange[0],
          end: dateRange[1]
        } : undefined,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      };

      // TODO: Replace with actual API call
      // const response = await reviewService.getReviews(filters);
      // setReviews(response.data);
      // setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE));

      // Mock data
      setReviews([/* your existing mock reviews */]);
      setTotalPages(3);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleReplyToReview = async (reviewId: string, reply: string) => {
  //   try {
  //     await reviewService.replyToReview(reviewId, reply);
  //     fetchReviews(); // Refresh the list
  //   } catch (error) {
  //     console.error('Error replying to review:', error);
  //   }
  // };

  const handleRatingFilterChange = (rating: number) => {
    setRatingFilter(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="p-6">
      {/* Facility Selection */}
      <div className="relative mb-6">
        <select 
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg appearance-none
                   focus:outline-none focus:border-blue-500"
        >
          <option value="">Chọn cơ sở của bạn</option>
          {facilities.map((facility) => (
            <option key={facility.id} value={facility.id}>
              {facility.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <img src={ICONS.DROP_DOWN} alt="dropdown" className="w-4" />
        </div>
      </div>

      {/* Rating Overview */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">
          Đánh giá cơ sở <span className="text-red-500">{reviewStats.averageRating.toFixed(1)}</span>/5
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng lượt đánh giá"
            value={reviewStats.totalReviews}
            description="So với 30 ngày trước"
          />
          <StatCard
            title="Tỷ lệ đánh giá tốt"
            value={`${reviewStats.positiveRatePercentage}%`}
            description="So với 30 ngày trước"
          />
          <StatCard
            title="Đánh giá tiêu cực cần phản hồi"
            value={reviewStats.negativeReviewsCount}
            description="Các đánh giá có 1 & 2 sao cần bạn phản hồi"
            isNegative
          />
          <StatCard
            title="Đánh giá gần đây"
            value={reviewStats.newReviewsCount}
            description="Đánh giá mới được cập nhật từ lần truy cập trước"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Danh sách đánh giá của cơ sở
        </h2>

        <div className="space-y-4 mb-6">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Trạng thái</span>
            {[
              { id: 'all', label: 'Tất cả', count: reviewStats.totalReviews },
              { id: 'pending', label: 'Cần phản hồi', count: reviewStats.negativeReviewsCount },
              { id: 'replied', label: 'Đã trả lời', count: reviewStats.totalReviews - reviewStats.negativeReviewsCount }
            ].map((status) => (
              <button
                key={status.id}
                onClick={() => setStatusFilter(status.id as 'all' | 'pending' | 'replied')}
                className={`px-3 py-1 rounded-full transition-colors
                  ${statusFilter === status.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'border hover:bg-gray-50'}`}
              >
                {status.label} ({status.count})
              </button>
            ))}
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Số sao đánh giá</span>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={ratingFilter.length === 0}
                onChange={() => setRatingFilter([])}
              /> Tất cả
            </label>
            {[5,4,3,2,1].map(star => (
              <label key={star} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={ratingFilter.includes(star)}
                  onChange={() => handleRatingFilterChange(star)}
                /> {star} sao
              </label>
            ))}
          </div>

          {/* Search Filters */}
          <div className="flex gap-4">
            <input
              type="text"
              value={playerNameFilter}
              onChange={(e) => setPlayerNameFilter(e.target.value)}
              placeholder="Tên đăng nhập người chơi, Thể loại,..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <DatePicker
              selectsRange
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(update) => setDateRange(update)}
              placeholderText="Chọn thời gian"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={fetchReviews}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Tìm kiếm
            </button>
            <button 
              onClick={() => {
                setStatusFilter('all');
                setRatingFilter([]);
                setPlayerNameFilter('');
                setDateRange([null, null]);
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Đặt lại
            </button>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Thông tin đánh giá</th>
                <th className="p-4 text-left">Đánh giá của Người chơi</th>
                <th className="p-4 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <ReviewRow
                    key={review.id}
                    review={review}
                    onReply={handleReplyToReview}
                  />
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`mx-1 px-4 py-2 rounded transition-colors
                    ${currentPage === i + 1 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard: React.FC<{
  title: string;
  value: number | string;
  description: string;
  isNegative?: boolean;
}> = ({ title, value, description, isNegative }) => (
  <div className="border rounded-lg p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-600">{title}</span>
      <img src={ICONS.TEXT_MESSAGE} alt="arrow" className="w-6" />
    </div>
    <div className={`text-2xl font-bold ${isNegative ? 'text-red-500' : ''}`}>{value}</div>
    <div className="text-sm text-gray-500">{description}</div>
  </div>
);

const ReviewRow: React.FC<{
  review: Review;
  onReply: (reviewId: string, reply: string) => void;
}> = ({ review, onReply }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="p-4">
      <div className="flex items-center gap-2">
        <img src={review.userAvatar} alt="" className="w-8 h-8 rounded-full" />
        <div>
          <div className="font-medium">{review.userName}</div>
          <div className="text-gray-500">ID đơn đặt sân {review.bookingId}</div>
          <div className="text-sm mt-2">{review.service}</div>
        </div>
      </div>
    </td>
    <td className="p-4">
      <div className="flex items-center gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p>{review.comment}</p>
      <div className="text-gray-500 text-sm mt-1">{review.timestamp}</div>
    </td>
    <td className="p-4">
      <button
        onClick={() => onReply(review.id, 'Thank you for your review!')}
        className="text-blue-500 hover:underline"
      >
        Trả lời
      </button>
    </td>
  </tr>
);

export default ReviewManagement; 