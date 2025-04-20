import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, Typography, Row, Col, Tag, Button, Space, Select,
  Input, Empty, Pagination, Tabs, Badge, Avatar, Spin
} from 'antd';
import { 
  SearchOutlined, CalendarOutlined, EnvironmentOutlined, TeamOutlined,
  TrophyOutlined, ArrowRightOutlined, ClockCircleOutlined, PercentageOutlined,
  GiftOutlined
} from '@ant-design/icons';
import { Event, EventType, EventStatus } from '@/types/event.type';
import { mockEvents } from '@/mocks/event/eventData';
import { mockEventDetails } from '@/mocks/event/eventData';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

// Mock facility data - replace with actual data source
const mockFacilities: Record<string, { name: string; address: string }> = {
  '1': { name: 'Sân bóng đá Phạm Kha', address: '123 Đường Phạm Văn Đồng, Quận Gò Vấp, TPHCM' },
  '2': { name: 'Sân Tennis Bình Chánh', address: '456 Đường Nguyễn Văn Linh, Huyện Bình Chánh, TPHCM' },
  '3': { name: 'Sân bóng rổ Quận 7', address: '789 Đường Nguyễn Thị Thập, Quận 7, TPHCM' },
  '4': { name: 'Sân cầu lông Phạm Kha', address: '123 Đường Phạm Văn Đồng, Quận Gò Vấp, TPHCM' }
};

// Mock sports data
const mockSports: Record<number, string> = {
  1: 'Bóng đá',
  2: 'Bóng rổ',
  3: 'Tennis',
  4: 'Cầu lông'
};

// Enhanced Event interface for display
interface DisplayEvent extends Event {
  facilityName: string;
  facilityAddress: string;
  sportName?: string;
  currentParticipants?: number;
  maxParticipants?: number;
  registrationEndDate?: string;
  discountPercent?: number;
  activities?: string[];
}

