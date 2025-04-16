import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Tag, Button, Modal, Typography, Space, Tabs, Select, 
  DatePicker, Input, Badge, Row, Col, Statistic, Avatar, Empty, notification, Tooltip, Alert, Breadcrumb
} from 'antd';
import type { TabsProps } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import { 
  EyeOutlined, CloseCircleOutlined, StarOutlined, SearchOutlined, 
  InfoCircleOutlined, CalendarOutlined, FilterOutlined, ReloadOutlined,
  CheckCircleOutlined, HistoryOutlined, ClockCircleOutlined, SyncOutlined, 
  ExclamationCircleOutlined, ArrowRightOutlined, HeartOutlined
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { mockBookingHistory } from '@/mocks/booking/bookingData';
import { BookingStatus, Booking } from '@/types/booking.type';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal;

interface FacilityInfo {
  id: number;
  name: string;
  address: string;
}

interface SportInfo {
  id: number;
  name: string;
}

interface FieldGroupInfo {
  id: number;
  name: string;
  basePrice: number;
}

interface FieldInfo {
  id: number;
  name: string;
  fieldGroup: FieldGroupInfo;
}

interface BookingHistoryItem extends Booking {
  facility: FacilityInfo;
  sport: SportInfo;
  field: FieldInfo;
  hasReview?: boolean;
  totalPrice: number;
}

// Định nghĩa kiểu dữ liệu cho BookingSummaryCard
interface BookingSummaryData {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
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
            value={data.cancelled}
            prefix={<CloseCircleOutlined className="text-red-500" />}
            valueStyle={{ color: '#ff4d4f', fontWeight: 600 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

const HistoryBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [filterTimeRange, setFilterTimeRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [sportFilter, setSportFilter] = useState<number | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  
  // Thêm state cho việc hiển thị booking sắp tới
  const [upcomingBookings, setUpcomingBookings] = useState<BookingHistoryItem[]>([]);
  
  // State cho booking statistics
  const [bookingStats, setBookingStats] = useState<BookingSummaryData>({
    total: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0
  });

  // Fetch data khi component được mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Giả lập API call
  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Trong thực tế, đây sẽ là API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Cập nhật thống kê
      updateBookingStats(mockBookingHistory as BookingHistoryItem[]);
      
      // Lấy các booking sắp diễn ra
      const upcoming = (mockBookingHistory as BookingHistoryItem[]).filter(booking => {
        const bookingDate = dayjs(booking.bookingSlots[0]?.date);
        const status = booking.status.toString();
        return bookingDate.isAfter(dayjs(), 'day') && 
          (status === 'payment_confirmed' || status === 'pending_payment');
      });
      setUpcomingBookings(upcoming);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      notification.error({
        message: 'Không thể tải dữ liệu',
        description: 'Đã xảy ra lỗi khi tải lịch sử đặt sân. Vui lòng thử lại sau.'
      });
      setLoading(false);
    }
  };

  // Cập nhật thống kê booking
  const updateBookingStats = (bookings: BookingHistoryItem[]) => {
    const total = bookings.length;
    
    const upcoming = bookings.filter(booking => {
      const status = booking.status.toString();
      return status === 'payment_confirmed' || status === 'pending_payment' || status === 'in_progress';
    }).length;
    
    const completed = bookings.filter(booking => 
      booking.status === BookingStatus.COMPLETED
    ).length;
    
    const cancelled = bookings.filter(booking => {
      const status = booking.status.toString();
      return status === 'cancelled' || status === 'refunded';
    }).length;
    
    setBookingStats({
      total,
      upcoming,
      completed,
      cancelled
    });
  };

  const handleCancelBooking = (id: string) => {
    confirm({
      title: 'Xác nhận hủy đặt sân',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn hủy đặt sân này? Hành động này không thể hoàn tác.',
      okText: 'Hủy đặt sân',
      okType: 'danger',
      cancelText: 'Không',
      onOk: async () => {
        setLoading(true);
        try {
          // TODO: Implement API call to cancel booking
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          notification.success({
            message: 'Hủy đặt sân thành công',
            description: 'Yêu cầu hủy đặt sân đã được xử lý thành công.'
          });
          
          // Refresh data
          fetchBookings();
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

  // Thêm sân vào yêu thích
  const addToFavorites = (facilityId: number) => {
    notification.success({
      message: 'Đã thêm vào yêu thích',
      description: 'Sân thể thao đã được thêm vào danh sách yêu thích của bạn'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Hàm render trạng thái booking
  const renderBookingStatus = (status: BookingStatus) => {
    let color = 'default';
    let text = 'Không xác định';
    let icon = <InfoCircleOutlined />;

    switch (status) {
      case BookingStatus.PENDING_PAYMENT:
      case BookingStatus.PAYMENT_CONFIRMED:
        color = 'blue';
        text = 'Sắp diễn ra';
        icon = <ClockCircleOutlined />;
        break;
      case BookingStatus.IN_PROGRESS:
        color = 'processing';
        text = 'Đang diễn ra';
        icon = <SyncOutlined spin />;
        break;
      case BookingStatus.COMPLETED:
        color = 'green';
        text = 'Hoàn thành';
        icon = <CheckCircleOutlined />;
        break;
      case BookingStatus.CANCELLED:
      case BookingStatus.REFUNDED:
        color = 'red';
        text = 'Đã hủy';
        icon = <CloseCircleOutlined />;
        break;
      case BookingStatus.DRAFT:
        color = 'default';
        text = 'Đang xử lý';
        icon = <SyncOutlined spin />;
        break;
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
    }, 500);
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
    }, 500);
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

  // Lọc dữ liệu theo tab đang chọn
  const filteredBookings = (mockBookingHistory as BookingHistoryItem[]).filter(booking => {
    // Lọc theo tab
    if (activeTab !== 'all') {
      if (activeTab === 'upcoming' && !(booking.status === BookingStatus.PAYMENT_CONFIRMED || booking.status === BookingStatus.PENDING_PAYMENT)) return false;
      if (activeTab === 'in_progress' && booking.status !== BookingStatus.IN_PROGRESS) return false;
      if (activeTab === 'completed' && booking.status !== BookingStatus.COMPLETED) return false;
      if (activeTab === 'cancelled' && booking.status !== BookingStatus.CANCELLED) return false;
    }

    // Lọc theo khoảng thời gian
    if (filterTimeRange) {
      const bookingDate = dayjs(booking.bookingSlots[0]?.date);
      if (!bookingDate.isBetween(filterTimeRange[0], filterTimeRange[1], null, '[]')) {
        return false;
      }
    }

    // Lọc theo text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      if (
        !booking.id.toLowerCase().includes(searchLower) &&
        !booking.facility.name.toLowerCase().includes(searchLower) &&
        !booking.sport.name.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    // Lọc theo môn thể thao
    if (sportFilter && booking.sport.id !== sportFilter) {
      return false;
    }

    return true;
  });

  const columns: ColumnType<BookingHistoryItem>[] = [
    {
      title: 'Mã đặt sân',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <Button type="link" onClick={() => viewBookingDetail(id)}>
          #{id.substring(0, 8)}
        </Button>
      ),
    },
    {
      title: 'Cơ sở thể thao',
      dataIndex: 'facility',
      key: 'facility',
      render: (facility: FacilityInfo) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar size="small" src={`https://ui-avatars.com/api/?name=${facility.name}&background=random`} style={{ marginRight: 8 }} />
          <span>{facility.name}</span>
        </div>
      ),
    },
    {
      title: 'Nhóm sân',
      dataIndex: 'field',
      key: 'field',
      render: (field: FieldInfo) => `${field.fieldGroup.name} (${field.name})`,
    },
    {
      title: 'Thời gian',
      key: 'time',
      render: (_: unknown, record: BookingHistoryItem) => (
        <div>
          <div>
            <CalendarOutlined style={{ marginRight: 8 }} />
            <span>{dayjs(record.bookingSlots[0]?.date).format('DD/MM/YYYY')}</span>
            <span style={{ marginLeft: 8 }}>{record.startTime.substring(0, 5)} - {record.endTime.substring(0, 5)}</span>
          </div>
          <div style={{ marginLeft: 16, marginTop: 4 }}>
            {renderBookingStatus(record.status)}
          </div>
        </div>
      ),
    },
    {
      title: 'Môn thể thao',
      key: 'sport',
      dataIndex: 'sport',
      render: (sport: SportInfo) => (
        <Tag color="blue">
          {sport.name}
        </Tag>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => formatCurrency(price),
      sorter: (a: BookingHistoryItem, b: BookingHistoryItem) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: BookingHistoryItem) => {
        // Kiểm tra xem có thể hủy booking không
        const canCancel = record.status === BookingStatus.PENDING_PAYMENT || 
                          record.status === BookingStatus.PAYMENT_CONFIRMED;
        
        // Kiểm tra xem có thể đánh giá không
        const canReview = record.status === BookingStatus.COMPLETED && !record.hasReview;
        
        return (
          <Space size="small">
            <Tooltip title="Xem chi tiết">
              <Button
                type="primary"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => viewBookingDetail(record.id)}
              />
            </Tooltip>
            
            {canReview && (
              <Tooltip title="Đánh giá">
                <Button
                  type="default"
                  size="small"
                  icon={<StarOutlined />}
                  onClick={() => goToReview(record.id)}
                />
              </Tooltip>
            )}
            
            <Tooltip title="Thêm vào yêu thích">
              <Button
                type="default"
                size="small"
                icon={<HeartOutlined />}
                onClick={() => addToFavorites(record.facility.id)}
              />
            </Tooltip>
            
            {canCancel && (
              <Tooltip title="Hủy đặt sân">
                <Button
                  danger
                  size="small"
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleCancelBooking(record.id)}
                />
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];

  const getBookingCount = (status: string) => {
    return (mockBookingHistory as BookingHistoryItem[]).filter(booking => {
      if (status === 'all') return true;
      if (status === 'upcoming') return booking.status === BookingStatus.PAYMENT_CONFIRMED || booking.status === BookingStatus.PENDING_PAYMENT;
      if (status === 'in_progress') return booking.status === BookingStatus.IN_PROGRESS;
      if (status === 'completed') return booking.status === BookingStatus.COMPLETED;
      if (status === 'cancelled') return booking.status === BookingStatus.CANCELLED || booking.status === BookingStatus.REFUNDED;
      return false;
    }).length;
  };

  // Cấu hình tabs
  const tabs: TabsProps['items'] = [
    {
      key: 'all',
      label: (
        <Badge count={getBookingCount('all')} offset={[10, 0]}>
          Tất cả
        </Badge>
      ),
    },
    {
      key: 'upcoming',
      label: (
        <Badge count={getBookingCount('upcoming')} offset={[10, 0]}>
          Sắp diễn ra
        </Badge>
      ),
    },
    {
      key: 'in_progress',
      label: (
        <Badge count={getBookingCount('in_progress')} offset={[10, 0]}>
          Đang diễn ra
        </Badge>
      ),
    },
    {
      key: 'completed',
      label: (
        <Badge count={getBookingCount('completed')} offset={[10, 0]}>
          Hoàn thành
        </Badge>
      ),
    },
    {
      key: 'cancelled',
      label: (
        <Badge count={getBookingCount('cancelled')} offset={[10, 0]}>
          Đã hủy
        </Badge>
      ),
    },
  ];

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
              onClick={fetchBookings}
              loading={loading}
              className="flex items-center"
            >
              Làm mới
            </Button>
          </Space>
        </div>

        {/* Thêm thống kê booking */}
        <BookingSummaryCard data={bookingStats} />

        {/* Hiển thị booking sắp tới */}
        {upcomingBookings.length > 0 && (
          <Card className="mb-6 shadow-sm rounded-lg" title={<span className="font-semibold">Đặt sân sắp tới</span>}>
            <div className="space-y-4">
              {upcomingBookings.slice(0, 3).map(booking => (
                <Alert
                  key={booking.id}
                  type="info"
                  message={
                    <div className="flex justify-between items-center">
                      <Space wrap>
                        <CalendarOutlined className="text-blue-500" />
                        <span className="font-medium">
                          {dayjs(booking.bookingSlots[0]?.date).format('DD/MM/YYYY')} ({booking.startTime.substring(0, 5)} - {booking.endTime.substring(0, 5)})
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{booking.facility.name}</span>
                        <span className="text-gray-400">•</span>
                        <span>{booking.field.fieldGroup.name}</span>
                      </Space>
                      <Button 
                        type="primary" 
                        size="small"
                        onClick={() => viewBookingDetail(booking.id)}
                        className="flex items-center"
                      >
                        Chi tiết <ArrowRightOutlined />
                      </Button>
                    </div>
                  }
                  className="drop-shadow-sm"
                />
              ))}
              {upcomingBookings.length > 3 && (
                <div className="text-right">
                  <Button type="link" onClick={() => setActiveTab('upcoming')}>
                    Xem tất cả ({upcomingBookings.length})
                  </Button>
                </div>
              )}
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
                  <Option value={1}>Bóng đá</Option>
                  <Option value={2}>Cầu lông</Option>
                  <Option value={3}>Tennis</Option>
                  <Option value={4}>Bóng rổ</Option>
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

        <Card className="shadow-sm rounded-lg">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab} 
            items={tabs}
            className="mb-3 font-medium"
            tabBarStyle={{ marginBottom: 16, fontWeight: 500 }}
          />
          
          <Table
            columns={columns}
            dataSource={filteredBookings}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} lượt đặt sân`,
              className: "pagination-custom"
            }}
            rowClassName="hover:bg-gray-50 cursor-pointer transition-colors"
            onRow={(record) => ({
              onClick: () => viewBookingDetail(record.id)
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
          <p>Lưu ý: Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua hotline: 1900-xxxx</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryBookingPage;

