import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Row, Col, Card, Typography, Button, Tag, Divider, 
  Descriptions, Image, Spin, Statistic, Space, Alert, Tabs, List, Avatar
} from 'antd';
import { 
  CalendarOutlined, EnvironmentOutlined, TeamOutlined,
  TrophyOutlined, ArrowLeftOutlined, ClockCircleOutlined,
  CheckCircleOutlined, PhoneOutlined, DollarOutlined
} from '@ant-design/icons';
import { FullEvent, EventType } from '@/types/event.type';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for demo
import { mockEvents } from '@/mocks/event/eventData';
import { mockEventDetails } from '@/mocks/event/eventData';

// Mock facility data - replace with actual data source
const mockFacilities: Record<string, { name: string; address: string; phone: string }> = {
  '1': { name: 'Sân bóng đá Phạm Kha', address: '123 Đường Phạm Văn Đồng, Quận Gò Vấp, TPHCM', phone: '0987654321' },
  '2': { name: 'Sân Tennis Bình Chánh', address: '456 Đường Nguyễn Văn Linh, Huyện Bình Chánh, TPHCM', phone: '0123456789' },
  '3': { name: 'Sân bóng rổ Quận 7', address: '789 Đường Nguyễn Thị Thập, Quận 7, TPHCM', phone: '0909090909' },
  '4': { name: 'Sân cầu lông Phạm Kha', address: '123 Đường Phạm Văn Đồng, Quận Gò Vấp, TPHCM', phone: '0987654321' }
};