const EventList: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<DisplayEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<DisplayEvent[]>([]);
  const [activeTab, setActiveTab] = useState<EventStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState<number | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<EventType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Simulating API call to fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Enrich events with facility and sport details
        const enhancedEvents: DisplayEvent[] = mockEvents.map(event => {
          const eventDetails = mockEventDetails[event.id];
          const facility = mockFacilities[event.facilityId || '1'];
          
          return {
            ...event,
            facilityName: facility?.name || 'Không xác định',
            facilityAddress: facility?.address || 'Không xác định',
            sportName: eventDetails?.targetSportId ? mockSports[eventDetails.targetSportId] : undefined,
            currentParticipants: eventDetails?.currentParticipants,
            maxParticipants: eventDetails?.maxParticipants,
            registrationEndDate: eventDetails?.registrationEndDate,
            discountPercent: eventDetails?.discountPercent,
            activities: eventDetails?.activities,
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

    fetchEvents();
  }, []);

  // Handle filter changes
  useEffect(() => {
    let result = [...events];

    // Filter by status
    if (activeTab !== 'all') {
      result = result.filter(event => event.status === activeTab);
    }

    // Filter by search text
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        event =>
          event.name.toLowerCase().includes(lowerCaseSearch) ||
          event.description.toLowerCase().includes(lowerCaseSearch) ||
          event.facilityName.toLowerCase().includes(lowerCaseSearch) ||
          event.facilityAddress.toLowerCase().includes(lowerCaseSearch) ||
          (event.sportName && event.sportName.toLowerCase().includes(lowerCaseSearch))
      );
    }

    // Filter by sport type
    if (sportFilter !== 'all') {
      result = result.filter(event => {
        const eventDetails = mockEventDetails[event.id];
        return eventDetails?.targetSportId === sportFilter;
      });
    }

    // Filter by event type
    if (typeFilter !== 'all') {
      result = result.filter(event => event.eventType === typeFilter);
    }

    setFilteredEvents(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [events, activeTab, searchTerm, sportFilter, typeFilter]);

  // Generate unique sport types for filter
  const sportOptions = Object.entries(mockSports).map(([id, name]) => ({
    id: parseInt(id),
    name
  }));

  // Handle view event details
  const handleViewEvent = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  // Handle register for event
  const handleRegister = (eventId: number) => {
    const eventDetails = mockEventDetails[eventId];
    
    if (eventDetails?.registrationLink) {
      window.open(eventDetails.registrationLink, '_blank');
    } else {
      navigate(`/event/${eventId}?register=true`);
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
    if (loading) {
      return Array(3).fill(null).map((_, index) => (
        <Col xs={24} md={12} lg={8} key={`skeleton-${index}`}>
          <Card className="event-card" loading={true} />
        </Col>
      ));
    }

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
                src={event.image ? 
                  `${event.image}` : 
                  `https://via.placeholder.com/600x300?text=${encodeURIComponent(event.name)}`
                } 
              />
              <div className="event-card-badge">
                {renderEventStatus(event.status)}
                {renderEventType(event.eventType)}
              </div>
            </div>
          }
          actions={[
            <Button 
              type="link" 
              onClick={() => handleViewEvent(event.id)}
              icon={<ArrowRightOutlined />}
            >
              Chi tiết
            </Button>,
            <Button 
              type="primary"
              onClick={() => handleRegister(event.id)}
              disabled={!isRegistrationAvailable(event)}
            >
              Đăng ký
            </Button>
          ]}
        >
          <div className="event-card-org">
            <Avatar src={`https://via.placeholder.com/40?text=${event.facilityName?.[0] || 'F'}`} size="small" />
            <Text type="secondary" className="text-sm">
              {event.facilityName}
            </Text>
          </div>
          
          <Card.Meta
            title={<span className="event-card-title">{event.name}</span>}
            description={
              <Paragraph ellipsis={{ rows: 2 }} className="event-card-desc">
                {event.description}
              </Paragraph>
            }
          />
          
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
            
            {event.eventType === 'TOURNAMENT' && event.currentParticipants !== undefined && event.maxParticipants !== undefined && (
              <div className="event-info-item">
                <TeamOutlined />
                <Text className="ml-2">
                  {event.currentParticipants}/{event.maxParticipants} người tham gia
                </Text>
              </div>
            )}
            
            {event.eventType === 'DISCOUNT' && event.discountPercent !== undefined && (
              <div className="event-info-item">
                <PercentageOutlined />
                <Text className="ml-2">
                  Giảm giá {event.discountPercent}%
                </Text>
              </div>
            )}
            
            
          </div>
          
          <div className="event-card-footer">
            <div>
              {event.sportName && (
                <Tag key={event.sportName} className="event-tag">{event.sportName}</Tag>
              )}
              {event.eventType === 'TOURNAMENT' && (
                <Tag key="tournament" color="blue" className="event-tag">Giải đấu</Tag>
              )}
            </div>
            
            {event.eventType === 'TOURNAMENT' && event.registrationEndDate && (
              <div className="event-deadline">
                <ClockCircleOutlined />
                <Text className="ml-1 text-xs">
                  Hạn đăng ký: {formatDate(event.registrationEndDate)}
                </Text>
              </div>
            )}
          </div>
        </Card>
      </Col>
    ));
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto">
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
                  <Option key={sport.id} value={sport.id}>{sport.name}</Option>
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
                <Option value="SPECIAL_OFFER">Ưu đãi đặc biệt</Option>
              </Select>
            </Space>
          </div>
        </div>
        
        <Card className="mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Tabs 
              activeKey={activeTab} 
              onChange={activeTab => setActiveTab(activeTab as EventStatus | 'all')}
              className="event-tabs"
            >
              <TabPane 
                tab={<span>Tất cả sự kiện</span>} 
                key="all" 
              />
              <TabPane 
                tab={
                  <Badge 
                    count={events.filter(e => e.status === 'upcoming').length} 
                    offset={[15, 0]}
                  >
                    <span>Sắp diễn ra</span>
                  </Badge>
                } 
                key="upcoming" 
              />
              <TabPane 
                tab={
                  <Badge 
                    count={events.filter(e => e.status === 'active').length} 
                    offset={[15, 0]}
                  >
                    <span>Đang diễn ra</span>
                  </Badge>
                } 
                key="active" 
              />
              <TabPane 
                tab={<span>Đã kết thúc</span>} 
                key="expired" 
              />
            </Tabs>
            
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
        
        {/* Event Highlight Section */}
        {!loading && filteredEvents.length > 0 && activeTab === 'all' && currentPage === 1 && (
          <Card 
            className="mb-4 md:mb-6 highlight-event"
            cover={
              <div className="highlight-event-cover">
                <img 
                  alt={filteredEvents[0]?.name} 
                  src={filteredEvents[0]?.image ? 
                    `${filteredEvents[0].image}` : 
                    `https://via.placeholder.com/1200x400?text=${encodeURIComponent(filteredEvents[0].name)}`
                  }
                  className="highlight-event-image"
                />
                <div className="highlight-event-overlay">
                  <div className="highlight-event-content">
                    <Space>
                      {renderEventStatus(filteredEvents[0]?.status)}
                      {renderEventType(filteredEvents[0]?.eventType)}
                    </Space>
                    <Title level={3} className="highlight-event-title">
                      {filteredEvents[0]?.name}
                    </Title>
                    <Space className="highlight-event-details">
                      <span>
                        <CalendarOutlined /> {formatDate(filteredEvents[0]?.startDate)}
                      </span>
                      <span>
                        <ClockCircleOutlined /> {new Date(filteredEvents[0]?.startDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>
                        <EnvironmentOutlined /> {filteredEvents[0]?.facilityName}
                      </span>
                    </Space>
                    <div className="highlight-event-actions">
                      <Button 
                        type="primary" 
                        size="large"
                        onClick={() => handleViewEvent(filteredEvents[0]?.id)}
                      >
                        Xem Chi Tiết
                      </Button>
                      <Button 
                        size="large"
                        onClick={() => handleRegister(filteredEvents[0]?.id)}
                        disabled={!isRegistrationAvailable(filteredEvents[0])}
                      >
                        Đăng Ký Tham Gia
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            {/* Card content can be empty as we're using the cover for content */}
          </Card>
        )}
        
        {loading && (
          <div className="text-center py-8">
            <Spin size="large" tip="Đang tải danh sách sự kiện..." />
          </div>
        )}
        
        <Row gutter={[16, 16]}>
          {renderEventCards()}
        </Row>
        
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
      
      <style>
        {`
          .event-card {
            height: 100%;
            transition: all 0.3s;
            overflow: hidden;
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
          
          .event-card-org {
            display: flex;
            align-items: center;
            gap: 8px;
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
            margin-bottom: 12px;
          }
          
          .event-card-info {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin: 12px 0;
          }
          
          .event-info-item {
            display: flex;
            align-items: center;
            color: rgba(0, 0, 0, 0.65);
            font-size: 13px;
          }
          
          .event-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
          }
          
          .event-tag {
            margin-bottom: 5px;
          }
          
          .event-deadline {
            display: flex;
            align-items: center;
            color: #ff4d4f;
            font-weight: 500;
            font-size: 12px;
          }
          
          .pagination-container {
            display: flex;
            justify-content: center;
            margin-top: 24px;
          }
          
          .event-tabs {
            margin-bottom: 0 !important;
          }
          
          .highlight-event {
            margin-bottom: 24px;
          }
          
          .highlight-event-cover {
            position: relative;
            height: 400px;
          }
          
          .highlight-event-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .highlight-event-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
            display: flex;
            align-items: flex-end;
            padding: 24px;
          }
          
          .highlight-event-content {
            color: white;
            width: 100%;
          }
          
          .highlight-event-title {
            color: white !important;
            margin: 12px 0;
          }
          
          .highlight-event-details {
            margin-bottom: 24px;
          }
          
          .highlight-event-actions {
            display: flex;
            gap: 12px;
          }
          
          @media (max-width: 768px) {
            .highlight-event-cover {
              height: 300px;
            }
            
            .highlight-event-actions {
              flex-direction: column;
              gap: 8px;
              align-items: flex-start;
            }
            
            .highlight-event-actions button {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EventList; 