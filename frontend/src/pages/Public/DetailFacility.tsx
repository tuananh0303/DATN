import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { 
  Breadcrumb, 
  Card, 
  Tag, 
  Image, 
  Button, 
  Tabs, 
  Typography, 
  Rate, 
  List,
  Spin,
  Empty,
  message,
  Avatar,
  Row,
  Col,
  Divider,
  Modal
} from 'antd';
import { 
  EnvironmentOutlined, 
  CommentOutlined,
  ExpandOutlined,
  UserOutlined,
  CalendarOutlined,
  StarOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  FieldTimeOutlined,
  InfoCircleOutlined,
  DollarOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons';
import type { Service } from '@/types/service.type';
import type { Facility } from '@/types/facility.type';
import type { FieldGroup } from '@/types/field.type';
import type { Voucher } from '@/types/voucher.type';
import type { Event, EventPrize, EventType } from '@/types/event.type';
import { getSportNameInVietnamese } from '@/utils/translateSport';
import { getMockCoordinates } from '@/utils/geocoding';
import MapLocation from '@/components/MapLocation';
import { facilityService } from '@/services/facility.service';
import { reviewService } from '@/services/review.service';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { showLoginModal } from '@/store/slices/userSlice';
import { ChatService } from '@/services/chat.service';
import { openChatWidget, setActiveConversation } from '@/store/slices/chatSlice';
import dayjs from 'dayjs';

// Import CSS ghi đè Ant Design
import '@/styles/AntdOverride.css';


const { Title, Text, Paragraph } = Typography;

// Interface for reviews based on API response
interface Review {
  id: number;
  rating: number;
  comment: string;
  imageUrl: string[];
  reviewAt: string;
  feedbackAt?: string;
  feedback?: string;
  booking: {
    id: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    player: {
      id: string;
      name: string;
      email: string;
      password: string;
      phoneNumber: string;
      avatarUrl: string | null;
      gender: string | null;
      dob: string | null;
      bankAccount: string | null;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
    bookingSlots: {
      id: number;
      date: string;
    }[];
    additionalServices: {
      id: string;
      name: string;
      price: number;
      amount: number;
    }[];
  };
}

// Create a custom extended Event interface
interface FacilityEvent extends Omit<Event, 'eventType'> {
  currentParticipants?: number;
  maxParticipants?: number;
  prizes?: EventPrize[];
  eventType?: EventType;
  image?: string[];
}

const DetailFacility: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { facilityId } = useParams<{ facilityId: string }>();
  const [activeTab, setActiveTab] = useState('general');
  
  // Get auth state from Redux
  const { isAuthenticated, user } = useAppSelector(state => state.user);
  
  // States for data
  const [facility, setFacility] = useState<Facility | null>(null);
  const [fieldGroups, setFieldGroups] = useState<FieldGroup[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [events, setEvents] = useState<FacilityEvent[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleReplies, setVisibleReplies] = useState<{ [key: string]: boolean }>({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmModalType, setConfirmModalType] = useState<'add' | 'remove'>('add');

  // Check if facility is in user's favorites when component mounts
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (isAuthenticated && user?.role === 'player' && facilityId) {
        try {
          const favorites = await facilityService.getFavoriteFacility();
          const isFacilityFavorite = favorites.some(fav => fav.id === facilityId);
          setIsFavorite(isFacilityFavorite);
        } catch (error) {
          console.error('Error checking favorite status:', error);
        }
      }
    };

    checkFavoriteStatus();
  }, [isAuthenticated, user, facilityId]);

  const toggleReplyVisibility = (reviewId: string) => {
    setVisibleReplies(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  // Fetch facility data
  useEffect(() => {
    const fetchFacilityData = async () => {
      if (!facilityId) return;
      
      setLoading(true);
      try {
        // Get facility details from API
        const facilityData = await facilityService.getFacilityById(facilityId);
        
        // Set facility data
        setFacility(facilityData);
        
        // Set main image if images exist
        if (facilityData.imagesUrl && facilityData.imagesUrl.length > 0) {
          setMainImage(facilityData.imagesUrl[0]);
        }
        
        // Set field groups from API response
        if (facilityData.fieldGroups) {
          setFieldGroups(facilityData.fieldGroups);
        }
        
        // Set services from API response
        if (facilityData.services) {
          setServices(facilityData.services);
        }
        
        // Set events and vouchers (empty arrays if not present)
        setEvents(facilityData.events || []);
        setVouchers(facilityData.vouchers || []);

        // Fetch real reviews from API
        try {
          const reviewsData = await reviewService.getListReviewByFacilityId(facilityId);
          setReviews(reviewsData);
          
          // Initialize visible replies for each review
          const initialVisibility: { [key: string]: boolean } = {};
          reviewsData.forEach((review: Review) => {
            initialVisibility[review.id.toString()] = true;
          });
          setVisibleReplies(initialVisibility);
        } catch (reviewError) {
          console.error('Error fetching reviews:', reviewError);
          // In case of error, set empty array
          setReviews([]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching facility data:', err);
        setError('Failed to load facility data. Please try again later.');
        message.error('Failed to load facility data');
      } finally {
        setLoading(false);
      }
    };

    fetchFacilityData();
  }, [facilityId]);

  useEffect(() => {
    // Initialize all field groups as collapsed
    const initialExpandedState: { [key: string]: boolean } = {};
    fieldGroups.forEach(group => {
      initialExpandedState[group.id] = false;
    });
    setExpandedGroups(initialExpandedState);
  }, [fieldGroups]);
  
  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'active':
        return <Tag color="success" className="text-sm md:text-base px-2 py-0.5 md:px-3 md:py-1">Đang hoạt động</Tag>;
      case 'pending':
        return <Tag color="warning" className="text-sm md:text-base px-2 py-0.5 md:px-3 md:py-1">Đang chờ phê duyệt</Tag>;
      case 'unactive':
        return <Tag color="error" className="text-sm md:text-base px-2 py-0.5 md:px-3 md:py-1">Đang đóng cửa</Tag>;
      default:
        return <Tag color="default" className="text-sm md:text-base px-2 py-0.5 md:px-3 md:py-1">Không xác định</Tag>;
    }
  };

  const handleBookingClick = () => {
    if (facility) {
      navigate(`/user/booking/${facility.id}`);
    }
  };

  const toggleFavorite = () => {
    // Check if user is authenticated and has player role
    if (!isAuthenticated || user?.role !== 'player') {
      // Show login modal if not authenticated
      dispatch(showLoginModal({ path: `/facility/${facilityId}`, role: 'player' }));
      message.info('Vui lòng đăng nhập với vai trò người chơi để thêm cơ sở vào danh sách yêu thích');
      return;
    }

    // If authenticated, show confirmation modal
    setConfirmModalType(isFavorite ? 'remove' : 'add');
    setConfirmModalVisible(true);
  };

  const handleConfirmFavorite = async () => {
    if (!facilityId) return;

    try {
      if (isFavorite) {
        // Remove from favorites
        await facilityService.removeFavoriteFacility(facilityId);
        setIsFavorite(false);
        message.success('Đã xóa khỏi danh sách yêu thích');
      } else {
        // Add to favorites
        await facilityService.addFavoriteFacility(facilityId);
        setIsFavorite(true);
        message.success('Đã thêm vào danh sách yêu thích');
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      message.error('Có lỗi xảy ra. Vui lòng thử lại sau');
    } finally {
      setConfirmModalVisible(false);
    }
  };

  const handleMessageClick = async () => {
    // Kiểm tra đăng nhập
    if (!isAuthenticated || user?.role !== 'player') {
      dispatch(showLoginModal({ path: `/facility/${facilityId}`, role: 'player' }));
      message.info('Vui lòng đăng nhập với vai trò người chơi để nhắn tin với chủ sở hữu');
      return;
    }

    if (!facility?.owner?.id) {
      message.error('Không thể tìm thấy thông tin chủ sở hữu');
      return;
    }

    try {
      // Lấy danh sách conversation từ API
      message.loading({ content: 'Đang kiểm tra...', key: 'chatCheck' });
      const conversationsData = await ChatService.getConversations();
      
      // Kiểm tra xem đã có conversation với owner chưa
      const existingConversation = conversationsData.find(conv => 
        !conv.isGroup && 
        conv.participants.some(p => p.person?.id === facility.owner?.id)
      );

      if (existingConversation) {
        // Nếu đã có conversation, chọn conversation đó
        message.success({ content: 'Đã mở cuộc trò chuyện', key: 'chatCheck' });
        
        // Đầu tiên mở chat widget
        dispatch(openChatWidget());
        
        // Đặt active conversation sau một khoảng thời gian ngắn
        setTimeout(() => {
          dispatch(setActiveConversation(existingConversation.id));
        }, 200);
      } else {
        // Nếu chưa có, tạo conversation mới
        message.loading({ content: 'Đang kết nối...', key: 'chatCheck' });
        try {
          const conversation = await ChatService.createConversation(facility.owner.id);
          message.success({ content: 'Đã kết nối với chủ sở hữu', key: 'chatCheck' });
          
          // Cập nhật lại danh sách conversations
          await ChatService.getConversations();
          
          // Mở chat widget
          dispatch(openChatWidget());
          
          // Đặt conversation mới làm active sau một khoảng thời gian ngắn
          setTimeout(() => {      
            if (conversation && conversation.id) {
              dispatch(setActiveConversation(conversation.id));
            }
          }, 200);
        } catch (createError) {
          console.error('Error creating conversation:', createError);
          message.error({ 
            content: 'Không thể tạo cuộc trò chuyện mới. Vui lòng thử lại sau.', 
            key: 'chatCheck' 
          });
        }
      }
    } catch (error) {
      console.error('Error handling chat:', error);
      message.error({ 
        content: 'Không thể kết nối với chủ sở hữu. Vui lòng thử lại sau.', 
        key: 'chatCheck' 
      });
    }
  };

  // Define breadcrumb items
  const breadcrumbItems = [
    {
      title: <Link to="/">Trang chủ</Link>,
    },
    {
      title: <Link to="/result-search">Tìm kiếm</Link>,
    },
    {
      title: 'Thông tin cơ sở',
    },
  ];

  // Define tab items
  const tabItems = [
    {
      key: 'general',
      label: 'Thông tin chung',
    },
    {
      key: 'fields',
      label: 'Sân chơi',
    },
    {
      key: 'services',
      label: 'Dịch vụ',
    },
    {
      key: 'events',
      label: 'Sự kiện & Giải đấu',
    },
    {
      key: 'vouchers',
      label: 'Voucher',
    },
  ];

  if (loading) {
    return (
      <div className="w-full px-4 py-6 flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !facility) {
    return (
      <div className="w-full px-4 py-6 flex flex-col justify-center items-center min-h-screen">
        <Empty description={error || "Không tìm thấy thông tin cơ sở"} />
        <Button 
          type="primary" 
          className="mt-4"
          onClick={() => navigate('/')}
        >
          Quay lại trang tìm kiếm
        </Button>
      </div>
    );
  }

  // Render the events tab content with fixed type reference
  const renderEventsTab = () => (
    <div>
      <Title level={4} className="mb-3 md:mb-4 text-lg md:text-xl">Sự kiện & Giải đấu</Title>
      {events.length > 0 ? (
        <List
          itemLayout="vertical"
          dataSource={events}
          renderItem={event => (
            <Card 
              className="mb-4 overflow-hidden" 
              cover={
                <div className="relative h-48">
                  <img 
                    alt={event.name} 
                    src={event.image?.[0] || 'https://via.placeholder.com/800x400'} 
                    className="w-full h-full object-cover"
                  />
                  {event.image && event.image.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      +{event.image.length - 1} ảnh
                    </div>
                  )}
                </div>
              }
            >
              <div className="flex justify-between items-start mb-2">
                <Title level={4} className="m-0 text-base md:text-lg">{event.name}</Title>
                <Tag color={
                  event.status === 'active' ? 'green' : 
                  event.status === 'upcoming' ? 'blue' : 
                  'default'
                }>
                  {event.status === 'active' ? 'Đang diễn ra' : 
                    event.status === 'upcoming' ? 'Sắp diễn ra' : 
                    'Đã kết thúc'}
                </Tag>
              </div>
              
              <Paragraph className="text-sm text-gray-600 mb-3">
                {event.description}
              </Paragraph>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                <div className="flex items-center">
                  <CalendarOutlined className="mr-2 text-blue-500" />
                  <Text className="text-sm">
                    {dayjs(event.startDate).format('DD/MM/YYYY')} - {dayjs(event.endDate).format('DD/MM/YYYY')}
                  </Text>
                </div>
                
                {event.eventType === 'TOURNAMENT' && event.currentParticipants !== undefined && event.maxParticipants !== undefined && (
                  <div className="flex items-center">
                    <UserOutlined className="mr-2 text-blue-500" />
                    <Text className="text-sm">
                      {event.currentParticipants}/{event.maxParticipants} đã đăng ký
                    </Text>
                  </div>
                )}
              </div>
              
              {event.eventType === 'TOURNAMENT' && event.prizes && event.prizes.length > 0 && (
                <div className="mb-3">
                  <Text strong className="block mb-2">Giải thưởng:</Text>
                  <ul className="list-disc pl-5 text-sm">
                    {event.prizes.map((prize, index) => (
                      <li key={index}>
                        <Text>Hạng {prize.position}: {prize.prize}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          )}
        />
      ) : (
        <Empty description="Hiện tại chưa có sự kiện hoặc giải đấu nào" />
      )}
    </div>
  );

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Section 1: Breadcrumb, Facility Name, Status, and Images */}
        <section className="mb-6 md:mb-8">
          <Breadcrumb items={breadcrumbItems} className="mb-3 md:mb-4" />

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <Title level={2} className="m-0 text-xl md:text-2xl lg:text-3xl">{facility.name}</Title>
            {getStatusTag(facility.status)}
          </div>
          <div>              
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Button 
                type="default"
                icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }}/> : <HeartOutlined />}
                onClick={toggleFavorite}
                className={isFavorite ? "border-red-400 text-red-500 hover:text-red-600 hover:border-red-500" : ""}
              >
                {isFavorite ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
              </Button>
              <Button 
                type="default"
                icon={<MessageOutlined />}
                onClick={handleMessageClick}
              >
                Nhắn tin
              </Button>                
            </div>
          </div>

          {/* Thay đổi layout hiển thị hình ảnh */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 md:items-end">
            {/* Main image - ảnh chính */}            
            <div className="relative w-full md:w-3/4" style={{ display: 'block' }}>
              <div className="w-full h-full" style={{ display: 'block' }}>
                <Image
                  src={mainImage || 'https://via.placeholder.com/800x400'}
                  alt={facility.name}
                  className="w-full rounded-lg"
                  style={{ 
                    height: '80vh', 
                    maxHeight: '500px',
                    objectFit: 'cover',
                    display: 'block' // Ghi đè inline-block từ Ant Design
                  }}
                  preview={{
                    mask: <div className="flex items-center justify-center"><ExpandOutlined /> Xem ảnh lớn</div>,
                    toolbarRender: () => null,
                  }}
                />
              </div>
            </div>
                        
            {/* Thumbnail gallery - các ảnh nhỏ */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-1/4">
              {facility && facility.imagesUrl && facility.imagesUrl.length > 0 ? (
                facility.imagesUrl.map((image, index) => (
                  <div 
                    key={index} 
                    className={`relative cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 ${mainImage === image ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => handleImageClick(image)}
                    style={{ width: '100px' }}
                  >
                    <Image
                      src={image}
                      alt={`${facility.name} ${index + 1}`}
                      className="rounded-lg"
                      style={{ 
                        width: '100%', 
                        height: '60px',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      preview={false}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center w-full">
                  <Text className="text-gray-500">Không có hình ảnh</Text>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Main Content with Tabs */}
        <section className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-3">
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              className="w-full md:w-auto"
              size="middle"
              items={tabItems}
            />
            <Button 
              type="primary" 
              size="middle" 
              onClick={handleBookingClick}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Đặt sân ngay
            </Button>
          </div>

          <div className="bg-white p-3 md:p-6 rounded-lg shadow-md">
            {activeTab === 'general' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Thông tin cơ bản - khối thông tin ngắn */}
                  <Card 
                    title={<div className="flex items-center"><InfoCircleOutlined className="mr-2 text-blue-600" /> Thông tin cơ sở</div>}
                    className="h-full shadow-sm hover:shadow-md transition-shadow"
                  >
                    <ul className="list-none p-0 m-0 space-y-3">
                      <li className="flex items-center">
                        <FieldTimeOutlined className="text-blue-600 mr-3" />
                        <div>
                          <Text strong>Giờ hoạt động:</Text>
                          <div>
                            {facility.openTime1 && facility.closeTime1 && (
                              <Text className="block">{facility.openTime1.substring(0, 5)} - {facility.closeTime1.substring(0, 5)}</Text>
                            )}
                            {facility.numberOfShifts > 1 && facility.openTime2 && facility.closeTime2 && (
                              <Text className="block">{facility.openTime2.substring(0, 5)} - {facility.closeTime2.substring(0, 5)}</Text>
                            )}
                            {facility.numberOfShifts > 2 && facility.openTime3 && facility.closeTime3 && (
                              <Text className="block">{facility.openTime3.substring(0, 5)} - {facility.closeTime3.substring(0, 5)}</Text>
                            )}
                          </div>
                        </div>
                      </li>
                      <Divider className="my-2" />
                      <li className="flex items-center">
                        <DollarOutlined className="text-blue-600 mr-3" />
                        <div>
                          <Text strong>Giá dao động:</Text>
                          <div>
                            <Text className="block">{facility.minPrice?.toLocaleString() || '100,000'}đ - {facility.maxPrice?.toLocaleString() || '150,000'}đ</Text>
                          </div>
                        </div>
                      </li>
                      <Divider className="my-2" />
                      <li>
                        <div className="flex flex-wrap gap-2">
                          <Text strong className="mr-2 whitespace-nowrap">Môn thể thao:</Text>
                          {fieldGroups && fieldGroups.length > 0 && fieldGroups.some(group => group.sports && group.sports.length > 0) ? (
                            // Collect unique sports from all field groups
                            [...new Set(
                              fieldGroups
                                .filter(group => group.sports && group.sports.length > 0)
                                .flatMap(group => group.sports || [])
                                .map(sport => JSON.stringify(sport))
                            )]
                            .map(sportStr => {
                              const sport = JSON.parse(sportStr);
                              return (
                                <Tag key={sport.id} color="blue" className="px-2 py-0.5 text-sm rounded-full">
                                  {getSportNameInVietnamese(sport.name)}
                                </Tag>
                              );
                            })
                          ) : (
                            <Text className="text-gray-500">Chưa có môn thể thao</Text>
                          )}
                        </div>
                      </li>
                    </ul>
                  </Card>

                  {/* Mô tả - khối thông tin dài */}
                  <Card 
                    title={<div className="flex items-center"><CommentOutlined className="mr-2 text-blue-600" /> Mô tả cơ sở</div>}
                    className="h-full shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Paragraph className="text-sm md:text-base text-justify whitespace-pre-line">
                      {facility.description}
                    </Paragraph>
                    
                    <Divider className="my-3" />
                    
                    <div className="flex items-center mt-3">
                      <EnvironmentOutlined className="text-blue-600 mr-3" />
                      <div>
                        <Text strong>Địa chỉ:</Text>
                        <div>
                          <Text className="block">{facility.location}</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'fields' && (
              <div>
                <Title level={4} className="mb-3 md:mb-4 text-lg md:text-xl flex items-center">
                  <FieldTimeOutlined className="mr-2 text-blue-600" /> Danh sách sân
                </Title>
                {fieldGroups.length > 0 ? (
                  <Row gutter={[16, 16]}>
                    {fieldGroups.map(group => (
                      <Col xs={24} key={group.id}>
                        <Card 
                          className="shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                          title={
                            <div className="flex justify-between items-center">
                              <span className="text-base md:text-lg font-medium">{group.name}</span>
                              <Tag color="blue">{group.fields.length} sân</Tag>
                            </div>
                          }
                        >
                          {/* Group information displayed once */}
                          <div className="mb-4 p-3 md:p-4 bg-blue-50 rounded-lg">
                            <Row gutter={[16, 16]}>
                              <Col xs={24} md={12}>
                                <div className="flex items-center mb-2">
                                  <InfoCircleOutlined className="text-blue-600 mr-2" />
                                  <Text strong>Thông tin chung:</Text>
                                </div>
                                <ul className="list-disc pl-5 space-y-1">
                                  <li><Text>Bề mặt: {group.surface}</Text></li>
                                  <li><Text>Kích thước: {group.dimension}</Text></li>
                                </ul>
                              </Col>
                              <Col xs={24} md={12}>
                                <div className="flex items-center mb-2">
                                  <DollarOutlined className="text-blue-600 mr-2" />
                                  <Text strong>Thông tin giá:</Text>
                                </div>
                                <div className="bg-white p-2 rounded-md">
                                  <div className="flex justify-between items-center">
                                    <Text>Giá cơ bản:</Text>
                                    <Text className="text-blue-600 font-semibold">{group.basePrice.toLocaleString()}đ/giờ</Text>
                                  </div>
                                  {group.priceIncrease1 && group.priceIncrease1 > 0 && (
                                    <div className="flex justify-between items-center mt-1">
                                      <Text>Giờ cao điểm:</Text>
                                      <Text className="text-red-500 font-semibold">+{group.priceIncrease1.toLocaleString()}đ/giờ</Text>
                                    </div>
                                  )}
                                  {group.peakStartTime1 && group.peakEndTime1 && (
                                    <div className="flex justify-between items-center mt-1">
                                      <Text>Thời gian cao điểm:</Text>
                                      <Text>{group.peakStartTime1.substring(0, 5)} - {group.peakEndTime1.substring(0, 5)}</Text>
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </div>
                          
                          <div className="p-2">
                            <Button 
                              type="link" 
                              className="w-full text-blue-600 hover:text-blue-800 mb-3 flex items-center justify-center"
                              onClick={() => toggleGroupExpansion(group.id)}
                              icon={expandedGroups[group.id] ? <UpOutlined /> : <DownOutlined />}
                            >
                              {expandedGroups[group.id] ? 'Thu gọn danh sách sân' : 'Xem danh sách sân'}
                            </Button>
                            
                            {expandedGroups[group.id] && (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                {group.fields.map(field => (
                                  <Card
                                    key={field.id}
                                    className={`hover:shadow-md transition-all ${field.status === 'active' ? 'border-green-200' : 'border-red-100'}`}
                                    size="small"
                                    title={
                                      <div className="flex items-center justify-between">
                                        <Text strong>{field.name}</Text>
                                        <Tag color={field.status === 'active' ? 'success' : 'error'}>
                                          {field.status === 'active' ? 'Đang hoạt động' : 'Đang đóng'}
                                        </Tag>
                                      </div>
                                    }
                                  >
                                  </Card>
                                ))}
                              </div>
                            )}
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty description="Không có thông tin sân" />
                )}
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <Title level={4} className="mb-3 md:mb-4 text-lg md:text-xl flex items-center">
                  <DollarOutlined className="mr-2 text-blue-600" /> Dịch vụ
                </Title>
                {services.length > 0 ? (
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                    dataSource={services}
                    renderItem={service => (
                      <List.Item>
                        <Card 
                          hoverable
                          className="h-full shadow-sm hover:shadow-md transition-shadow flex flex-col"
                          style={{ height: '100%' }}
                        >
                          <div className="mb-3 border-b pb-3">
                            <div className="flex justify-between items-center mb-2">
                              <Text strong className="text-lg line-clamp-1 " title={service.name}>{service.name}</Text>
                              <Tag color="blue" className="font-bold whitespace-nowrap">
                                {service.price.toLocaleString()}đ
                              </Tag>
                            </div>
                            
                            {service.sport && (
                              <Tag color="cyan" className="mb-2">
                                {getSportNameInVietnamese(service.sport.name)}
                              </Tag>
                            )}
                          </div>

                          <div className="mb-3 flex-grow">
                            <p className="text-gray-600 text-sm line-clamp-2 h-10" title={service.description}>
                              {service.description}
                            </p>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-2 border-t">
                            <div>
                              <div>Đơn vị: {service.unit}</div>
                              <div>Đã đặt: {service.bookedCount || 0}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-green-600">
                                Còn lại: {service.amount - (service.bookedCount || 0)}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                ) : (
                  <Empty description="Không có thông tin dịch vụ" />
                )}
              </div>
            )}

            {activeTab === 'events' && renderEventsTab()}

            {activeTab === 'vouchers' && (
              <div>
                <Title level={4} className="mb-3 md:mb-4 text-lg md:text-xl">Voucher</Title>
                {vouchers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vouchers.map(voucher => (
                      <Card 
                        key={voucher.id}
                        className="bg-gradient-to-r from-blue-50 to-white border border-blue-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <Title level={4} className="text-base md:text-lg m-0">{voucher.name}</Title>
                          <Tag color="blue" className="text-xs font-bold px-2">
                            {voucher.remain} còn lại
                          </Tag>
                        </div>
                        
                        <div className="mb-3">
                          <Tag color="gold" className="mb-2">Mã: {voucher.code}</Tag>
                          <div className="flex items-center mb-1">
                            <Text strong className="text-lg md:text-xl text-red-500">
                              {voucher.voucherType === 'percent' 
                                ? `-${voucher.discount}%` 
                                : `-${voucher.discount.toLocaleString()}đ`}
                            </Text>
                            {voucher.voucherType === 'percent' && voucher.maxDiscount > 0 && (
                              <Text className="ml-2 text-xs text-gray-500">
                                (Tối đa {voucher.maxDiscount.toLocaleString()}đ)
                              </Text>
                            )}
                          </div>
                          <Text className="text-xs block text-gray-600">
                            Đơn tối thiểu {voucher.minPrice.toLocaleString()}đ
                          </Text>
                        </div>
                        
                        <div className="mt-2">
                          <Text className="text-xs text-gray-500">
                            Hạn sử dụng: {dayjs(voucher.endDate).format('DD/MM/YYYY')}
                          </Text>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Empty description="Hiện tại chưa có voucher nào" />
                )}
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Reviews */}
        <section className="mb-6 md:mb-8 max-h-[2000px] overflow-y-auto">
          <Card className="shadow-md overflow-hidden">
            {/* Review header section */}
            <div className="bg-gradient-to-r from-blue-50 to-white p-4 mb-6 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Rating Summary */}
                <div className="text-center p-4 bg-white rounded-lg shadow-sm mx-auto md:mx-0" style={{maxWidth: '200px'}}>
                  <Title level={1} className="m-0 text-blue-600 text-3xl md:text-5xl">{facility.avgRating.toFixed(1)}</Title>
                  <Rate disabled defaultValue={facility.avgRating} allowHalf className="my-2" />
                  <Text className="block mt-1 md:mt-2 text-sm text-gray-500">{facility.numberOfRating || 0} đánh giá</Text>
                </div>
                
                {/* Rating Distribution */}
                <div className="flex-1 w-full">
                  <Title level={4} className="mb-3 text-base md:text-lg text-center md:text-left">Đánh giá từ người chơi</Title>
                  
                  <div className="flex flex-col gap-3 max-w-lg mx-auto md:mx-0">
                    {[5, 4, 3, 2, 1].map(star => {
                      const count = reviews.filter(review => Math.floor(review.rating) === star).length;
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <div className="flex items-center w-16 md:w-20">
                            <Text className="mr-1 font-medium">{star}</Text>
                            <StarOutlined className="text-yellow-400 text-sm" />
                          </div>
                          <div className="flex-1 bg-gray-100 rounded-full h-2 md:h-3">
                            <div 
                              className="bg-yellow-400 h-2 md:h-3 rounded-full transition-all duration-300" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <Text className="w-8 md:w-12 text-right text-gray-500 text-xs md:text-sm">{count}</Text>
                          <Text className="w-12 md:w-16 text-right text-gray-500 text-xs md:text-sm">({percentage.toFixed(0)}%)</Text>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews filter/sort section */}
            <div className="mb-6 border-b pb-4">
              <Title level={4} className="mb-4 text-lg md:text-xl flex items-center">
                <CommentOutlined className="mr-2" />
                Tất cả đánh giá
              </Title>
            </div>

            {/* Reviews list */}
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <Avatar 
                        src={review.booking.player.avatarUrl}
                        size={{ xs: 48, sm: 56 }}
                        icon={<UserOutlined />} 
                        className="mt-1 mx-auto sm:mx-0"
                      />
                      <div className="flex-1 w-full">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <div className="w-full sm:w-auto">
                            <Text strong className="text-base block text-center sm:text-left">{review.booking.player.name}</Text>
                            <div className="flex items-center gap-2 my-1 justify-center sm:justify-start">
                              <Rate disabled defaultValue={review.rating} className="text-sm" />
                              <Text type="secondary" className="text-xs">
                                {dayjs(review.reviewAt).format('DD/MM/YYYY HH:mm')}
                              </Text>
                            </div>                            
                          </div>
                        </div>
                        
                        <Paragraph className="text-base mb-3">{review.comment}</Paragraph>
                        
                        {review.imageUrl && review.imageUrl.length > 0 && (
                          <div className="flex flex-wrap mt-2 mb-4 gap-2 overflow-x-auto pb-2">
                            {review.imageUrl.map((image, index) => (
                              <Image
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                width={100}
                                height={100}
                                className="rounded-md object-cover"
                              />
                            ))}
                          </div>
                        )}
                        
                        {review.feedback && (
                          <div className="mt-4">
                            <div 
                              className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 mb-2 justify-center sm:justify-start"
                              onClick={() => toggleReplyVisibility(review.id.toString())}
                            >
                              {visibleReplies[review.id.toString()] ? (
                                <div className="flex items-center">
                                  <UserOutlined className="mr-1" />
                                  <Text className="text-blue-600">Ẩn phản hồi từ {facility.name}</Text>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <UserOutlined className="mr-1" />
                                  <Text className="text-blue-600">Xem phản hồi từ {facility.name}</Text>
                                </div>
                              )}
                            </div>
                            
                            {visibleReplies[review.id.toString()] && (
                              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-400 ml-0 sm:ml-2">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                  <Text strong className="text-sm text-blue-600">{facility.name}</Text>
                                  <Text type="secondary" className="text-xs mt-1 sm:mt-0">
                                    {dayjs(review.feedbackAt).format('DD/MM/YYYY HH:mm')}
                                  </Text>
                                </div>
                                <Paragraph className="text-sm m-0">{review.feedback}</Paragraph>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty 
                description="Chưa có đánh giá nào" 
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                className="my-12" 
              />
            )}
          </Card>
        </section>

         {/* Google Maps */}
          <section>
            <div className="mt-4">
              <Divider orientation="left" plain>
                <Text strong className="text-blue-600 text-xl">Bản đồ tại địa điểm của cơ sở</Text>
              </Divider>
              <div className="mt-4">
                 {facility.id && (
                  <MapLocation 
                    location={facility.location} 
                    {...getMockCoordinates(facility.id)} 
                     zoom={16}
                    />
                 )}
              </div>
            </div>
          </section>
      </div>

      {/* Confirmation Modal for Add/Remove Favorite */}
      <Modal
        title={confirmModalType === 'add' ? "Thêm vào danh sách yêu thích" : "Xóa khỏi danh sách yêu thích"}
        open={confirmModalVisible}
        onOk={handleConfirmFavorite}
        onCancel={() => setConfirmModalVisible(false)}
        okText={confirmModalType === 'add' ? "Thêm" : "Xóa"}
        cancelText="Hủy"
        okButtonProps={{ 
          danger: confirmModalType === 'remove',
          type: confirmModalType === 'add' ? 'primary' : 'default'
        }}
      >
        <p>
          {confirmModalType === 'add' 
            ? `Bạn có chắc chắn muốn thêm "${facility?.name}" vào danh sách yêu thích không?` 
            : `Bạn có chắc chắn muốn xóa "${facility?.name}" khỏi danh sách yêu thích không?`}
        </p>
      </Modal>
    </div>
  );
};

export default DetailFacility;