// Mock sports data
const mockSports: Record<number, string> = {
  1: 'Bóng đá',
  2: 'Bóng rổ',
  3: 'Tennis',
  4: 'Cầu lông'
};

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<FullEvent | null>(null);
  const [registrationModalVisible, setRegistrationModalVisible] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Find event in mock data
        const eventId = Number(id);
        const foundEvent = mockEvents.find(e => e.id === eventId);
        const eventDetails = mockEventDetails[eventId];
        
        if (foundEvent && eventDetails) {
          // Combine event and event details
          const fullEvent: FullEvent = {
            ...foundEvent,
            ...eventDetails,
            // Add additional data for display
            sportName: eventDetails.targetSportId ? mockSports[eventDetails.targetSportId] : undefined,
            location: foundEvent.facilityId ? 
              `${mockFacilities[foundEvent.facilityId]?.name}, ${mockFacilities[foundEvent.facilityId]?.address}` : 
              "Không xác định",
            // Create a mock organizer if not available
            organizer: {
              id: foundEvent.facilityId || '1',
              name: foundEvent.facilityId ? mockFacilities[foundEvent.facilityId]?.name : 'Không xác định',
              logo: `https://via.placeholder.com/150?text=${foundEvent.facilityId}`,
              contact: foundEvent.facilityId ? mockFacilities[foundEvent.facilityId]?.phone : undefined
            }
          };
          
          setEvent(fullEvent);
        } else {
          console.error('Event not found');
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRegister = () => {
    if (event?.registrationLink) {
      window.open(event.registrationLink, '_blank');
    } else {
      setRegistrationModalVisible(true);
      // In a real app, you would open a registration modal or redirect to a registration page
      alert(`Đăng ký tham gia sự kiện: ${event?.name}`);
    }
  };

  // Render status badge
  const renderEventStatus = (status: string) => {
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

  // Render event type badge
  const renderEventType = (type: EventType) => {
    let color;
    let text;
    
    switch (type) {
      case 'TOURNAMENT':
        color = 'magenta';
        text = 'Giải đấu';
        break;
      case 'DISCOUNT':
        color = 'cyan';
        text = 'Khuyến mãi';
        break;      
      default:
        color = 'default';
        text = 'Không xác định';
    }
    
    return <Tag color={color}>{text}</Tag>;
  };

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spin size="large" tip="Đang tải thông tin sự kiện..." />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="w-full p-6 text-center">
        <Alert
          message="Không tìm thấy sự kiện"
          description="Sự kiện bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
          type="error"
          showIcon
        />
        <Button 
          type="primary" 
          onClick={handleBack} 
          className="mt-4"
          icon={<ArrowLeftOutlined />}
        >
          Quay lại
        </Button>
      </div>
    );
  }

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Check if registration is available
  const isRegistrationAvailable = () => {
    if (event.status === 'expired') return false;
    
    if (event.eventType === 'TOURNAMENT') {
      // Check if current date is before registration end date
      if (event.registrationEndDate) {
        const now = new Date();
        const endDate = new Date(event.registrationEndDate);
        if (now > endDate) return false;
      }
      
      // Check if max participants reached
      if (event.currentParticipants && event.maxParticipants && 
          event.currentParticipants >= event.maxParticipants) return false;
    }
    
    return true;
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <Button 
          onClick={handleBack} 
          icon={<ArrowLeftOutlined />} 
          className="mb-4"
        >
          Quay lại danh sách sự kiện
        </Button>
        
        {/* Main event card */}
        <Card className="mb-6 overflow-hidden">
          {/* Event banner */}
          <div className="relative w-full h-[300px] -mt-6 -mx-6 mb-6">
            <Image
              src={event.bannerImage || `https://via.placeholder.com/1200x400?text=${event.name}`}
              alt={event.name}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
              preview={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex flex-col justify-end p-6">
              <div className="flex gap-2 mb-2">
                {renderEventStatus(event.status)}
                {renderEventType(event.eventType)}
              </div>
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                {event.name}
              </Title>
              <Space className="text-white mt-2">
                <span><CalendarOutlined /> {formatDate(event.startDate)}</span>
                {event.startDate !== event.endDate && (
                  <span>- {formatDate(event.endDate)}</span>
                )}
              </Space>
            </div>
          </div>
          
          {/* Event details */}
          <Row gutter={[24, 24]}>
            <Col xs={24} md={16}>
              <div className="mb-6">
                <Title level={4}>Thông tin sự kiện</Title>
                <Paragraph>
                  {event.description}
                </Paragraph>
              </div>
              
              <Tabs defaultActiveKey="details">
                <TabPane tab="Chi tiết" key="details">
                  <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                    <Descriptions.Item label="Thời gian bắt đầu">
                      {formatDateTime(event.startDate)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian kết thúc">
                      {formatDateTime(event.endDate)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa điểm">
                      <Space>
                        <EnvironmentOutlined />
                        {event.location}
                      </Space>
                    </Descriptions.Item>
                    
                    {event.eventType === 'TOURNAMENT' && (
                      <>
                        <Descriptions.Item label="Môn thể thao">
                          {event.sportName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Hạn đăng ký">
                          {event.registrationEndDate ? formatDateTime(event.registrationEndDate) : 'Không có'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số người tham gia">
                          {event.currentParticipants || 0} / {event.maxParticipants || 'Không giới hạn'}
                        </Descriptions.Item>
                        {event.registrationFee !== undefined && (
                          <Descriptions.Item label="Phí tham gia">
                            {event.registrationFee.toLocaleString('vi-VN')} VNĐ
                          </Descriptions.Item>
                        )}
                        {event.fields && event.fields.length > 0 && (
                          <Descriptions.Item label="Sân thi đấu" span={2}>
                            {event.fields.join(', ')}
                          </Descriptions.Item>
                        )}
                        {event.tournamentFormat && (
                          <Descriptions.Item label="Thể thức thi đấu" span={2}>
                            {event.tournamentFormat}
                          </Descriptions.Item>
                        )}
                      </>
                    )}
                    
                    {event.eventType === 'DISCOUNT' && (
                      <>
                        <Descriptions.Item label="Mức giảm giá">
                          {event.discountPercent}%
                        </Descriptions.Item>
                        {event.discountCode && (
                          <Descriptions.Item label="Mã giảm giá">
                            <Tag color="green" style={{ fontSize: '16px', padding: '4px 8px' }}>
                              {event.discountCode}
                            </Tag>
                          </Descriptions.Item>
                        )}
                        {event.minBookingValue !== undefined && event.minBookingValue > 0 && (
                          <Descriptions.Item label="Giá trị đặt sân tối thiểu">
                            {event.minBookingValue.toLocaleString('vi-VN')} VNĐ
                          </Descriptions.Item>
                        )}
                        {event.conditions && (
                          <Descriptions.Item label="Điều kiện áp dụng" span={2}>
                            {event.conditions}
                          </Descriptions.Item>
                        )}
                      </>
                    )}
                                        
                    
                    <Descriptions.Item label="Tổ chức bởi">
                      <Space>
                        <Avatar src={event.organizer?.logo} size="small" />
                        {event.organizer?.name}
                      </Space>
                    </Descriptions.Item>
                    
                    {event.organizer?.contact && (
                      <Descriptions.Item label="Liên hệ">
                        <Space>
                          <PhoneOutlined />
                          {event.organizer.contact}
                        </Space>
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </TabPane>
                
                {event.eventType === 'TOURNAMENT' && event.prizes && event.prizes.length > 0 && (
                  <TabPane tab="Giải thưởng" key="prizes">
                    <List
                      itemLayout="horizontal"
                      dataSource={event.prizes}
                      renderItem={prize => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar 
                                icon={<TrophyOutlined />} 
                                style={{ 
                                  backgroundColor: 
                                    prize.position === 1 ? '#FFD700' : 
                                    prize.position === 2 ? '#C0C0C0' : 
                                    prize.position === 3 ? '#CD7F32' : '#1890ff' 
                                }} 
                              />
                            }
                            title={`Giải ${
                              prize.position === 1 ? 'Nhất' : 
                              prize.position === 2 ? 'Nhì' : 
                              prize.position === 3 ? 'Ba' : 
                              `thứ ${prize.position}`
                            }`}
                            description={prize.prize}
                          />
                        </List.Item>
                      )}
                    />
                  </TabPane>
                )}
                
                {event.eventType === 'TOURNAMENT' && event.rules && (
                  <TabPane tab="Luật thi đấu" key="rules">
                    <Paragraph>
                      {event.rules}
                    </Paragraph>
                  </TabPane>
                )}
              </Tabs>
            </Col>
            
            <Col xs={24} md={8}>
              <Card className="mb-4">
                <Space direction="vertical" className="w-full">
                  {event.eventType === 'TOURNAMENT' ? (
                    <>
                      <Statistic 
                        title="Người tham gia" 
                        value={event.currentParticipants || 0} 
                        suffix={`/${event.maxParticipants || '∞'}`}
                        prefix={<TeamOutlined />} 
                      />
                      {event.registrationEndDate && (
                        <div>
                          <Text type="secondary">Hạn đăng ký</Text>
                          <div className="flex items-center mt-1">
                            <ClockCircleOutlined className="mr-2" />
                            <Text strong>
                              {formatDate(event.registrationEndDate)}
                            </Text>
                          </div>
                        </div>
                      )}
                      {event.registrationFee !== undefined && (
                        <div>
                          <Text type="secondary">Phí tham gia</Text>
                          <div className="flex items-center mt-1">
                            <DollarOutlined className="mr-2" />
                            <Text strong>
                              {event.registrationFee.toLocaleString('vi-VN')} VNĐ
                            </Text>
                          </div>
                        </div>
                      )}
                    </>
                  ) : event.eventType === 'DISCOUNT' ? (
                    <>
                      <Statistic 
                        title="Mức giảm giá" 
                        value={event.discountPercent || 0} 
                        suffix="%" 
                        valueStyle={{ color: '#3f8600' }}
                      />
                      {event.discountCode && (
                        <div>
                          <Text type="secondary">Mã giảm giá</Text>
                          <div className="mt-1">
                            <Tag color="green" style={{ fontSize: '16px', padding: '8px 12px' }}>
                              {event.discountCode}
                            </Tag>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {event.activities && event.activities.length > 0 && (
                        <div>
                          <Text type="secondary">Các hoạt động</Text>
                          <div className="mt-1">
                            {event.activities.map(activity => (
                              <Tag key={activity} className="mb-1">{activity}</Tag>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  <Divider />
                  
                  {isRegistrationAvailable() ? (
                    <>
                      <Button 
                        type="primary" 
                        size="large" 
                        block 
                        onClick={handleRegister}
                        icon={<CheckCircleOutlined />}
                      >
                        Đăng ký tham gia
                      </Button>
                      {event.eventType === 'TOURNAMENT' && event.minParticipants && (
                        <Alert 
                          message={`Sự kiện yêu cầu tối thiểu ${event.minParticipants} người tham gia để diễn ra.`}
                          type="info"
                          showIcon
                          className="mt-4"
                        />
                      )}
                    </>
                  ) : (
                    <Alert 
                      message={
                        event.status === 'expired' ? 'Sự kiện đã kết thúc' : 
                        event.eventType === 'TOURNAMENT' && event.registrationEndDate && new Date() > new Date(event.registrationEndDate) ? 
                          'Đã hết hạn đăng ký' : 
                        event.eventType === 'TOURNAMENT' && event.currentParticipants && event.maxParticipants && 
                        event.currentParticipants >= event.maxParticipants ? 
                          'Đã đạt số lượng người tham gia tối đa' : 
                          'Không thể đăng ký tham gia'
                      }
                      type="warning"
                      showIcon
                    />
                  )}
                </Space>
              </Card>
              
              <Card title="Thông tin liên hệ">
                <Descriptions column={1}>
                  <Descriptions.Item label="Tổ chức">
                    {event.organizer?.name}
                  </Descriptions.Item>
                  {event.organizer?.contact && (
                    <Descriptions.Item label="Số điện thoại">
                      {event.organizer.contact}
                    </Descriptions.Item>
                  )}
                  {event.contact?.email && (
                    <Descriptions.Item label="Email">
                      {event.contact.email}
                    </Descriptions.Item>
                  )}
                  {event.contact?.phone && event.organizer?.contact !== event.contact.phone && (
                    <Descriptions.Item label="Số điện thoại BTC">
                      {event.contact.phone}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
      
      <style>
        {`
        .ant-card-cover img {
          object-fit: cover;
          height: 300px;
        }
        `}
      </style>
    </div>
  );
};

export default EventDetail;
