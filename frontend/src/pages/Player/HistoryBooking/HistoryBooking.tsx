import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Tag, Button, Modal, Typography, Space, Tabs, Select, 
  DatePicker, Input, Badge, Row, Col, Statistic, Avatar, Empty, notification, Tooltip, Breadcrumb, Popover,
  Dropdown
} from 'antd';
import type { TabsProps } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import { 
  EyeOutlined, CloseCircleOutlined, StarOutlined, SearchOutlined, 
  InfoCircleOutlined, CalendarOutlined, FilterOutlined, ReloadOutlined,
  CheckCircleOutlined, HistoryOutlined, ClockCircleOutlined, SyncOutlined, 
  ExclamationCircleOutlined, DownOutlined,
  EnvironmentOutlined, BookOutlined
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import bookingService from '@/services/booking.service';
import { getSportNameInVietnamese } from '@/utils/translateSport';
import { sportService } from '@/services/sport.service';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal;

interface Facility {
  id: string;
  name: string;
  description: string;
  location: string;
  status: string;
  avgRating: number;
  numberOfRating: number;
  imagesUrl: string[];
  fieldGroups: FieldGroup[];
}

interface FieldGroup {
  id: string;
  name: string;
  dimension: string;
  surface: string;
  basePrice: number;
}

interface Sport {
  id: number;
  name: string;
}

interface Field {
  id: number;
  name: string;
  status: string;
}

interface BookingSlot {
  id: number;
  date: string;
  status: string;
  field: Field;
}

interface Payment {
  id: string;
  fieldPrice: number;
  servicePrice: number | null;
  discount: number | null;
  refund: number;
  refundedPoint: number;
  updatedAt: string;
}

interface ReviewData {
  id: number;
  rating: number;
  comment: string;
  imageUrl: string[];
  reviewAt: string;
  feedbackAt?: string;
  feedback?: string;
}

interface BookingData {
  id: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  sport: Sport;
  bookingSlots: BookingSlot[];
  payment: Payment;
  review?: ReviewData | null;
}

interface BookingHistoryItem {
  facility: Facility;
  booking: BookingData;
}

// Định nghĩa kiểu dữ liệu cho BookingSummaryCard
interface BookingSummaryData {
  total: number;
  upcoming: number;
  completed: number;
  canceled: number;
  inProgress: number;
}

// Tách thành component riêng để dễ quản lý
const BookingSummaryCard = ({ data }: { data: BookingSummaryData }) => {
  return (
    <Row gutter={[16, 16]} className="mb-6">
      <Col xs={24} sm={12} lg={6}>
        <Card className="summary-card hover:shadow-md transition-all" hoverable>
          <Statistic
            title={<span className="font-medium">Tổng lượt đặt sân</span>}
            value={data.total}
            prefix={<HistoryOutlined className="text-blue-500" />}
            valueStyle={{ color: '#1890ff', fontWeight: 600 }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="summary-card hover:shadow-md transition-all" hoverable>
          <Statistic
            title={<span className="font-medium">Sắp diễn ra</span>}
            value={data.upcoming}
            prefix={<ClockCircleOutlined className="text-orange-500" />}
            valueStyle={{ color: '#fa8c16', fontWeight: 600 }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="summary-card hover:shadow-md transition-all" hoverable>
          <Statistic
            title={<span className="font-medium">Hoàn thành</span>}
            value={data.completed}
            prefix={<CheckCircleOutlined className="text-green-500" />}
            valueStyle={{ color: '#52c41a', fontWeight: 600 }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="summary-card hover:shadow-md transition-all" hoverable>
          <Statistic
            title={<span className="font-medium">Đã hủy/Hoàn tiền</span>}
            value={data.canceled}
            prefix={<CloseCircleOutlined className="text-red-500" />}
            valueStyle={{ color: '#ff4d4f', fontWeight: 600 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

// Lấy ngày hiển thị dựa vào trạng thái và danh sách ngày
const getDisplayDate = (dates: string[], status: string, bookingSlots: BookingSlot[]): string => {
  // Sắp xếp các ngày theo thứ tự tăng dần
  const sortedDates = [...dates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  // Nếu chỉ có một ngày, trả về ngày đó
  if (sortedDates.length === 1) {
    return sortedDates[0];
  }
  
  // Xác định ngày hiển thị dựa vào trạng thái
  const today = dayjs();
  
  if (status === 'upcoming') {
    // Tìm slot sắp tới gần nhất
    const upcomingSlots = bookingSlots.filter(slot => slot.status === 'upcoming');
    if (upcomingSlots.length > 0) {
      // Sắp xếp theo ngày gần nhất
      const sortedUpcomingSlots = [...upcomingSlots].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      return sortedUpcomingSlots[0].date;
    }
  } else if (status === 'in_progress') {
    // Tìm ngày đang diễn ra (ngày hiện tại)
    const currentDate = sortedDates.find(date => dayjs(date).isSame(today, 'day'));
    if (currentDate) {
      return currentDate;
    }
    
    // Nếu không có ngày nào trùng với ngày hiện tại, tìm slot sắp tới gần nhất
    const upcomingSlots = bookingSlots.filter(slot => slot.status === 'upcoming');
    if (upcomingSlots.length > 0) {
      const sortedUpcomingSlots = [...upcomingSlots].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      return sortedUpcomingSlots[0].date;
    }
  } else if (status === 'completed') {
    // Tìm ngày đã hoàn thành cuối cùng
    const completedSlots = bookingSlots.filter(slot => slot.status === 'done');
    if (completedSlots.length > 0) {
      const sortedCompletedSlots = [...completedSlots].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() // Sắp xếp giảm dần
      );
      return sortedCompletedSlots[0].date;
    }
  } else if (status === 'canceled') {
    // Với trạng thái đã hủy, hiển thị ngày cuối cùng
    return sortedDates[sortedDates.length - 1];
  }
  
  // Mặc định trả về ngày đầu tiên
  return sortedDates[0];
};

// Add a BookingDate component to display multiple dates
const BookingDates = ({ dates, status, bookingSlots }: { dates: string[], status: string, bookingSlots: BookingSlot[] }) => {
  // Nếu chỉ có một ngày, hiển thị ngày đó
  if (dates.length === 1) {
    return <span>{dayjs(dates[0]).format('DD/MM/YYYY')}</span>;
  }

  // Sắp xếp các ngày theo thứ tự tăng dần
  const sortedDates = [...dates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  // Xác định ngày hiển thị dựa vào trạng thái
  const displayDate = getDisplayDate(sortedDates, status, bookingSlots);
  
  // Hiển thị popover cho tất cả các ngày
  const content = (
    <div className="p-1">
      {sortedDates.map((date, index) => {
        // Tìm slot tương ứng với ngày này
        const slot = bookingSlots.find(s => s.date === date);
        const slotStatus = slot ? slot.status : 'unknown';
        
        // Xác định màu sắc dựa trên trạng thái của slot
        let statusColor = 'default';
        if (slotStatus === 'done') statusColor = 'green';
        else if (slotStatus === 'upcoming') statusColor = 'blue';
        else if (slotStatus === 'canceled') statusColor = 'red';
        
        return (
          <div key={index} className="mb-1 last:mb-0">
            <Tag color={date === displayDate ? statusColor : "default"}>
              {`${index + 1}: ${dayjs(date).format('DD/MM/YYYY')}`}
              {date === displayDate && <span className="ml-1">(Hiển thị)</span>}
              {slotStatus !== 'unknown' && (
                <span className={`ml-1 ${slotStatus === 'done' ? 'text-green-500' : slotStatus === 'upcoming' ? 'text-blue-500' : 'text-red-500'}`}>
                  [{slotStatus === 'done' ? 'Hoàn thành' : slotStatus === 'upcoming' ? 'Sắp diễn ra' : 'Đã hủy'}]
                </span>
              )}
            </Tag>
          </div>
        );
      })}
    </div>
  );

  return (
    <Popover
      content={content}
      title="Lịch định kỳ"
      trigger="hover"
      placement="bottom"
    >
      <span className="cursor-pointer hover:text-blue-500">
        {dayjs(displayDate).format('DD/MM/YYYY')} <span className="font-medium text-blue-500 ml-1">[{dates.length}]</span>
      </span>
    </Popover>
  );
};

const HistoryBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filterTimeRange, setFilterTimeRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [sportFilter, setSportFilter] = useState<number | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sports, setSports] = useState<Sport[]>([]);
  // Thêm state để lưu bookings từ API
  const [bookings, setBookings] = useState<BookingHistoryItem[]>([]);
  
  // Thêm state cho việc hiển thị booking sắp tới
  // const [upcomingBookings, setUpcomingBookings] = useState<BookingHistoryItem[]>([]);
  
  // State cho booking statistics
  const [bookingStats, setBookingStats] = useState<BookingSummaryData>({
    total: 0,
    upcoming: 0,
    completed: 0,
    canceled: 0,
    inProgress: 0
  });

  // State để lưu danh sách các cơ sở đã từng đặt (unique)
  const [bookableFacilities, setBookableFacilities] = useState<{id: string, name: string}[]>([]);

  // State để lưu trạng thái unread của các tab
  const [unreadCounts, setUnreadCounts] = useState<{[key: string]: number}>({
    all: 0,
    upcoming: 0,
    in_progress: 0,
    completed: 0,
    canceled: 0
  });

  // State để lưu lịch sử booking đã load
  const [loadedBookingIds, setLoadedBookingIds] = useState<Set<string>>(new Set());

  // Cache kết quả getBookingDisplayStatus để tránh tính toán lại
  const displayStatusCache = React.useRef(new Map<string, string>()).current;

  // Fetch data khi component được mount
  useEffect(() => {
    // Khi component được mount lần đầu, không tính là có booking mới
    const isFirstLoad = loadedBookingIds.size === 0;
    fetchBookings(isFirstLoad);
  }, []);

  // Tách API calls để cải thiện hiệu suất
  const fetchSports = async () => {
    try {
      const sportsData: Sport[] = await sportService.getSport();
      setSports(sportsData);
    } catch (error) {
      console.error('Error fetching sports:', error);
    }
  };

  // Gọi API để lấy dữ liệu
  const fetchBookings = async (isFirstLoad = false) => {
    setLoading(true);
    
    try {
      // Gọi API lấy thông tin sports song song với bookings
      fetchSports();
      
      const bookingsData: BookingHistoryItem[] = await bookingService.getBookingPlayer();
      
      // Cập nhật bookings
      setBookings(bookingsData);
      
      // Cập nhật thống kê
      updateBookingStats(bookingsData);
      
      // Xử lý dữ liệu booking sắp tới
      // processUpcomingBookings(bookingsData);
      
      // Lấy danh sách các cơ sở unique đã từng đặt
      processBookableFacilities(bookingsData);
      
      // Xử lý booking mới
      if (!isFirstLoad) {
        processNewBookings(bookingsData);
      }
      
      // Lưu lại danh sách booking đã load
      setLoadedBookingIds(new Set(bookingsData.map(item => item.booking.id)));
      
    } catch (error) {
      console.error('Error fetching bookings:', error);
      notification.error({
        message: 'Không thể tải dữ liệu',
        description: 'Đã xảy ra lỗi khi tải lịch sử đặt sân. Vui lòng thử lại sau.'
      });
    } finally {
      setLoading(false);
    }
  };

  
  // const processUpcomingBookings = (bookingsData: BookingHistoryItem[]) => {
  //   const today = dayjs();
  //   const next7Days = today.add(7, 'day');
    
  //   // Tạo Map để cache kết quả getBookingDisplayStatus
  //   const statusCache = new Map<string, string>();
    
  //   const upcoming = bookingsData.filter((item: BookingHistoryItem) => {
  //     // Cache kết quả để tránh tính toán lại
  //     let displayStatus = statusCache.get(item.booking.id);
  //     if (!displayStatus) {
  //       displayStatus = getBookingDisplayStatus(item);
  //       statusCache.set(item.booking.id, displayStatus);
  //     }
      
  //     if (displayStatus !== 'upcoming') return false;
      
  //     // Kiểm tra xem booking có ngày nào diễn ra trong 7 ngày tới không
  //     const bookingDates = item.booking.bookingSlots.map(slot => slot.date);
  //     const hasDateInNext7Days = bookingDates.some(date => {
  //       const bookingDate = dayjs(date);
  //       return bookingDate.isAfter(today) && bookingDate.isBefore(next7Days) || bookingDate.isSame(today, 'day');
  //     });
      
  //     return hasDateInNext7Days;
  //   });
    
  //   // Sắp xếp booking theo ngày gần nhất
  //   // const sortedUpcoming = [...upcoming].sort((a, b) => {
  //   //   // Lấy ngày gần nhất của mỗi booking
  //   //   const datesA = a.booking.bookingSlots.map(slot => slot.date)
  //   //     .sort((d1, d2) => new Date(d1).getTime() - new Date(d2).getTime());
  //   //   const datesB = b.booking.bookingSlots.map(slot => slot.date)
  //   //     .sort((d1, d2) => new Date(d1).getTime() - new Date(d2).getTime());
      
  //   //   // Tìm ngày gần nhất trong tương lai cho booking A
  //   //   const nextDateA = datesA.find(date => dayjs(date).isAfter(today) || dayjs(date).isSame(today, 'day')) || datesA[0];
      
  //   //   // Tìm ngày gần nhất trong tương lai cho booking B
  //   //   const nextDateB = datesB.find(date => dayjs(date).isAfter(today) || dayjs(date).isSame(today, 'day')) || datesB[0];
      
  //   //   // So sánh hai ngày
  //   //   return new Date(nextDateA).getTime() - new Date(nextDateB).getTime();
  //   // });
    
  //   // setUpcomingBookings(sortedUpcoming);
  // };

  // Tách xử lý cơ sở có thể đặt để cải thiện hiệu suất
  const processBookableFacilities = (bookingsData: BookingHistoryItem[]) => {
    const uniqueFacilities = Array.from(
      new Map(
        bookingsData.map((item: BookingHistoryItem) => [
          item.facility.id, 
          { id: item.facility.id, name: item.facility.name }
        ])
      ).values()
    ) as {id: string, name: string}[];
    
    setBookableFacilities(uniqueFacilities);
  };

  // Tách xử lý booking mới để cải thiện hiệu suất
  const processNewBookings = (bookingsData: BookingHistoryItem[]) => {
    // Tính toán booking mới bằng cách so sánh với loadedBookingIds
    const newBookings = bookingsData.filter((item: BookingHistoryItem) => 
      !loadedBookingIds.has(item.booking.id)
    );
    
    // Cập nhật số lượng unread cho mỗi tab dựa trên booking mới
    if (newBookings.length > 0) {
      const newUnreadCounts = { ...unreadCounts };
      
      // Cập nhật số lượng cho tab tất cả
      newUnreadCounts.all += newBookings.length;
      
      // Tạo Map để cache kết quả getBookingDisplayStatus
      const statusCache = new Map<string, string>();
      
      // Cập nhật số lượng cho các tab khác
      newBookings.forEach((item: BookingHistoryItem) => {
        // Cache kết quả để tránh tính toán lại
        let status = statusCache.get(item.booking.id);
        if (!status) {
          status = getBookingDisplayStatus(item);
          statusCache.set(item.booking.id, status);
        }
        
        if (status === 'upcoming') newUnreadCounts.upcoming += 1;
        else if (status === 'in_progress') newUnreadCounts.in_progress += 1;
        else if (status === 'completed') newUnreadCounts.completed += 1;
        else if (status === 'canceled') newUnreadCounts.canceled += 1;
      });
      
      setUnreadCounts(newUnreadCounts);
    }
  };

  // Xử lý khi chuyển tab
  const handleTabChange = (tabKey: string) => {
    // Cập nhật tab đang active
    setActiveTab(tabKey);
    
    // Đặt số lượng unread của tab này về 0
    setUnreadCounts(prev => ({
      ...prev,
      [tabKey]: 0
    }));
    
    // Nếu xem tab tất cả, reset tất cả các tab khác
    if (tabKey === 'all') {
      setUnreadCounts({
        all: 0,
        upcoming: 0,
        in_progress: 0,
        completed: 0,
        canceled: 0
      });
    }
  };

  // Lấy số lượng booking chưa đọc cho mỗi tab
  const getUnreadCount = (tabKey: string) => {
    return unreadCounts[tabKey] || 0;
  };

  // Cấu hình tabs
  const tabs: TabsProps['items'] = [
    {
      key: 'all',
      label: (
        <Badge count={getUnreadCount('all')} offset={[10, 0]}>
          Tất cả
        </Badge>
      ),
    },
    {
      key: 'upcoming',
      label: (
        <Badge count={getUnreadCount('upcoming')} offset={[10, 0]}>
          Sắp diễn ra
        </Badge>
      ),
    },
    {
      key: 'in_progress',
      label: (
        <Badge count={getUnreadCount('in_progress')} offset={[10, 0]}>
          Đang diễn ra
        </Badge>
      ),
    },
    {
      key: 'completed',
      label: (
        <Badge count={getUnreadCount('completed')} offset={[10, 0]}>
          Hoàn thành
        </Badge>
      ),
    },
    {
      key: 'canceled',
      label: (
        <Badge count={getUnreadCount('canceled')} offset={[10, 0]}>
          Đã hủy
        </Badge>
      ),
    },
  ];

  // Cập nhật thống kê booking
  const updateBookingStats = (bookingsData: BookingHistoryItem[]) => {
    const total = bookingsData.length;
    
    // Đếm số lượng booking theo từng trạng thái hiển thị
    let upcoming = 0;
    let completed = 0;
    let canceled = 0;
    let inProgress = 0;
    
    bookingsData.forEach(item => {
      const status = getBookingDisplayStatus(item);
      if (status === 'upcoming') upcoming++;
      else if (status === 'completed') completed++;
      else if (status === 'canceled') canceled++;
      else if (status === 'in_progress') inProgress++;
    });
    
    setBookingStats({
      total,
      upcoming,
      completed,
      canceled,
      inProgress
    });
  };

  const handleCancelBooking = async (id: string) => {
    confirm({
      title: 'Xác nhận hủy đặt sân',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>Bạn có chắc chắn muốn hủy đặt sân này? Hành động này không thể hoàn tác.</p>
          
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <p className="font-medium mb-2">Chính sách hoàn điểm tích lũy:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hủy trước 7 ngày: Hoàn 100% thành điểm tích lũy</li>
              <li>Hủy trước 3 ngày: Hoàn 50% thành điểm tích lũy</li>
              <li>Sau 3 ngày: Không được hoàn tiền</li>
            </ul>
            <div className="mt-2 text-sm text-gray-500">
              <p>Điểm tích lũy có thể được sử dụng cho các lần đặt sân tiếp theo.</p>
              <p>1 điểm = 1.000 VNĐ</p>
            </div>
          </div>
        </div>
      ),
      okText: 'Hủy đặt sân',
      okType: 'danger',
      cancelText: 'Không',
      onOk: async () => {
        setLoading(true);
        try {
          // Sử dụng phương thức cancelBooking từ bookingService
          await bookingService.cancelBooking(id);
          
          notification.success({
            message: 'Hủy đặt sân thành công',
            description: 'Yêu cầu hủy đặt sân đã được xử lý thành công.'
          });
          
          // Refresh data
          fetchBookings(false);
        } catch (error) {
          console.error('Failed to cancel booking:', error);
          notification.error({
            message: 'Không thể hủy đặt sân',
            description: 'Đã xảy ra lỗi khi hủy đặt sân. Vui lòng thử lại sau.'
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Chuyển sang trang chi tiết booking
  const viewBookingDetail = (bookingId: string) => {
    navigate(`/user/booking/detail/${bookingId}`);
  };

  // Chuyển sang trang đánh giá
  const goToReview = (bookingId: string) => {
    navigate(`/user/booking/review/${bookingId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Hàm render trạng thái booking dựa theo thời gian
  const renderBookingStatusByTime = (record: BookingHistoryItem) => {
    const displayStatus = getBookingDisplayStatus(record);
    let color = 'default';
    let text = 'Không xác định';
    let icon = <InfoCircleOutlined />;

    switch (displayStatus) {
      case 'upcoming':
        color = 'blue';
        text = 'Sắp diễn ra';
        icon = <ClockCircleOutlined />;
        break;
      case 'in_progress':
        color = 'processing';
        text = 'Đang diễn ra';
        icon = <SyncOutlined spin />;
        break;
      case 'completed':
        color = 'green';
        text = 'Hoàn thành';
        icon = <CheckCircleOutlined />;
        break;
      case 'canceled':
        color = 'red';
        text = 'Đã hủy';
        icon = <CloseCircleOutlined />;
        break;
    }

    // Display for refunded points and refund information
    const hasRefund = record.booking.payment.refund > 0;
    const hasRefundedPoints = record.booking.payment.refundedPoint > 0;

    // If it's canceled and has refund points OR used refunded points, show both
    if (displayStatus === 'canceled' && hasRefund) {
      return (
        <>
          <Tag icon={icon} color={color}>
            {text}
          </Tag>
          <Tooltip title={`Đã hoàn ${record.booking.payment.refund} điểm tích lũy`}>
            <Tag color="green" className="ml-1">+{record.booking.payment.refund} điểm</Tag>
          </Tooltip>
        </>
      );
    }

    // If it has used refunded points, display that info too
    if (hasRefundedPoints) {
      return (
        <>
          <Tag icon={icon} color={color}>
            {text}
          </Tag>
          <Tooltip title={`Đã sử dụng ${record.booking.payment.refundedPoint} điểm tích lũy`}>
            <Tag color="orange" className="ml-1">-{record.booking.payment.refundedPoint} điểm</Tag>
          </Tooltip>
        </>
      );
    }

    return (
      <Tag icon={icon} color={color}>
        {text}
      </Tag>
    );
  };
 

  // Lọc dữ liệu theo tab đang chọn và các filter
  const applyFilters = () => {
    setFilterLoading(true);
    
    // Giả lập delay API
    setTimeout(() => {
      setFilterLoading(false);
      setFilterVisible(false);
    }, 300); // Giảm thời gian delay xuống
  };
  
  // Reset các filter
  const resetFilters = () => {
    setFilterTimeRange(null);
    setSearchText('');
    setSportFilter(null);
    
    // Giả lập delay API
    setFilterLoading(true);
    setTimeout(() => {
      setFilterLoading(false);
      setFilterVisible(false);
    }, 300); // Giảm thời gian delay xuống
  };

  // Breadcrumb items
  const breadcrumbItems = [
    {
      title: <Link to="/">Trang chủ</Link>,
    },
    {
      title: 'Lịch sử đặt sân',
    },
  ];

  // Xác định trạng thái booking dựa vào thời gian và status
  const getBookingDisplayStatus = (item: BookingHistoryItem): string => {
    // Kiểm tra cache trước
    const cacheKey = item.booking.id;
    if (displayStatusCache.has(cacheKey)) {
      return displayStatusCache.get(cacheKey)!;
    }
    
    // Nếu booking đã bị hủy, luôn hiển thị là canceled
    if (item.booking.status === 'canceled') {
      displayStatusCache.set(cacheKey, 'canceled');
      return 'canceled';
    }
    
    const today = dayjs();
    
    // Lấy tất cả các ngày đặt sân
    const bookingSlots = item.booking.bookingSlots;
    const startTime = item.booking.startTime;
    const endTime = item.booking.endTime;
    
    // Kiểm tra xem tất cả các slot đã hoàn thành chưa
    const allSlotsDone = bookingSlots.every(slot => slot.status === 'done');
    if (allSlotsDone) {
      displayStatusCache.set(cacheKey, 'completed');
      return 'completed';
    }
    
    // Kiểm tra nếu có bất kỳ slot nào đang diễn ra (thời gian hiện tại nằm trong khoảng thời gian đặt sân)
    const hasInProgressSlot = bookingSlots.some(slot => {
      const slotDate = dayjs(slot.date);
      const slotStartTime = slotDate
        .hour(parseInt(startTime.split(':')[0]))
        .minute(parseInt(startTime.split(':')[1]));
      const slotEndTime = slotDate
        .hour(parseInt(endTime.split(':')[0]))
        .minute(parseInt(endTime.split(':')[1]));
      
      return today.isAfter(slotStartTime) && today.isBefore(slotEndTime) && slot.status === 'upcoming';
    });
    
    if (hasInProgressSlot) {
      displayStatusCache.set(cacheKey, 'in_progress');
      return 'in_progress';
    }
    
    // Kiểm tra xem có slot nào sắp diễn ra không
    const hasUpcomingSlot = bookingSlots.some(slot => slot.status === 'upcoming');
    if (hasUpcomingSlot) {
      displayStatusCache.set(cacheKey, 'upcoming');
      return 'upcoming';
    }
    
    // Mặc định là đã hoàn thành nếu không rơi vào các trường hợp trên
    displayStatusCache.set(cacheKey, 'completed');
    return 'completed';
  };

  // Memoize filteredBookings để tránh tính toán lại khi component re-render
  const filteredBookings = React.useMemo(() => {
    return bookings.filter(item => {
      // Lấy trạng thái hiển thị
      const displayStatus = getBookingDisplayStatus(item);
      
      // Lọc theo tab
      if (activeTab !== 'all') {
        if (activeTab === 'upcoming' && displayStatus !== 'upcoming') return false;
        if (activeTab === 'in_progress' && displayStatus !== 'in_progress') return false;
        if (activeTab === 'completed' && displayStatus !== 'completed') return false;
        if (activeTab === 'canceled' && !['canceled', 'refunded'].includes(item.booking.status)) return false;
      }

      // Lọc theo khoảng thời gian
      if (filterTimeRange) {
        const bookingDate = dayjs(item.booking.bookingSlots[0]?.date);
        if (!bookingDate.isBetween(filterTimeRange[0], filterTimeRange[1], null, '[]')) {
          return false;
        }
      }

      // Lọc theo text
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        if (
          !item.booking.id.toLowerCase().includes(searchLower) &&
          !item.facility.name.toLowerCase().includes(searchLower) &&
          !item.booking.sport.name.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Lọc theo môn thể thao
      if (sportFilter && item.booking.sport.id !== sportFilter) {
        return false;
      }

      return true;
    });
  }, [bookings, activeTab, filterTimeRange, searchText, sportFilter]);

  // Memoize columns để tránh tính toán lại
  const columns = React.useMemo<ColumnType<BookingHistoryItem>[]>(() => [
    {
      title: 'Mã đặt sân',
      dataIndex: ['booking', 'id'],
      key: 'id',
      render: (id: string) => (
        <Button type="link" onClick={() => viewBookingDetail(id)}>
          #{id.substring(0, 8)}
        </Button>
      ),
    },
    {
      title: 'Cơ sở thể thao',
      dataIndex: ['facility', 'name'],
      key: 'facility',
      render: (name: string, record: BookingHistoryItem) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar size="small" src={record.facility.imagesUrl?.[0] || `https://ui-avatars.com/api/?name=${name}&background=random`} style={{ marginRight: 8 }} />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: 'Nhóm sân',
      key: 'field',
      render: (_: unknown, record: BookingHistoryItem) => {
        const fieldGroupName = record.facility.fieldGroups[0]?.name || '';
        const isRecurring = record.booking.bookingSlots.length > 1;
        
        return (
          <div>
            <div>{fieldGroupName}</div>
            {isRecurring && (
              <div style={{ marginTop: 4 }}>
                <Tag color="purple">Định kỳ</Tag>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: 'Thời gian',
      key: 'time',
      defaultSortOrder: 'ascend',
      sorter: (a: BookingHistoryItem, b: BookingHistoryItem) => {
        // Sắp xếp theo ngày đầu tiên của mỗi booking
        const datesA = a.booking.bookingSlots.map(slot => slot.date);
        const datesB = b.booking.bookingSlots.map(slot => slot.date);
        
        // Lấy ngày sớm nhất cho mỗi booking để so sánh
        const earliestA = new Date(Math.min(...datesA.map(d => new Date(d).getTime())));
        const earliestB = new Date(Math.min(...datesB.map(d => new Date(d).getTime())));
        
        return earliestA.getTime() - earliestB.getTime();
      },
      sortDirections: ['ascend', 'descend'] as const,
      render: (_: unknown, record: BookingHistoryItem) => {
        // Lấy danh sách các ngày đặt sân
        const bookingDates = record.booking.bookingSlots.map(slot => slot.date);
        
        return (
          <div>
            <div>
              <CalendarOutlined style={{ marginRight: 8 }} />
              <BookingDates dates={bookingDates} status={getBookingDisplayStatus(record)} bookingSlots={record.booking.bookingSlots} />
              <span style={{ marginLeft: 8 }}>{record.booking.startTime.substring(0, 5)} - {record.booking.endTime.substring(0, 5)}</span>
            </div>
            <div style={{ marginLeft: 16, marginTop: 4 }}>
              {renderBookingStatusByTime(record)}             
            </div>
          </div>
        );
      },
    },
    {
      title: 'Môn thể thao',
      key: 'sport',
      dataIndex: ['booking', 'sport', 'name'],
      render: (name: string) => (
        <Tag color="blue">
          {getSportNameInVietnamese(name)}
        </Tag>
      ),
    },
    {
      title: 'Tổng tiền',
      key: 'totalPrice',
      render: (_: unknown, record: BookingHistoryItem) => formatCurrency(calculateTotalPrice(record)),
      sorter: (a: BookingHistoryItem, b: BookingHistoryItem) => 
        calculateTotalPrice(a) - calculateTotalPrice(b),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: BookingHistoryItem) => {
        // Kiểm tra xem có thể hủy booking không (chỉ cho phép hủy những đơn sắp diễn ra)
        const displayStatus = getBookingDisplayStatus(record);
        const canCancel = displayStatus === 'upcoming' && 
                         record.booking.status !== 'canceled' &&
                         record.booking.bookingSlots.some(slot => slot.status === 'upcoming');
        
        return (
          <Space size="small" onClick={(e) => e.stopPropagation()}>
            <Tooltip title="Xem chi tiết">
              <Button
                type="primary"
                size="small"
                icon={<EyeOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  viewBookingDetail(record.booking.id);
                }}
              />
            </Tooltip>
            
            <Tooltip title={displayStatus !== 'completed' ? "Đơn đặt sân phải hoàn thành trước khi đánh giá" : "Đánh giá"}>
              <Button
                type="default"
                size="small"
                icon={<StarOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  goToReview(record.booking.id);
                }}
                disabled={displayStatus !== 'completed'}
              />
            </Tooltip>
            
            {canCancel ? (
              <Tooltip title="Hủy đặt sân">
                <Button
                  danger
                  size="small"
                  icon={<CloseCircleOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelBooking(record.booking.id);
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title={record.booking.status === 'canceled' ? "Đơn đã bị hủy" : displayStatus === 'upcoming' ? "Không thể hủy đặt sân này" : "Đã quá hạn hủy đặt sân"}>
                <Button
                  danger
                  size="small"
                  icon={<CloseCircleOutlined />}
                  disabled
                />
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ], []);

  // Tính tổng tiền từ payment
  const calculateTotalPrice = (item: BookingHistoryItem): number => {
    const fieldPrice = item.booking.payment?.fieldPrice || 0;
    const servicePrice = item.booking.payment?.servicePrice || 0;
    const discount = item.booking.payment?.discount || 0;
    // Tính toán giá trị từ điểm tích lũy đã sử dụng (chuyển đổi điểm sang tiền)
    const refundedPointValue = item.booking.payment?.refundedPoint || 0;
    
    return fieldPrice + servicePrice - discount - refundedPointValue;
  };

  // Hàm chuyển đến trang đặt sân
  const goToBooking = (facilityId: string) => {
    navigate(`/user/booking/${facilityId}`);
  };

  return (
    <div className="w-full px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-4" />
        
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="m-0 text-xl md:text-2xl lg:text-3xl font-bold">
            Lịch sử đặt sân
          </Title>
          <Space>
            <Button 
              icon={<FilterOutlined />} 
              onClick={() => setFilterVisible(!filterVisible)}
              className="flex items-center"
            >
              Bộ lọc
            </Button>
            <Button 
              type="primary"
              icon={<ReloadOutlined />} 
              onClick={() => fetchBookings(false)}
              loading={loading}
              className="flex items-center"
            >
              Làm mới
            </Button>
          </Space>
        </div>

        {/* Thêm thống kê booking */}
        <BookingSummaryCard data={bookingStats} />

        {/* Section đặt lại sân */}
        {bookableFacilities.length > 0 && (
          <Card className="mb-6 shadow-sm rounded-lg" title={<span className="font-semibold">Đặt lại sân</span>}>
            <div className="flex items-center">
              <BookOutlined className="text-blue-500 mr-3 text-lg" />
              <span className="mr-4">Đặt sân tại cơ sở bạn đã từng sử dụng:</span>
              <Dropdown
                menu={{
                  items: bookableFacilities.map(facility => ({
                    key: facility.id,
                    label: (
                      <div className="flex items-center">
                        <EnvironmentOutlined className="mr-2" />
                        {facility.name}
                      </div>
                    ),
                    onClick: () => goToBooking(facility.id)
                  }))
                }}
                placement="bottomLeft"
              >
                <Button type="primary">
                  Chọn cơ sở <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </Card>
        )}

        
        {/* Bộ lọc nâng cao */}
        {filterVisible && (
          <Card className="mb-6 shadow-sm rounded-lg" title={<span className="font-semibold">Bộ lọc nâng cao</span>}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <div className="mb-2 font-medium">Khoảng thời gian</div>
                <RangePicker 
                  style={{ width: '100%' }} 
                  value={filterTimeRange}
                  onChange={(dates) => setFilterTimeRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
                  placeholder={['Từ ngày', 'Đến ngày']}
                  className="w-full"
                />
              </Col>
              <Col xs={24} md={8}>
                <div className="mb-2 font-medium">Tìm kiếm</div>
                <Input
                  placeholder="Tìm theo mã, tên sân, môn thể thao..."
                  prefix={<SearchOutlined className="text-gray-400" />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full"
                />
              </Col>
              <Col xs={24} md={8}>
                <div className="mb-2 font-medium">Môn thể thao</div>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Chọn môn thể thao"
                  value={sportFilter}
                  onChange={(value) => setSportFilter(value)}
                  allowClear
                  className="w-full"
                >
                  {sports.map(sport => (
                    <Option key={sport.id} value={sport.id}>
                      {getSportNameInVietnamese(sport.name)}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} className="text-right">
                <Space>
                  <Button onClick={resetFilters}>
                    Đặt lại
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={applyFilters}
                    loading={filterLoading}
                  >
                    Áp dụng
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        )}

        {/* Table booking */}
        <Card className="shadow-sm rounded-lg">
          <Tabs 
            activeKey={activeTab} 
            onChange={handleTabChange} 
            items={tabs}
            className="mb-3 font-medium"
            tabBarStyle={{ marginBottom: 16, fontWeight: 500 }}
          />
          
          <Table
            columns={columns}
            dataSource={filteredBookings}
            rowKey={(record) => record.booking.id}
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} lượt đặt sân`,
              className: "pagination-custom"
            }}
            rowClassName="hover:bg-gray-50 cursor-pointer transition-colors"
            onRow={(record) => ({
              onClick: (e) => {
                // Ngăn chặn sự kiện click khi người dùng click vào cột thao tác (chứa các button)
                const target = e.target as HTMLElement;
                // Kiểm tra xem phần tử được click hoặc cha của nó có phải là button hay không
                if (target.closest('button') || target.closest('.ant-space')) {
                  return;
                }
                viewBookingDetail(record.booking.id);
              }
            })}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="text-gray-500">
                      Không có dữ liệu đặt sân nào{' '}
                      {activeTab !== 'all' ? 'trong trạng thái này' : ''}
                    </span>
                  }
                />
              ),
            }}
            className="custom-table"
          />
        </Card>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Lưu ý: Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua hotline: 0976302-xxx</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryBookingPage;

