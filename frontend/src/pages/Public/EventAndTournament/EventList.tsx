import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, Typography, Row, Col, Tag, Button, Space, Select,
  Input, Empty, Pagination, Tabs, Badge, Avatar, Spin, Breadcrumb, Modal, Form, Upload, message
} from 'antd';
import { 
  SearchOutlined, CalendarOutlined, EnvironmentOutlined, TeamOutlined,
  TrophyOutlined, ArrowRightOutlined, ClockCircleOutlined, PercentageOutlined,
  GiftOutlined, UploadOutlined
} from '@ant-design/icons';
import { EventType, EventStatus, DisplayEvent } from '@/types/event.type';
import { mockEvents } from '@/mocks/event/eventData';
import { Sport } from '@/types/sport.type';
import { sportService } from '@/services/sport.service';
import { getSportNameInVietnamese } from '@/utils/translateSport';
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Mock facility data - replace with actual data source
const mockFacilities: Record<string, { name: string; address: string }> = {
  '1': { name: 'Sân bóng đá Phạm Kha', address: '123 Đường Phạm Văn Đồng, Quận Gò Vấp, TPHCM' },
  '2': { name: 'Sân Tennis Bình Chánh', address: '456 Đường Nguyễn Văn Linh, Huyện Bình Chánh, TPHCM' },
  '3': { name: 'Sân bóng rổ Quận 7', address: '789 Đường Nguyễn Thị Thập, Quận 7, TPHCM' },
  '4': { name: 'Sân cầu lông Phạm Kha', address: '123 Đường Phạm Văn Đồng, Quận Gò Vấp, TPHCM' }
};


