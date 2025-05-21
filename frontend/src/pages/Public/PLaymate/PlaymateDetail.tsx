import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PlaymateSearch, SkillLevel, PlaymateApplicationFormData, PlaymateActionRequest, ApplicationStatus } from '@/types/playmate.type';
import playmateService from '@/services/playmate.service';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { getSportNameInVietnamese } from '@/utils/translateSport';
import ChatService from '@/services/chat.service';
import { openChatWidget, setActiveConversation } from '@/store/slices/chatSlice';
import { useSocketService } from '@/hooks/useSocketService';
import PlaymateEdit from '../../Player/Playmate/PlaymateEdit';

import {
  Card,
  Typography,
  Button,
  Space,
  Tag,
  Divider,
  Breadcrumb,
  Avatar,
  Modal,
  Form,
  Select,
  Input,
  message,
  Spin,
  Result,
  Image,
  Tabs,
  List,
  Empty
} from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
  TeamOutlined,
  MoneyCollectOutlined,
  TrophyOutlined,
  ExpandOutlined,
  InfoCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  EditOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const PlaymateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = useSelector((state: RootState) => state.user.user);
  const [activeTab, setActiveTab] = useState('general');
  const socketService = useSocketService();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [playmateSearch, setPlaymateSearch] = useState<PlaymateSearch | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [mainImage, setMainImage] = useState<string>('');
  const [processingIds, setProcessingIds] = useState<string[]>([]);
  const [creatingChat, setCreatingChat] = useState<boolean>(false);
  const [chatCreated, setChatCreated] = useState<boolean>(false);
  const [chatTitleModalVisible, setChatTitleModalVisible] = useState<boolean>(false);
  const [chatTitle, setChatTitle] = useState<string>('');
  const [titleForm] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  // Extract the fetch playmate search logic into a named function
  const fetchPlaymateSearch = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await playmateService.getPlaymateSearchById(id);
      
      if (!data) {
        setError('Không tìm thấy bài đăng.');
        return;
      }
      
      setPlaymateSearch(data);
      
      // Set main image if available
      if (data.image && data.image.length > 0) {
        setMainImage(data.image[0]);
      }

      // Check if chat has already been created for this playmate
      checkChatCreationStatus(id);
    } catch (error) {
      console.error('Error fetching playmate search:', error);
      setError('Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch playmate search data
  useEffect(() => {
    fetchPlaymateSearch();
  }, [id]);

  // Check if a chat has already been created for this playmate
  const checkChatCreationStatus = (playmateId: string) => {
    try {
      // Get the list of playmateIds that have had chat created
      const chatCreatedPlaymates = JSON.parse(localStorage.getItem('playmateChats') || '[]');
      // Check if this playmate ID is in the list
      if (chatCreatedPlaymates.includes(playmateId)) {
        setChatCreated(true);
      }
    } catch (error) {
      console.error('Error checking chat creation status:', error);
    }
  };

  // Check if user has already applied
  const hasApplied = playmateSearch?.participants?.some(app => app.playerId === user?.id);
  
  // Check if the search is created by current user
  const isOwner = playmateSearch?.userId === user?.id;
  
  // Check if the search is full - count only accepted participants (not including creator)
  const acceptedParticipants = playmateSearch?.participants ? 
    playmateSearch.participants.filter(p => p.status === 'accepted').length : 0;
  
  const currentCount = acceptedParticipants; // Don't count creator in participants
  
  const isFull = playmateSearch && 
    currentCount >= playmateSearch.numberOfParticipants;

  // Check if the search is active
  const isActive = playmateSearch?.status === true;
  
  // Check if the date has passed
  const isPastDate = playmateSearch && new Date(playmateSearch.date) < new Date();
  
  // Overall status determination (open or closed)
  const isOpen = playmateSearch ? (isActive && !isPastDate && !isFull) : false;
  
  // Check if there are enough accepted participants to create a chat group
  const acceptedParticipantsCount = playmateSearch?.participants ? 
    playmateSearch.participants.filter(p => p.status === 'accepted').length : 0;
  
  const canCreateChatGroup = isOwner && 
    playmateSearch !== null &&
    typeof playmateSearch.numberOfParticipants === 'number' &&
    acceptedParticipantsCount >= playmateSearch.numberOfParticipants && 
    !chatCreated;
  
  // When component mounts or playmateSearch updates, set default chat title
  useEffect(() => {
    if (playmateSearch) {
      setChatTitle(`${playmateSearch.title} - Nhóm chat`);
    }
  }, [playmateSearch]);
  
  // Show application modal
  const showModal = () => {
    if (!user) {
      message.warning('Vui lòng đăng nhập để đăng ký tham gia');
      return;
    }
    setIsModalVisible(true);
  };
  
  // Close application modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  
  // Handle application form submission
  const handleApply = async (values: { skillLevel: string; position?: string; note?: string }) => {
    if (!playmateSearch || !id || !user) return;
    
    try {
      setSubmitting(true);
      
      const applicationData: PlaymateApplicationFormData = {
        playmateId: id,
        skillLevel: values.skillLevel,
        position: values.position || "",
        note: values.note
      };
      
      await playmateService.createApplication(applicationData);
      
      message.success('Đăng ký thành công!');
      setIsModalVisible(false);
      
      // Reload data to show updated application status
      const updatedData = await playmateService.getPlaymateSearchById(id);
      setPlaymateSearch(updatedData || null);
    } catch (error) {
      console.error('Error applying to playmate search:', error);
      message.error('Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Get cost display
  const getCostDisplay = () => {
    if (!playmateSearch) return null;
    
    const costType = playmateSearch.costType;
    
    if (!costType || costType === 'free') {
      return <Tag color="success">Miễn phí</Tag>;
    }
           
    if ((costType === 'total') && playmateSearch.price) {
      return <Text strong >Tổng chi phí: <span className="text-red-500">{playmateSearch.price.toLocaleString('vi-VN')}đ</span></Text>;
    }
    
    if (costType === 'gender') {
      return (
        <Space direction="vertical" size={0}>
          {playmateSearch.costMale && (
            <Text strong style={{ color: '#1890ff' }}>Nam: {playmateSearch.costMale.toLocaleString('vi-VN')}đ</Text>
          )}
          {playmateSearch.costFemale && (
            <Text strong style={{ color: '#eb2f96' }}>Nữ: {playmateSearch.costFemale.toLocaleString('vi-VN')}đ</Text>
          )}
        </Space>
      );
    }
    
    return null;
  };
  
  // Format date time
  const formatDate = (date: string) => {
    return moment(date).format('DD/MM/YYYY');
  };
  
  // Handle thumbnail click
  const handleImageClick = (image: string) => {
    setMainImage(image);
  };
  
  // Handle accepting application
  const handleAcceptApplication = async (playerId: string, playmateId: string) => {
    const idKey = `${playerId}-${playmateId}`;
    setProcessingIds(prev => [...prev, idKey]);
    
    try {
      const actionRequest: PlaymateActionRequest = {
        playerId,
        playmateId
      };
      
      const success = await playmateService.acceptApplication(actionRequest);
      if (success) {
        message.success('Đã chấp nhận đơn đăng ký thành công!');
        
        // Refresh the data
        if (id) {
          const updatedData = await playmateService.getPlaymateSearchById(id);
          setPlaymateSearch(updatedData || null);
        }
      }
    } catch (err) {
      console.error('Error accepting application:', err);
      message.error('Có lỗi xảy ra khi chấp nhận đơn đăng ký.');
    } finally {
      setProcessingIds(prev => prev.filter(item => item !== idKey));
    }
  };
  
  // Handle rejecting application
  const handleRejectApplication = async (playerId: string, playmateId: string) => {
    const idKey = `${playerId}-${playmateId}`;
    setProcessingIds(prev => [...prev, idKey]);
    
    try {
      const actionRequest: PlaymateActionRequest = {
        playerId,
        playmateId
      };
      
      const success = await playmateService.rejectApplication(actionRequest);
      if (success) {
        message.success('Đã từ chối đơn đăng ký thành công!');
        
        // Refresh the data
        if (id) {
          const updatedData = await playmateService.getPlaymateSearchById(id);
          setPlaymateSearch(updatedData || null);
        }
      }
    } catch (err) {
      console.error('Error rejecting application:', err);
      message.error('Có lỗi xảy ra khi từ chối đơn đăng ký.');
    } finally {
      setProcessingIds(prev => prev.filter(item => item !== idKey));
    }
  };
  
  // Get skill level display
  const getSkillLevelDisplay = (level: SkillLevel) => {
    switch (level) {
      case 'newbie':
        return 'Mới bắt đầu';
      case 'intermediate':
        return 'Trung cấp';
      case 'advance':
        return 'Nâng cao';
      case 'professional':
        return 'Chuyên nghiệp';
      case 'any':
        return 'Mọi trình độ';
      default:
        return level;
    }
  };
  
  // Get gender preference display
  const getGenderPreferenceDisplay = (preference?: string) => {
    if (!preference) return 'Không giới hạn';
    
    switch (preference) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      default:
        return 'Không giới hạn';
    }
  };
  
  // Get status tag
  const getStatusTag = () => {
    if (isActive === false) return <Tag color="red">Đã đóng</Tag>;
    if (isPastDate) return <Tag color="orange">Đã hết hạn</Tag>;
    if (isFull) return <Tag color="purple">Đã đủ người</Tag>;
    return <Tag color="green">Đang mở</Tag>;
  };
  
  // Get type tag
  const getTypeTag = () => {
    if (!playmateSearch) return null;
    
    return playmateSearch.playmateSearchType === 'individual' ? 
      <Tag color="blue">Cá nhân</Tag> : 
      <Tag color="purple">Nhóm</Tag>;
  };
  
  // Get application status color
  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  // Get application status text
  const getStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case 'accepted':
        return 'Đã chấp nhận';
      case 'rejected':
        return 'Đã từ chối';
      case 'pending':
        return 'Đang xét duyệt';
      default:
        return 'Không xác định';
    }
  };
  
  // Show chat title modal instead of directly creating chat
  const showChatTitleModal = () => {
    if (!playmateSearch) return;
    
    // Set default title
    titleForm.setFieldsValue({
      chatTitle: `${playmateSearch.title} - Nhóm chat`
    });
    
    setChatTitleModalVisible(true);
  };
  
  // Handle creating chat group
  const handleCreateChatGroup = async (values: { chatTitle: string }) => {
    if (!playmateSearch || !id || !user || !playmateSearch.participants) return;
    
    try {
      setCreatingChat(true);
      setChatTitleModalVisible(false); // Close modal
      
      message.loading({ content: 'Đang tạo nhóm chat...', key: 'createChat' });
      
      // Get participants with accepted status
      const acceptedParticipants = playmateSearch.participants.filter(p => p.status === 'accepted');
      
      // Extract user IDs from accepted participants
      const participantIds = acceptedParticipants.map(p => p.playerId);
      
      // Determine if we need to create a direct conversation or a group conversation
      let conversation;
      
      if (acceptedParticipants.length === 1) {
        // Create a direct conversation with the one participant
        conversation = await ChatService.createConversation(participantIds[0]);
        message.success({ content: 'Đã tạo cuộc hội thoại với người tham gia', key: 'createChat' });
      } else {
        // Create a group conversation with all participants
        // Use the title from the form or default
        const groupTitle = values.chatTitle.trim() || `${playmateSearch.title} - Nhóm chat`;
        conversation = await ChatService.createGroupConversation(groupTitle, participantIds);
        message.success({ content: 'Đã tạo nhóm chat thành công', key: 'createChat' });
      }
      
      // Mark as created
      setChatCreated(true);

      // Save the playmate ID to localStorage to remember that a chat has been created
      try {
        const chatCreatedPlaymates = JSON.parse(localStorage.getItem('playmateChats') || '[]');
        if (!chatCreatedPlaymates.includes(id)) {
          chatCreatedPlaymates.push(id);
          localStorage.setItem('playmateChats', JSON.stringify(chatCreatedPlaymates));
        }
      } catch (error) {
        console.error('Error saving chat creation status:', error);
      }
      
      // Open the chat widget and set the active conversation
      dispatch(openChatWidget());
      setTimeout(() => {
        dispatch(setActiveConversation(conversation.id));
      }, 200);
      
    } catch (error) {
      console.error('Error creating chat group:', error);
      message.error({ content: 'Không thể tạo nhóm chat. Vui lòng thử lại sau.', key: 'createChat' });
    } finally {
      setCreatingChat(false);
    }
  };
  
  // Listen for socket events, including join-conversation
  useEffect(() => {
    // Only set up listeners if the user is the owner
    if (isOwner && socketService) {
      console.log('Setting up socket listeners for playmate owner');
      
      // Check for existing conversations and whether a chat has been created
      const refreshConversations = async () => {
        try {
          const conversations = await ChatService.getConversations();
          const existingConversation = conversations.find(conv => 
            conv.title?.includes(playmateSearch?.title || '')
          );
          
          if (existingConversation) {
            console.log('Found existing conversation for this playmate:', existingConversation);
            setChatCreated(true);
            
            // Save to localStorage
            try {
              if (id) {
                const chatCreatedPlaymates = JSON.parse(localStorage.getItem('playmateChats') || '[]');
                if (!chatCreatedPlaymates.includes(id)) {
                  chatCreatedPlaymates.push(id);
                  localStorage.setItem('playmateChats', JSON.stringify(chatCreatedPlaymates));
                }
              }
            } catch (error) {
              console.error('Error saving chat creation status:', error);
            }
          }
        } catch (error) {
          console.error('Error checking for existing conversations:', error);
        }
      };
      
      refreshConversations();
      
      // Make sure socket service is properly subscribed to conversations
      socketService.getConversations().subscribe({
        next: (conversations) => {
          console.log('Received updated conversations list via socket:', conversations.length);
        }
      });
    }
    
    return () => {
      // No specific cleanup needed as the subscription is maintained by the service
    };
  }, [isOwner, socketService, playmateSearch, id]);
  
  // Handle edit button click
  const handleEditClick = () => {
    setEditModalVisible(true);
  };

  // Handle edit modal close
  const handleEditModalClose = () => {
    setEditModalVisible(false);
  };

  // Handle edit success
  const handleEditSuccess = () => {
    // Refresh data
    if (id) {
      fetchPlaymateSearch();
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }
  
  // Render error state
  if (error || !playmateSearch) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <Result
            status="404"
            title="Không tìm thấy bài đăng"
            subTitle={error || 'Bài đăng không tồn tại hoặc đã bị xóa.'}
            extra={
              <Button type="primary" onClick={() => navigate('/user/playmate')}>
                Quay lại danh sách
              </Button>
            }
          />
        </div>
      </div>
    );
  }
  
  // Get facility information
  const facilityName = playmateSearch.bookingSlot?.field?.fieldGroup?.facility?.name || 'Chưa có thông tin';
  const facilityLocation = playmateSearch.bookingSlot?.field?.fieldGroup?.facility?.location || 'Chưa có địa chỉ';
  const sportName = playmateSearch.bookingSlot?.booking?.sport?.name 
    ? getSportNameInVietnamese(playmateSearch.bookingSlot.booking.sport.name) 
    : 'Chưa có thông tin';
  
  // No need to define separate tab items as we use inline definition
  
  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Section 1: Breadcrumb, Title, Status */}
        <section className="mb-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-3" items={[
            { title: <Link to="/">Trang chủ</Link> },
            { title: <Link to="/user/playmate">Tìm bạn chơi</Link> },
            { title: "Chi tiết" }
          ]} />
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
            <Title level={2} className="m-0 text-xl md:text-2xl lg:text-3xl">{playmateSearch.title}</Title>
            <div className="flex gap-2">
              {getStatusTag()}
              {getTypeTag()}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mb-4">
            {isOwner && (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEditClick}
                className="mr-3"
              >
                Chỉnh sửa bài đăng
              </Button>
            )}
            {!isOwner && isOpen && (
              <Button 
                type="primary" 
                onClick={showModal}
                disabled={hasApplied || isFull || !isOpen}
                className="mr-3"
              >
                {hasApplied ? 'Đã đăng ký' : (isFull ? 'Đã đủ người' : 'Đăng ký tham gia')}
              </Button>
            )}
          </div>
          
          {/* Main Image */}
          <div className="mb-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-3 md:items-end">
              {/* Main image - ảnh chính */}            
              <div className="relative w-full md:w-3/4" style={{ display: 'block' }}>
                <div className="w-full h-full" style={{ display: 'block' }}>
                  <Image
                    src={mainImage || (playmateSearch.image && playmateSearch.image.length > 0 ? 
                      playmateSearch.image[0] : 'https://res.cloudinary.com/db3dx1dos/image/upload/v1746769804/hyfcz9nb8j3d5q4lfpqp.jpg')}
                    alt={playmateSearch.title}
                    className="w-full rounded-lg"
                    style={{ 
                      height: 'auto', 
                      maxHeight: '500px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    preview={{
                      mask: <div className="flex items-center justify-center"><ExpandOutlined /> Xem ảnh lớn</div>,
                    }}
                  />
                </div>
              </div>
              
              {/* Thumbnail gallery - các ảnh nhỏ */}
              {playmateSearch.image && playmateSearch.image.length > 1 && (
                <div className="flex md:flex-col gap-2 overflow-x-auto w-full md:w-1/4">
                  {playmateSearch.image.map((img, index) => (
                    <div 
                      key={index} 
                      className={`relative cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 
                        ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`}
                      onClick={() => handleImageClick(img)}
                      style={{ width: '120px', height: '80px' }}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        preview={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Section 2: Tab-based content */}
        <section className="mb-6">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            type="card"
            className="playmate-detail-tabs"
            items={[
              {
                key: 'general',
                label: 'Thông tin chung',
                children: (
                  <div className="py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Main Info Card */}
                      <div className="lg:col-span-2">
                        <Card className="shadow-sm h-full">
                          <Title level={4} className="flex items-center">
                            <InfoCircleOutlined className="mr-2 text-blue-600" /> 
                            Thông tin chi tiết
                          </Title>
                          <Divider />
                          
                          {/* Date and Time */}
                          <div className="mb-4">
                            <ul className="list-none p-0 m-0 space-y-3">
                              <li className="flex items-start">
                                <CalendarOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Ngày chơi:</Text>
                                  <Text className="block" style={{ color: '#1890ff' }}>
                                    {formatDate(playmateSearch.date)}
                                  </Text>
                                </div>
                              </li>
                              <Divider className="my-2" />
                              
                              <li className="flex items-start">
                                <ClockCircleOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Thời gian:</Text>
                                  <Text className="block" style={{ color: '#1890ff' }}>
                                    {`${playmateSearch.startTime.substring(0, 5)} - ${playmateSearch.endTime.substring(0, 5)}`}
                                  </Text>
                                </div>
                              </li>
                              <Divider className="my-2" />
                              
                              <li className="flex items-start">
                                <EnvironmentOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Cơ sở:</Text>
                                  <Text className="block" style={{ color: '#722ed1' }}>{facilityName}</Text>
                                </div>
                              </li>
                              <Divider className="my-2" />
                              
                              <li className="flex items-start">
                                <EnvironmentOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Địa chỉ:</Text>
                                  <Text className="block">{facilityLocation}</Text>
                                </div>
                              </li>
                              <Divider className="my-2" />

                              <li className="flex items-start">
                                <EnvironmentOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Sân chơi:</Text>
                                  <Text className="block" style={{ color: '#722ed1' }}>{playmateSearch.bookingSlot?.field?.name || 'Chưa có thông tin'} thuộc {playmateSearch.bookingSlot?.field?.fieldGroup?.name || 'Chưa có thông tin'}</Text>
                                </div>
                              </li>
                              <Divider className="my-2" />
                              
                              <li className="flex items-start">
                                <TrophyOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Môn thể thao:</Text>
                                  <div>
                                    <Tag color="blue" className="mt-1">{sportName}</Tag>
                                  </div>
                                </div>
                              </li>
                              <Divider className="my-2" />
                              
                              <li className="flex items-start">
                                <TeamOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Số lượng tham gia cần thiết để bắt đầu trận đấu:</Text>
                                  <Text className="block" style={{ color: '#fa8c16' }}>
                                    {`${playmateSearch.numberOfParticipants} ${playmateSearch.playmateSearchType === 'group' ? 'nhóm tham gia' : 'người tham gia'}`}
                                  </Text>
                                </div>
                              </li>
                              <Divider className="my-2" />
{/* 
                              <li className="flex items-start">
                                <TeamOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Số lượng có thể tham gia tối đa:</Text>
                                  <Text className="block" style={{ color: '#fa8c16' }}>
                                    {`${playmateSearch.numberOfParticipants} ${playmateSearch.playmateSearchType === 'group' ? 'nhóm tham gia' : 'người tham gia'}`}
                                  </Text>
                                </div>
                              </li>
                              <Divider className="my-2" /> */}

                              <li className="flex items-start">
                                <TeamOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Số người/nhóm đăng ký tham gia:</Text>
                                  <Text className="block" style={{ color: '#fa8c16' }}>
                                    {`${currentCount}/${playmateSearch.currentParticipants} ${playmateSearch.playmateSearchType === 'group' ? 'nhóm tham gia' : 'người tham gia'}`}
                                  </Text>
                                </div>
                              </li>
                              <Divider className="my-2" />
                              
                              <li className="flex items-start">
                                <UserOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Trình độ yêu cầu:</Text>
                                  <Text className="block" style={{ color: '#722ed1' }}>
                                    {getSkillLevelDisplay(playmateSearch.requiredSkillLevel)}
                                  </Text>
                                </div>
                              </li>
                              <Divider className="my-2" />
                              
                              <li className="flex items-start">
                                <UserOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Vị trí cần người:</Text>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {playmateSearch.positions && playmateSearch.positions.length > 0 ? (
                                      playmateSearch.positions.map((pos, index) => (
                                        <Tag key={index} color="blue" className="px-3 py-1">{pos}</Tag>
                                      ))
                                    ) : (
                                      <Text type="secondary">Không có yêu cầu vị trí cụ thể</Text>
                                    )}
                                  </div>
                                </div>
                              </li>
                              <Divider className="my-2" />
                              
                              <li className="flex items-start">
                                <UserOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Giới tính ưu tiên:</Text>
                                  <Text className="block">{getGenderPreferenceDisplay(playmateSearch.genderPreference)}</Text>
                                </div>
                              </li>
                              <Divider className="my-2" />
                              
                              <li className="flex items-start">
                                <MoneyCollectOutlined className="text-blue-600 mr-3 mt-1" />
                                <div>
                                  <Text strong>Chi phí:</Text>
                                  <div className="mt-1">
                                    {getCostDisplay()}
                                  </div>
                                </div>
                              </li>
                              
                              {playmateSearch.costDetails && (
                                <>
                                  <Divider className="my-2" />
                                  <li className="flex items-start">
                                    <InfoCircleOutlined className="text-blue-600 mr-3 mt-1" />
                                    <div>
                                      <Text strong>Chi tiết chi phí:</Text>
                                      <Text className="block">{playmateSearch.costDetails}</Text>
                                    </div>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                  
                          {/* Description */}
                          <div className="mb-4">
                            <Divider className="my-2" />
                            <Title level={5}>Mô tả</Title>
                            <Paragraph>
                              {playmateSearch.description || 'Không có mô tả chi tiết.'}
                            </Paragraph>
                          </div>
                  
                          {/* Additional information */}
                          {playmateSearch.communicationDescription && (
                            <div className="mb-4">
                              <Divider className="my-2" />
                              <Title level={5}>Thông tin liên hệ</Title>
                              <Paragraph>{playmateSearch.communicationDescription}</Paragraph>
                            </div>
                          )}
                        </Card>
                      </div>
                      
                      {/* User Info Card */}
                      <div>
                        <Card className="shadow-sm mb-4">
                          <Title level={4} className="flex items-center">
                            <UserOutlined className="mr-2 text-blue-600" /> 
                            Người tạo
                          </Title>
                          <Divider />
                          <Space className="w-full" direction="vertical" size={12}>
                            <div className="flex items-center">
                              <Avatar 
                                size={64} 
                                src={playmateSearch.userInfo.avatar || playmateSearch.userInfo.avatarUrl} 
                                icon={<UserOutlined />} 
                              />
                              <div className="ml-3">
                                <Text strong>{playmateSearch.userInfo.name}</Text>
                                {playmateSearch.userInfo.phoneNumber && (
                                  <Text className="block">{playmateSearch.userInfo.phoneNumber}</Text>
                                )}
                                {playmateSearch.userInfo.email && (
                                  <Text className="block">{playmateSearch.userInfo.email}</Text>
                                )}
                              </div>
                            </div>
                          </Space>
                        </Card>
                      </div>
                    </div>
                  </div>
                )
              },
              ...(isOwner ? [
                {
                  key: 'applications',
                  label: 'Đơn đăng ký',
                  children: (
                    <div className="py-4">
                      <Card className="shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                          <Title level={4} className="flex items-center mb-0">
                            <TeamOutlined className="mr-2 text-blue-600" /> 
                            Danh sách đơn đăng ký
                          </Title>
                          
                          {/* Move the Create Chat Group button here */}
                          {isOwner && (
                            <Button 
                              type={canCreateChatGroup ? "primary" : "default"}
                              onClick={showChatTitleModal}
                              loading={creatingChat}
                              icon={<MessageOutlined />}
                              className={`mt-2 sm:mt-0 ${canCreateChatGroup ? "" : "opacity-70"}`}
                              disabled={!canCreateChatGroup && !chatCreated}
                            >
                              {chatCreated 
                                ? (
                                  <span className="flex items-center">
                                    <CheckCircleOutlined className="mr-1 text-green-500" /> 
                                    Đã tạo nhóm chat
                                  </span>
                                ) 
                                : canCreateChatGroup 
                                  ? 'Tạo nhóm chat' 
                                  : 'Chưa đủ người tham gia'}
                            </Button>
                          )}
                        </div>
                        
                        {playmateSearch.participants && playmateSearch.participants.length > 0 ? (
                          <List
                            itemLayout="horizontal"
                            dataSource={playmateSearch.participants}
                            renderItem={participant => {
                              // Bây giờ có thể truy cập trực tiếp participant.player
                              const playerInfo = participant.player;
                              
                              const idKey = `${participant.playerId}-${playmateSearch.id}`;
                              const isProcessing = processingIds.includes(idKey);
                              
                              return (
                                <List.Item
                                  className="application-item bg-gray-50 p-3 mb-3 rounded-lg"
                                  actions={[
                                    participant.status === 'pending' && (
                                      <div className="flex">
                                        <Button
                                          type="primary"
                                          size="small"
                                          onClick={() => handleAcceptApplication(participant.playerId, playmateSearch.id)}
                                          loading={isProcessing}
                                          className="mr-2"
                                          icon={<CheckOutlined />}
                                        >
                                          Chấp nhận
                                        </Button>
                                        <Button
                                          danger
                                          size="small"
                                          onClick={() => handleRejectApplication(participant.playerId, playmateSearch.id)}
                                          loading={isProcessing}
                                          icon={<CloseOutlined />}
                                        >
                                          Từ chối
                                        </Button>
                                      </div>
                                    )
                                  ].filter(Boolean)}
                                >
                                  <List.Item.Meta
                                    avatar={
                                      <Avatar 
                                        src={playerInfo?.avatarUrl} 
                                        icon={!playerInfo?.avatarUrl && <UserOutlined />}
                                      />
                                    }
                                    title={
                                      <div className="flex items-center">
                                        <Text strong>{playerInfo?.name || `Người chơi ${participant.playerId.substring(0, 6)}`}</Text>
                                        <Tag 
                                          color={getStatusColor(participant.status)}
                                          className="ml-2"
                                        >
                                          {getStatusText(participant.status)}
                                        </Tag>
                                      </div>
                                    }
                                    description={
                                      <>
                                      <div className="text-sm text-gray-600">
                                        <div><strong>Số điện thoại:</strong> {playerInfo?.phoneNumber}</div>
                                        <div><strong>Email:</strong> {playerInfo?.email}</div>
                                        <div><strong>Giới tính:</strong> {playerInfo?.gender || 'Chưa cập nhật'}</div>                                      </div> 

                                      <div className="text-sm text-gray-600">
                                        <div><strong>Trình độ:</strong> {getSkillLevelDisplay(participant.skillLevel as SkillLevel)}</div>
                                        {participant.position && (
                                          <div>
                                            <strong>Vị trí:</strong>
                                            <span className="ml-1">
                                              {participant.position}
                                            </span>
                                          </div>
                                        )}
                                        {participant.note && <div><strong>Ghi chú:</strong> {participant.note}</div>}
                                      </div>
                                      </>
                                    }
                                  />
                                </List.Item>
                              );
                            }}
                          />
                        ) : (
                          <Empty description="Chưa có đơn đăng ký nào" />
                        )}
                      </Card>
                    </div>
                  )
                }
              ] : []),
              ...(user && !isOwner ? [
                {
                  key: 'myApplication',
                  label: 'Đơn đăng ký của tôi',
                  children: (
                    <div className="py-4">
                      <Card className="shadow-sm">
                        <Title level={4} className="flex items-center mb-4">
                          <UserOutlined className="mr-2 text-blue-600" /> 
                          Trạng thái đơn đăng ký của bạn
                        </Title>
                        
                        {playmateSearch.participants && user ? (
                          (() => {
                            const myApplication = playmateSearch.participants.find(p => p.playerId === user.id);
                            
                            if (myApplication) {
                              return (
                                <div>
                                  <div className="flex items-center mb-4">
                                    <Tag color={getStatusColor(myApplication.status)} className="text-base py-1 px-3">
                                      {getStatusText(myApplication.status)}
                                    </Tag>
                                  </div>
                                  
                                  <Divider />
                                  
                                  <div className="mb-3">
                                    <Text strong>Trình độ đã đăng ký:</Text>
                                    <Text className="ml-2">{getSkillLevelDisplay(myApplication.skillLevel as SkillLevel)}</Text>
                                  </div>
                                  
                                  {myApplication.position && (
                                    <div>
                                      <Text strong>Vị trí:</Text>
                                      <Text className="ml-2">{myApplication.position}</Text>
                                    </div>
                                  )}
                                  
                                  {myApplication.note && (
                                    <div>
                                      <Text strong>Ghi chú:</Text>
                                      <div className="mt-2 bg-gray-50 p-3 rounded">
                                        <Text>{myApplication.note}</Text>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Check if chat group has been created */}
                                  {chatCreated && (
                                    <div className="mt-4">
                                      <Divider className="my-2" />
                                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                        <div>
                                          <Text strong className="text-green-600">Nhóm chat đã được tạo!</Text>
                                          <Text className="block mt-1 text-sm">
                                            Bạn có thể tham gia nhóm chat để trao đổi thông tin với những người tham gia khác.
                                          </Text>
                                        </div>
                                        <Button 
                                          type="primary"
                                          onClick={() => {
                                            // Open chat widget
                                            dispatch(openChatWidget());
                                            
                                            // Get the list of playmateIds that have had chat created
                                            try {
                                              // Attempt to fetch conversations to find the one for this playmate
                                              ChatService.getConversations().then(conversations => {
                                                // Look for a group conversation that might be for this playmate
                                                const playmateConversation = conversations.find(conv => 
                                                  conv.title?.includes(playmateSearch?.title || '')
                                                );
                                                
                                                if (playmateConversation) {
                                                  setTimeout(() => {
                                                    dispatch(setActiveConversation(playmateConversation.id));
                                                  }, 200);
                                                }
                                              });
                                            } catch (error) {
                                              console.error('Error finding chat conversation:', error);
                                            }
                                          }}
                                          icon={<MessageOutlined />}
                                          className="mt-3 sm:mt-0"
                                        >
                                          Tham gia nhóm chat
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            } else {
                              return (
                                <div className="text-center py-6">
                                  <Text type="secondary">Bạn chưa đăng ký tham gia bài đăng này</Text>
                                  {isOpen && (
                                    <div className="mt-4">
                                      <Button type="primary" onClick={showModal}>
                                        Đăng ký ngay
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })()
                        ) : (
                          <div className="text-center py-6">
                            <Text type="secondary">
                              {!user 
                                ? 'Vui lòng đăng nhập để xem thông tin đơn đăng ký' 
                                : 'Không có thông tin đơn đăng ký'
                              }
                            </Text>
                          </div>
                        )}
                      </Card>
                    </div>
                  )
                }
              ] : [])
            ]}
          />
        </section>
      </div>

      {/* Application Modal */}
      <Modal
        title="Đăng ký tham gia"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleApply}
          requiredMark={false}
        >
          <Form.Item
            name="skillLevel"
            label="Trình độ của bạn"
            rules={[{ required: true, message: 'Vui lòng chọn trình độ!' }]}
          >
            <Select placeholder="Chọn trình độ của bạn">
              <Option value="newbie">Mới bắt đầu</Option>
              <Option value="intermediate">Trung cấp</Option>
              <Option value="advance">Nâng cao</Option>
              <Option value="professional">Chuyên nghiệp</Option>
              <Option value="any">Không xác định</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="position"
            label="Vị trí muốn chơi (nếu có)"
          >
            <Input placeholder="Nhập vị trí bạn muốn chơi" />
          </Form.Item>

          <Form.Item
            name="note"
            label="Lời nhắn"
          >
            <TextArea
              rows={4}
              placeholder="Nhập lời nhắn cho người tạo (không bắt buộc)"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button onClick={handleCancel}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Đăng ký
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Chat Group Title Modal */}
      <Modal
        title="Tạo nhóm chat"
        open={chatTitleModalVisible}
        onCancel={() => setChatTitleModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={titleForm}
          layout="vertical"
          onFinish={handleCreateChatGroup}
          initialValues={{
            chatTitle: chatTitle
          }}
        >
          <Form.Item
            name="chatTitle"
            label="Tên nhóm chat"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhóm!' }]}
          >
            <Input placeholder="Nhập tên nhóm chat" />
          </Form.Item>
          
          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button onClick={() => setChatTitleModalVisible(false)}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={creatingChat}>
                Tạo nhóm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Edit Modal */}
      {playmateSearch && (
        <PlaymateEdit
          visible={editModalVisible}
          onClose={handleEditModalClose}
          playmateId={playmateSearch.id}
          onSuccess={handleEditSuccess}
        />
      )}
      
      <style>{`
        .ant-descriptions-item-label {
          font-weight: 500;
        }
        
        .ant-image {
          display: block;
        }
        
        .ant-descriptions-item {
          padding-bottom: 12px;
        }
        
        .playmate-detail-tabs .ant-tabs-nav {
          margin-bottom: 0;
        }
        
        .playmate-detail-tabs .ant-tabs-content-holder {
          border: 1px solid #f0f0f0;
          border-top: none;
          border-radius: 0 0 2px 2px;
        }
        
        .ant-list-item-meta-description {
          margin-top: 4px;
        }
        
        .application-item:hover {
          background-color: #f5f5f5;
        }
        
        .ant-list-item-action {
          margin-left: 48px;
        }
      `}</style>
    </div>
  );
};

export default PlaymateDetail; 
