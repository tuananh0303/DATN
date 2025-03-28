import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { 
  Breadcrumb, Table, Card, Tag, Button, Tabs, DatePicker, Select, 
  Input, Space, Row, Col, Modal, Rate, Form, Typography, Empty, Spin, Alert
} from 'antd';
import { 
  SearchOutlined, 
  FileTextOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  EnvironmentOutlined,
  StarOutlined,
  FilterOutlined,
  SortAscendingOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { TablePaginationConfig } from 'antd/es/table';
import type { ColumnsType } from 'antd/es/table';
import relativeTime from 'dayjs/plugin/relativeTime';

// Import this once we have the slice ready
// import { fetchUserBookings, submitReview } from '@/store/slices/userBookingSlice';

dayjs.extend(relativeTime);

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

// Types
interface BookingData {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  fieldPrice: number;
  servicePrice?: number;
  discountAmount?: number;
  status: 'paid' | 'unpaid' | 'cancelled' | 'completed';
  paymentType: 'online' | 'cash';
  field?: {
    id: number;
    name: string;
    fieldGroup: {
      id: string;
      name: string;
      facility: {
        id: string;
        name: string;
      }
    }
  };
  sport?: {
    id: number;
    name: string;
  };
  reviewed?: boolean;
}

// Temporary mock data
const mockBookings: BookingData[] = [
  {
    id: "B001",
    date: "2023-07-15",
    startTime: "09:00:00",
    endTime: "11:00:00",
    fieldPrice: 200000,
    servicePrice: 50000,
    status: "completed",
    paymentType: "online",
    field: {
      id: 1,
      name: "Sân A1",
      fieldGroup: {
        id: "FG001",
        name: "Sân 5 người",
        facility: {
          id: "F001",
          name: "Sân Bóng Đá Thống Nhất"
        }
      }
    },
    sport: {
      id: 1,
      name: "football"
    },
    reviewed: true
  },
  {
    id: "B002",
    date: "2023-07-25",
    startTime: "14:00:00",
    endTime: "16:00:00",
    fieldPrice: 250000,
    servicePrice: 0,
    status: "completed",
    paymentType: "cash",
    field: {
      id: 2,
      name: "Sân C3",
      fieldGroup: {
        id: "FG002",
        name: "Sân tiêu chuẩn",
        facility: {
          id: "F002",
          name: "Trung Tâm Tennis City"
        }
      }
    },
    sport: {
      id: 2,
      name: "tennis"
    },
    reviewed: false
  },
  {
    id: "B003",
    date: dayjs().add(3, 'day').format('YYYY-MM-DD'),
    startTime: "18:00:00",
    endTime: "20:00:00",
    fieldPrice: 180000,
    status: "paid",
    paymentType: "online",
    field: {
      id: 3,
      name: "Sân B2",
      fieldGroup: {
        id: "FG003",
        name: "Sân đôi",
        facility: {
          id: "F003",
          name: "CLB Cầu Lông Thủ Đức"
        }
      }
    },
    sport: {
      id: 3,
      name: "badminton"
    }
  },
  {
    id: "B004",
    date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    startTime: "19:00:00",
    endTime: "21:00:00",
    fieldPrice: 300000,
    servicePrice: 100000,
    discountAmount: 50000,
    status: "paid",
    paymentType: "online",
    field: {
      id: 4,
      name: "Sân A2",
      fieldGroup: {
        id: "FG001",
        name: "Sân 5 người",
        facility: {
          id: "F001",
          name: "Sân Bóng Đá Thống Nhất"
        }
      }
    },
    sport: {
      id: 1,
      name: "football"
    }
  },
  {
    id: "B005",
    date: "2023-06-30",
    startTime: "07:00:00",
    endTime: "09:00:00",
    fieldPrice: 220000,
    status: "cancelled",
    paymentType: "cash",
    field: {
      id: 5,
      name: "Sân D1",
      fieldGroup: {
        id: "FG004",
        name: "Sân ngoài trời",
        facility: {
          id: "F004",
          name: "Sân Bóng Rổ Phú Nhuận"
        }
      }
    },
    sport: {
      id: 4,
      name: "basketball"
    }
  }
];

const HistoryBooking: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // States
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const [sportFilter, setSportFilter] = useState<number | null>(null);
  const [sortField, setSortField] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<string>("descend");
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [reviewForm] = Form.useForm();
  
  // For connection to Redux once API is ready
  // const { bookings, loading, error, totalItems } = useAppSelector(state => state.userBooking);
  
  // Mock loading state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + 'đ';
  };
  
  // Format date
  const formatDate = (date: string) => {
    return dayjs(date).format('DD/MM/YYYY');
  };
  
  // Format time
  const formatTime = (start: string, end: string) => {
    return `${start.substring(0, 5)} - ${end.substring(0, 5)}`;
  };
  
  // Get sport name from type
  const getSportName = (type: string) => {
    const sportMap: Record<string, string> = {
      'football': 'Bóng đá',
      'basketball': 'Bóng rổ',
      'badminton': 'Cầu lông',
      'tennis': 'Tennis',
      'volleyball': 'Bóng chuyền',
      'ping pong': 'Bóng bàn',
      'golf': 'Golf',
      'pickleball': 'Pickleball',
    };
    
    return sportMap[type] || type;
  };
  
  // Calculate total price
  const calculateTotalPrice = (booking: BookingData): number => {
    let total = booking.fieldPrice || 0;
    
    // Add service price if available
    if (booking.servicePrice) {
      total += booking.servicePrice;
    }
    
    // Subtract discount if applicable
    if (booking.discountAmount) {
      total -= booking.discountAmount;
    }
    
    return total;
  };
  
  // Get status tag color
  const getStatusTagColor = (status: string): string => {
    switch (status) {
      case 'paid':
        return 'green';
      case 'unpaid':
        return 'orange';
      case 'cancelled':
        return 'red';
      case 'completed':
        return 'blue';
      default:
        return 'default';
    }
  };
  
  // Get status display text
  const getStatusDisplayText = (status: string): string => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán';
      case 'unpaid':
        return 'Chưa thanh toán';
      case 'cancelled':
        return 'Đã hủy';
      case 'completed':
        return 'Đã hoàn thành';
      default:
        return status;
    }
  };
  
  // Check if booking is upcoming
  const isUpcomingBooking = (booking: BookingData): boolean => {
    const bookingDate = dayjs(`${booking.date} ${booking.startTime}`);
    return bookingDate.isAfter(dayjs());
  };
  
  // Load bookings
  useEffect(() => {
    // Mock loading data from API
    setLoading(true);
    setTimeout(() => {
      // Simulate API response
      // dispatch(fetchUserBookings({
      //   page: pagination.current,
      //   pageSize: pagination.pageSize,
      //   status: activeTab,
      //   search: searchText,
      //   startDate: dateRange[0]?.format('YYYY-MM-DD'),
      //   endDate: dateRange[1]?.format('YYYY-MM-DD'),
      //   sportId: sportFilter,
      //   sortField,
      //   sortOrder
      // }));
      
      // Mock update pagination
      setPagination({
        ...pagination,
        total: mockBookings.length
      });
      
      setLoading(false);
    }, 1000);
  }, [
    pagination.current,
    pagination.pageSize,
    activeTab,
    searchText,
    dateRange,
    sportFilter,
    sortField,
    sortOrder
  ]);
  
  // Filter bookings based on tab
  const filterBookingsByTab = (bookings: BookingData[], tab: string): BookingData[] => {
    switch (tab) {
      case 'upcoming':
        return bookings.filter(booking => 
          (booking.status === 'paid' || booking.status === 'unpaid') && 
          isUpcomingBooking(booking)
        );
      case 'completed':
        return bookings.filter(booking => booking.status === 'completed');
      case 'cancelled':
        return bookings.filter(booking => booking.status === 'cancelled');
      default:
        return bookings;
    }
  };
  
  // Filter bookings based on search and filters
  const getFilteredBookings = (): BookingData[] => {
    let filtered = [...mockBookings];
    
    // Filter by tab
    filtered = filterBookingsByTab(filtered, activeTab);
    
    // Filter by search text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.id.toLowerCase().includes(searchLower) ||
        booking.field?.name.toLowerCase().includes(searchLower) ||
        booking.field?.fieldGroup.name.toLowerCase().includes(searchLower) ||
        booking.field?.fieldGroup.facility.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by date range
    if (dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(booking => {
        const bookingDate = dayjs(booking.date);
        return bookingDate.isAfter(dateRange[0]) && bookingDate.isBefore(dateRange[1]) ||
               bookingDate.isSame(dateRange[0]) || bookingDate.isSame(dateRange[1]);
      });
    }
    
    // Filter by sport
    if (sportFilter) {
      filtered = filtered.filter(booking => booking.sport?.id === sportFilter);
    }
    
    // Sort
    filtered.sort((a, b) => {
      if (sortField === 'date') {
        const dateA = dayjs(a.date);
        const dateB = dayjs(b.date);
        return sortOrder === 'ascend' ? dateA.diff(dateB) : dateB.diff(dateA);
      }
      
      if (sortField === 'price') {
        const priceA = calculateTotalPrice(a);
        const priceB = calculateTotalPrice(b);
        return sortOrder === 'ascend' ? priceA - priceB : priceB - priceA;
      }
      
      return 0;
    });
    
    return filtered;
  };
  
  // Show review modal
  const showReviewModal = (booking: BookingData) => {
    setSelectedBooking(booking);
    setReviewModalVisible(true);
  };
  
  // Submit review
  const handleReviewSubmit = async (values: any) => {
    try {
      if (!selectedBooking) return;
      
      // Call API to submit review
      // await dispatch(submitReview({
      //   bookingId: selectedBooking.id,
      //   ...values
      // }));
      
      // Close modal and reset form
      setReviewModalVisible(false);
      reviewForm.resetFields();
      
      // Show success message
      Modal.success({
        title: 'Đánh giá thành công',
        content: 'Cảm ơn bạn đã đánh giá dịch vụ!',
      });
      
      // Refresh bookings
      // dispatch(fetchUserBookings({...}));
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };
  
  // Table columns
  const columns: ColumnsType<BookingData> = [
    {
      title: 'Mã đặt sân',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id) => (
        <Text strong>{id}</Text>
      ),
    },
    {
      title: 'Thông tin sân',
      dataIndex: 'field',
      key: 'field',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.field?.fieldGroup.facility.name}</div>
          <div className="text-gray-500">{record.field?.fieldGroup.name} - {record.field?.name}</div>
          <div className="text-gray-500">{record.sport ? getSportName(record.sport.name) : '-'}</div>
        </div>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => (
        <div>
          <div><CalendarOutlined className="mr-1" /> {formatDate(record.date)}</div>
          <div><ClockCircleOutlined className="mr-1" /> {formatTime(record.startTime, record.endTime)}</div>
        </div>
      ),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'fieldPrice',
      key: 'price',
      render: (_, record) => (
        <div>
          <Text strong className="text-blue-600">{formatCurrency(calculateTotalPrice(record))}</Text>
          {record.discountAmount && record.discountAmount > 0 && (
            <div className="text-green-500 text-xs">
              Giảm: {formatCurrency(record.discountAmount)}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => (
        <Tag color={getStatusTagColor(status)}>
          {getStatusDisplayText(status)}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            size="small"
            onClick={() => navigate(`/player/booking-detail/${record.id}`)}
          >
            Chi tiết
          </Button>
          
          {record.status === 'completed' && !record.reviewed && (
            <Button
              type="default"
              size="small"
              icon={<StarOutlined />}
              onClick={() => showReviewModal(record)}
            >
              Đánh giá
            </Button>
          )}
        </Space>
      ),
    },
  ];
  
  // Handle table change
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { title: <Link to="/">Trang chủ</Link> },
          { title: <Link to="/player/dashboard">Tài khoản</Link> },
          { title: 'Lịch sử đặt sân' }
        ]} 
        className="mb-6" 
      />
      
      {/* Title */}
      <div className="mb-6">
        <Title level={2} className="m-0">Lịch sử đặt sân</Title>
        <Text type="secondary">Xem và quản lý các lần đặt sân của bạn</Text>
      </div>
      
      {/* Error message */}
      {error && (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
          className="mb-4"
          closable
        />
      )}
      
      {/* Filters */}
      <Card className="mb-6 shadow-sm">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8} lg={6}>
            <Input
              placeholder="Tìm kiếm theo mã, tên sân..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          
          <Col xs={24} md={8} lg={7}>
            <RangePicker
              placeholder={['Từ ngày', 'Đến ngày']}
              format="DD/MM/YYYY"
              value={dateRange}
              onChange={(dates) => setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null])}
              allowClear
              className="w-full"
            />
          </Col>
          
          <Col xs={12} md={4} lg={4}>
            <Select
              placeholder="Môn thể thao"
              allowClear
              className="w-full"
              value={sportFilter}
              onChange={(value) => setSportFilter(value)}
            >
              <Option value={1}>Bóng đá</Option>
              <Option value={2}>Tennis</Option>
              <Option value={3}>Cầu lông</Option>
              <Option value={4}>Bóng rổ</Option>
              <Option value={5}>Bóng bàn</Option>
            </Select>
          </Col>
          
          <Col xs={12} md={4} lg={4}>
            <Select
              placeholder="Sắp xếp theo"
              className="w-full"
              value={`${sortField}_${sortOrder}`}
              onChange={(value) => {
                const [field, order] = value.split('_');
                setSortField(field);
                setSortOrder(order);
              }}
            >
              <Option value="date_descend">Ngày (mới nhất)</Option>
              <Option value="date_ascend">Ngày (cũ nhất)</Option>
              <Option value="price_descend">Giá (cao → thấp)</Option>
              <Option value="price_ascend">Giá (thấp → cao)</Option>
            </Select>
          </Col>
          
          <Col xs={24} md={24} lg={3} className="text-right">
            <Button 
              onClick={() => {
                setSearchText("");
                setDateRange([null, null]);
                setSportFilter(null);
                setSortField("date");
                setSortOrder("descend");
              }}
            >
              Đặt lại
            </Button>
          </Col>
        </Row>
      </Card>
      
      {/* Tabs and Table */}
      <Card className="shadow-md">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="mb-4"
        >
          <TabPane tab="Tất cả" key="all" />
          <TabPane tab="Sắp diễn ra" key="upcoming" />
          <TabPane tab="Đã hoàn thành" key="completed" />
          <TabPane tab="Đã hủy" key="cancelled" />
        </Tabs>
        
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={getFilteredBookings()}
            rowKey="id"
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            className="min-w-full"
            locale={{
              emptyText: (
                <Empty 
                  description="Không có dữ liệu" 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                />
              )
            }}
          />
        </div>
      </Card>
      
      {/* Review Modal */}
      <Modal
        title="Đánh giá dịch vụ"
        open={reviewModalVisible}
        onCancel={() => {
          setReviewModalVisible(false);
          reviewForm.resetFields();
        }}
        footer={null}
      >
        {selectedBooking && (
          <Form
            form={reviewForm}
            layout="vertical"
            onFinish={handleReviewSubmit}
            initialValues={{ rating: 5 }}
          >
            <div className="mb-4">
              <div className="font-medium">{selectedBooking.field?.fieldGroup.facility.name}</div>
              <div className="text-gray-500">
                {formatDate(selectedBooking.date)} | {formatTime(selectedBooking.startTime, selectedBooking.endTime)}
              </div>
              <div className="text-gray-500">
                {selectedBooking.field?.fieldGroup.name} - {selectedBooking.field?.name}
              </div>
            </div>
            
            <Form.Item
              name="rating"
              label="Đánh giá"
              rules={[{ required: true, message: 'Vui lòng chọn đánh giá' }]}
            >
              <Rate allowHalf />
            </Form.Item>
            
            <Form.Item
              name="comment"
              label="Nhận xét"
              rules={[{ required: true, message: 'Vui lòng nhập nhận xét' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="Hãy chia sẻ trải nghiệm của bạn về dịch vụ..." 
              />
            </Form.Item>
            
            <Form.Item
              name="positives"
              label="Điểm tích cực"
            >
              <Select
                mode="multiple"
                placeholder="Chọn điểm tích cực"
                className="w-full"
              >
                <Option value="clean">Sân sạch sẽ</Option>
                <Option value="staff">Nhân viên thân thiện</Option>
                <Option value="facilities">Cơ sở vật chất tốt</Option>
                <Option value="service">Dịch vụ nhanh chóng</Option>
                <Option value="price">Giá cả hợp lý</Option>
                <Option value="atmosphere">Không khí thoải mái</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="negatives"
              label="Điểm cần cải thiện"
            >
              <Select
                mode="multiple"
                placeholder="Chọn điểm cần cải thiện"
                className="w-full"
              >
                <Option value="cleanliness">Vệ sinh</Option>
                <Option value="staff">Thái độ nhân viên</Option>
                <Option value="facilities">Cơ sở vật chất</Option>
                <Option value="service">Tốc độ phục vụ</Option>
                <Option value="price">Giá cả</Option>
                <Option value="parking">Bãi đỗ xe</Option>
              </Select>
            </Form.Item>
            
            <div className="flex justify-end gap-2">
              <Button 
                onClick={() => {
                  setReviewModalVisible(false);
                  reviewForm.resetFields();
                }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Gửi đánh giá
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default HistoryBooking;