const EventList: React.FC = () => {
  const navigate = useNavigate();
  // Registration modal state
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [currentEventForRegister, setCurrentEventForRegister] = useState<DisplayEvent | null>(null);
  const [registrationForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<DisplayEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<DisplayEvent[]>([]);
  const [activeTab, setActiveTab] = useState<EventStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState<number | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<EventType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [sportsList, setSportsList] = useState<Sport[]>([]);

  // Fetch sports data
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sports = await sportService.getSport();
        setSportsList(sports);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    };

    fetchSports();
  }, []);

  // Simulating API call to fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 150));
        
        // Enrich events with facility and sport details
        const enhancedEvents: DisplayEvent[] = mockEvents.map(event => {
          const facility = mockFacilities[event.facilityId || '1'];
          
          // Find sport name from sports list if sportIds exists
          let sportName = '';
          if (event.sportIds && event.sportIds.length > 0 && sportsList.length > 0) {
            const sport = sportsList.find(s => s.id === event.sportIds?.[0]);
            if (sport) {
              sportName = getSportNameInVietnamese(sport.name);
            }
          }
          
          return {
            ...event,
            facilityName: facility?.name || 'Không xác định',
            facilityAddress: facility?.address || 'Không xác định',
            sportName: sportName,
            // Các trường khác đã có sẵn trong event
          };
        });
        
        setEvents(enhancedEvents);
        setFilteredEvents(enhancedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sportsList.length > 0) {
      fetchEvents();
    }
  }, [sportsList]);

  // Filter by sport type
  useEffect(() => {
    if (sportFilter !== 'all' && events.length > 0) {
      // Lọc lại từ tất cả sự kiện theo sportIds
      const result = events.filter(event => 
        event.sportIds?.includes(sportFilter as number)
      );
      
      setFilteredEvents(result);
      setCurrentPage(1);
    } else if (sportFilter === 'all' && events.length > 0) {
      // Khi reset lại filter về 'all', áp dụng lại các filter khác
      let result = [...events];
      
      // Áp dụng lại filter theo status
      if (activeTab !== 'all') {
        result = result.filter(event => event.status === activeTab);
      }
      
      // Áp dụng lại filter theo search
      if (searchTerm) {
        const lowerCaseSearch = searchTerm.toLowerCase();
        result = result.filter(
          event =>
            event.name.toLowerCase().includes(lowerCaseSearch) ||
            event.description.toLowerCase().includes(lowerCaseSearch) ||
            event.facilityName.toLowerCase().includes(lowerCaseSearch) ||
            event.facilityAddress.toLowerCase().includes(lowerCaseSearch) ||
            (event.sportName && event.sportName.toLowerCase().includes(lowerCaseSearch)) ||
            (event.discountType === 'PERCENT' && 'giảm giá phần trăm'.includes(lowerCaseSearch)) ||
            (event.discountType === 'FIXED_AMOUNT' && 'giảm giá tiền'.includes(lowerCaseSearch)) ||
            (event.discountType === 'FREE_SLOT' && 'tặng lượt đặt miễn phí'.includes(lowerCaseSearch)) ||
            (event.targetUserType === 'NEW' && 'người mới'.includes(lowerCaseSearch)) ||
            (event.targetUserType === 'LOYALTY' && 'khách hàng vip'.includes(lowerCaseSearch))
        );
      }
      
      // Áp dụng lại filter theo event type
      if (typeFilter !== 'all') {
        result = result.filter(event => event.eventType === typeFilter);
      }
      
      setFilteredEvents(result);
      setCurrentPage(1);
    }
  }, [sportFilter, events, activeTab, searchTerm, typeFilter]);

  // Generate options for sport filter from API data
  const sportOptions = sportsList.map(sport => ({
    id: sport.id,
    name: sport.name
  }));

  // Handle view event details
  const handleViewEvent = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  // Handle register for event
  const handleRegister = (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    if (event?.eventType === 'TOURNAMENT') {
      // Show registration modal
      setCurrentEventForRegister(event);
      setRegisterModalVisible(true);
    } else if (event?.eventType === 'DISCOUNT' && event.facilityId) {
      navigate(`/booking/${event.facilityId}`);
    } else {
      navigate(`/event/${eventId}`);
    }
  };

  // Render event status tag
  const renderEventStatus = (status: EventStatus) => {
    let color;
    let text;
    
    switch (status) {
      case 'upcoming':
        color = 'blue';
        text = 'Sắp diễn ra';
        break;
      case 'active':
        color = 'green';
        text = 'Đang diễn ra';
        break;
      case 'expired':
        color = 'gray';
        text = 'Đã kết thúc';
        break;
      default:
        color = 'default';
        text = 'Không xác định';
    }
    
    return <Tag color={color}>{text}</Tag>;
  };

  // Render event type tag
  const renderEventType = (type?: EventType) => {
    if (!type) return null;
    
    let color;
    let text;
    let icon;
    
    switch (type) {
      case 'TOURNAMENT':
        color = 'magenta';
        text = 'Giải đấu';
        icon = <TrophyOutlined />;
        break;
      case 'DISCOUNT':
        color = 'green';
        text = 'Khuyến mãi';
        icon = <PercentageOutlined />;
        break;      
      default:
        color = 'default';
        text = 'Khác';
        icon = null;
    }
    
    return (
      <Tag color={color} icon={icon}>{text}</Tag>
    );
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Calculate pagination
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Check if registration is available
  const isRegistrationAvailable = (event: DisplayEvent) => {
    if (event.status === 'expired') return false;
    
    if (event.eventType === 'TOURNAMENT') {
      // Check if current date is before registration end date
      if (event.registrationEndDate) {
        const now = new Date();
        const endDate = new Date(event.registrationEndDate);
        if (now > endDate) return false;
      }
      
      // Check if max participants reached
      if (event.currentParticipants !== undefined && 
          event.maxParticipants !== undefined && 
          event.currentParticipants >= event.maxParticipants) return false;
    }
    
    return true;
  };

  // Render event cards with skeleton loading
  const renderEventCards = () => {
    if (filteredEvents.length === 0) {
      return (
        <Col span={24}>
          <Empty
            description="Không tìm thấy sự kiện nào khớp với tiêu chí tìm kiếm"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Col>
      );
    }

    return paginatedEvents.map(event => (
      <Col xs={24} md={12} lg={8} key={event.id}>
        <Card
          hoverable
          className="event-card"
          cover={
            <div className="event-card-cover">
              <img 
                alt={event.name} 
                src={event.image && event.image.length > 0 ? 
                  event.image[0] : 
                  `https://via.placeholder.com/600x300?text=${encodeURIComponent(event.name)}`
                } 
              />
              <div className="event-card-badge">
                {event.status && renderEventStatus(event.status)}
                {renderEventType(event.eventType)}
              </div>
            </div>
          }
          actions={[
            <Button 
              type="link" 
              onClick={() => event.id && handleViewEvent(event.id)}
              icon={<ArrowRightOutlined />}
            >
              Chi tiết
            </Button>,
            <Button 
              type="primary"
              onClick={() => event.id && handleRegister(event.id)}
              disabled={!isRegistrationAvailable(event)}
            >
              {event.eventType === 'TOURNAMENT' ? 'Đăng ký' : 'Đặt sân'}
            </Button>
          ]}
        >
          <div className="event-card-content">
            <div className="event-card-org">
              <Avatar src={`https://via.placeholder.com/40?text=${event.facilityName?.[0] || 'F'}`} size="small" />
              <Text type="secondary" className="text-sm truncate">
                {event.facilityName}
              </Text>
            </div>
            
            <div className="event-card-title-container">
              <Card.Meta
                title={<span className="event-card-title">{event.name}</span>}
                description={
                  <Paragraph ellipsis={{ rows: 2 }} className="event-card-desc">
                    {event.description}
                  </Paragraph>
                }
              />
            </div>
            
            <div className="event-card-info">
              <div className="event-info-item">
                <CalendarOutlined />
                <Text className="ml-2">
                  {formatDate(event.startDate)}
                  {event.startDate !== event.endDate && 
                    ` - ${formatDate(event.endDate)}`}
                </Text>
              </div>
              
              <div className="event-info-item">
                <EnvironmentOutlined />
                <Text className="ml-2" ellipsis>{event.facilityName}</Text>
              </div>
              
              {event.eventType === 'TOURNAMENT' && (
                <div className="tournament-info">
                  {event.currentParticipants !== undefined && event.maxParticipants !== undefined && (
                    <div className="event-info-item">
                      <TeamOutlined />
                      <Text className="ml-2">
                        {event.currentParticipants}/{event.maxParticipants} người tham gia
                      </Text>
                    </div>
                  )}
                  
                  {event.totalPrize && (
                    <div className="event-info-item">
                      <TrophyOutlined />
                      <Text className="ml-2">
                        Giải thưởng: {event.totalPrize}
                      </Text>
                    </div>
                  )}
                  
                  {event.registrationFee !== undefined && (
                    <div className="event-info-item">
                      <span style={{ fontSize: '14px', marginRight: '5px' }}>💰</span>
                      <Text className="ml-1">
                        {event.isFreeRegistration === true 
                          ? 'Miễn phí tham gia' 
                          : `Phí tham gia: ${event.registrationFee?.toLocaleString('vi-VN')}đ`}
                      </Text>
                    </div>
                  )}
                </div>
              )}
              
              {event.eventType === 'DISCOUNT' && (
                <div className="discount-info">
                  {event.discountType === 'PERCENT' && event.discountPercent !== undefined && (
                    <div className="event-info-item">
                      <PercentageOutlined />
                      <Text className="ml-2">
                        Giảm giá {event.discountPercent}%
                      </Text>
                    </div>
                  )}
                  
                  {event.discountType === 'FIXED_AMOUNT' && event.discountAmount !== undefined && (
                    <div className="event-info-item">
                      <span style={{ fontSize: '14px', marginRight: '5px' }}>💵</span>
                      <Text className="ml-1">
                        Giảm giá {event.discountAmount?.toLocaleString('vi-VN')}đ
                      </Text>
                    </div>
                  )}
                  
                  {event.discountType === 'FREE_SLOT' && event.freeSlots !== undefined && (
                    <div className="event-info-item">
                      <GiftOutlined />
                      <Text className="ml-2">
                        Tặng {event.freeSlots} lượt đặt miễn phí
                      </Text>
                    </div>
                  )}
                  
                  {event.minBookingValue !== undefined && event.minBookingValue > 0 && (
                    <div className="event-info-item">
                      <span style={{ fontSize: '14px', marginRight: '5px' }}>💲</span>
                      <Text className="ml-1">
                        Đơn tối thiểu: {event.minBookingValue?.toLocaleString('vi-VN')}đ
                      </Text>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="event-card-footer">
              <div className="event-tags">
                {event.sportName && (
                  <Tag key={event.sportName} className="event-tag">{event.sportName}</Tag>
                )}
                
                {event.fieldIds && event.fieldIds.length > 0 && (
                  <Tag key="fields" color="cyan" className="event-tag">
                    {event.fieldIds.length} sân
                  </Tag>
                )}
                
                {event.eventType === 'TOURNAMENT' && event.tournamentFormat && (
                  <Tag key="format" color="purple" className="event-tag">
                    {Array.isArray(event.tournamentFormat) 
                      ? (event.tournamentFormat.includes('knockout') ? 'Đấu loại' : 
                         event.tournamentFormat.includes('roundRobin') ? 'Vòng tròn' : 
                         event.tournamentFormat.includes('hybrid') ? 'Kết hợp' : 'Khác')
                      : event.tournamentFormat}
                  </Tag>
                )}
              </div>
              
              <div className="event-meta">
                {event.eventType === 'TOURNAMENT' && event.registrationEndDate && (
                  <div className="event-deadline">
                    <ClockCircleOutlined />
                    <Text className="ml-1 text-xs">
                      Hạn đăng ký: {formatDate(event.registrationEndDate)}
                    </Text>
                  </div>
                )}
                
                {event.eventType === 'DISCOUNT' && (
                  <div className="event-badge">
                    <Tag color="red" className="mb-0">
                      {event.maxUsageCount ? `${event.maxUsageCount} lượt` : 'Không giới hạn'}
                    </Tag>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Col>
    ));
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb
          className="mb-4"
          items={[
            {
              title: <a href="/">Trang chủ</a>,
            },
            {
              title: 'Sự kiện & Giải đấu',
            },
          ]}
        />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
          <div>
            <Title level={2} className="m-0 text-xl md:text-2xl lg:text-3xl">
              Sự kiện & Giải đấu
            </Title>
            <Text type="secondary">
              Khám phá các sự kiện thể thao và giải đấu đang diễn ra
            </Text>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Space>
              <Select 
                value={sportFilter}
                onChange={value => setSportFilter(value)}
                style={{ width: 150 }}
              >
                <Option value="all">Tất cả môn</Option>
                {sportOptions.map(sport => (
                  <Option key={sport.id} value={sport.id}>{getSportNameInVietnamese(sport.name)}</Option>
                ))}
              </Select>
              
              <Select 
                value={typeFilter}
                onChange={value => setTypeFilter(value)}
                style={{ width: 150 }}
              >
                <Option value="all">Tất cả loại</Option>
                <Option value="TOURNAMENT">Giải đấu</Option>
                <Option value="DISCOUNT">Khuyến mãi</Option>
              </Select>
            </Space>
          </div>
        </div>
        
        <Card className="mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Tabs 
              activeKey={activeTab} 
              onChange={activeKey => setActiveTab(activeKey as EventStatus | 'all')}
              className="event-tabs"
              items={[
                {
                  key: 'all',
                  label: <span>Tất cả sự kiện</span>,
                },
                {
                  key: 'upcoming',
                  label: (
                    <Badge 
                      count={events.filter(e => e.status === 'upcoming').length} 
                      offset={[15, 0]}
                    >
                      <span>Sắp diễn ra</span>
                    </Badge>
                  ),
                },
                {
                  key: 'active',
                  label: (
                    <Badge 
                      count={events.filter(e => e.status === 'active').length} 
                      offset={[15, 0]}
                    >
                      <span>Đang diễn ra</span>
                    </Badge>
                  ),
                },
                {
                  key: 'expired',
                  label: <span>Đã kết thúc</span>,
                },
              ]}
            />
            
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <Input 
                placeholder="Tìm kiếm sự kiện..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined />}
                allowClear
                style={{ maxWidth: 300, width: '100%' }}
              />
            </div>
          </div>
        </Card>
        
        {loading ? (
          <div className="text-center py-8 spin-container">
            <Spin />
            <div className="mt-3">Đang tải danh sách sự kiện...</div>
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {renderEventCards()}
          </Row>
        )}
        
        {filteredEvents.length > pageSize && (
          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredEvents.length}
              onChange={setCurrentPage}
              showSizeChanger
              onShowSizeChange={(current, size) => {
                setCurrentPage(1);
                setPageSize(size);
              }}
            />
          </div>
        )}
      </div>
      
      {/* Registration Modal */}
      <Modal
        title={`Đăng ký tham gia ${currentEventForRegister?.name}`}
        open={registerModalVisible}
        onCancel={() => setRegisterModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        onOk={() => {
          registrationForm.validateFields()
            .then(() => {
              // TODO: call API or mock push new registration
              message.success('Đăng ký thành công!');
              registrationForm.resetFields();
              setRegisterModalVisible(false);
            })
            .catch(errorInfo => {
              console.log('Validation Failed:', errorInfo);
            });
        }}
      >
        <Form form={registrationForm} layout="vertical">
          <Form.Item name="userName" label="Họ và tên" rules={[{ required: true, message: 'Nhập họ và tên' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="userEmail" label="Email" rules={[{ required: true, type: 'email', message: 'Nhập email hợp lệ' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="userPhone" label="Số điện thoại" rules={[{ required: true, message: 'Nhập số điện thoại' }]}>
            <Input />
          </Form.Item>
          {!currentEventForRegister?.isFreeRegistration && (
            <>
              <Form.Item name="paymentMethod" label="Phương thức thanh toán" rules={[{ required: true, message: 'Chọn phương thức thanh toán' }]}>
                <Select placeholder="Chọn phương thức">
                  <Option value="bank">Chuyển khoản</Option>
                  <Option value="momo">Momo</Option>
                  <Option value="cash">Tiền mặt</Option>
                </Select>
              </Form.Item>
              <Form.Item name="paymentProofFile" label="Chứng từ thanh toán" valuePropName="file" getValueFromEvent={e => e.file.originFileObj} rules={[{ required: true, message: 'Upload chứng từ' }]}>
                <Upload beforeUpload={() => false} listType="picture">
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </>
          )}
          <Form.Item name="notes" label="Ghi chú">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
      
      <style>
        {`
          .spin-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          
          .event-card {
            height: 100%;
            transition: all 0.3s;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
            display: flex;
            flex-direction: column;
          }
          
          .event-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(-5px);
          }
          
          .event-card-cover {
            position: relative;
            height: 200px;
            overflow: hidden;
          }
          
          .event-card-cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .event-card-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          
          .event-card-content {
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          
          .event-card-org {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            height: 24px;
            overflow: hidden;
          }
          
          .event-card-title-container {
            min-height: 88px;
            margin-bottom: 12px;
          }
          
          .event-card-title {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .event-card-desc {
            color: rgba(0, 0, 0, 0.65);
            height: 40px;
            overflow: hidden;
          }
          
          .event-card-info {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin: 12px 0;
            flex-grow: 1;
            min-height: 110px;
          }
          
          .event-info-item {
            display: flex;
            align-items: center;
            color: rgba(0, 0, 0, 0.65);
            font-size: 13px;
          }
          
          .tournament-info, .discount-info {
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-height: 60px;
          }
          
          .event-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
            flex-wrap: wrap;
            min-height: 36px;
          }
          
          .event-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
          }
          
          .event-tag {
            margin: 0;
          }
          
          .event-deadline {
            display: flex;
            align-items: center;
            color: #ff4d4f;
            font-weight: 500;
            font-size: 12px;
          }
          
          .event-badge {
            display: flex;
            align-items: center;
          }
          
          .truncate {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 80%;
          }
          
          .pagination-container {
            display: flex;
            justify-content: center;
            margin-top: 24px;
          }
          
          .event-tabs {
            margin-bottom: 0 !important;
          }
        `}
      </style>
    </div>
  );
};

export default EventList; 