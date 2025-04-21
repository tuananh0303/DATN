import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSearchById, createApplication } from '@/mocks/playmate/playmate.mock';
import { PlaymateSearch } from '@/types/playmate.type';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  Typography,
  Button,
  Card,
  Row,
  Col,
  Spin,
  Empty,
  Avatar,
  Tag,
  Descriptions,
  Modal,
  Form,
  Input,
  Breadcrumb,
  Divider,
  List,
  Badge,
  Space,
  message
} from 'antd';
import {
  ArrowLeftOutlined,
  UserOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { showLoginModal } from '@/store/slices/userSlice';
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const PlaymateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<PlaymateSearch | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);
  const [form] = Form.useForm();

  // Get auth state from Redux
  const { isAuthenticated, user } = useAppSelector(state => state.user);
  
  useEffect(() => {
    if (id) {
      // Giả lập API call
      setTimeout(() => {
        const searchData = getSearchById(parseInt(id));
        if (searchData) {
          setSearch(searchData);
        }
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full px-4 py-6 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (!search) {
    return (
      <div className="w-full px-4 py-6 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Empty
            description="Không tìm thấy bài đăng"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="py-12"
          >
            <Paragraph type="secondary" className="mb-4">
              Bài đăng tìm kiếm người chơi bạn yêu cầu không tồn tại hoặc đã bị xóa.
            </Paragraph>
            <Link to="/user/playmate">
              <Button type="primary">Quay lại danh sách</Button>
            </Link>
          </Empty>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'dd/MM/yyyy', { locale: vi });
  };

  const getSkillLevelText = (level: string) => {
    const skillMap: Record<string, string> = {
      'BEGINNER': 'Người mới',
      'INTERMEDIATE': 'Trung bình',
      'ADVANCED': 'Nâng cao',
      'PROFESSIONAL': 'Chuyên nghiệp',
      'ANY': 'Tất cả'
    };
    return skillMap[level] || level;
  };

  const getGenderPreferenceText = (preference: string) => {
    const genderMap: Record<string, string> = {
      'MALE': 'Nam',
      'FEMALE': 'Nữ',
      'ANY': 'Không yêu cầu giới tính'
    };
    return genderMap[preference] || preference;
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'ACTIVE': 'Đang tìm kiếm',
      'COMPLETED': 'Đã tìm đủ',
      'CANCELLED': 'Đã hủy',
      'EXPIRED': 'Đã hết hạn',
      'PENDING': 'Đang chờ',
      'ACCEPTED': 'Đã chấp nhận',
      'REJECTED': 'Đã từ chối'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'ACTIVE': 'success',
      'COMPLETED': 'processing',
      'CANCELLED': 'error',
      'EXPIRED': 'default',
      'PENDING': 'warning',
      'ACCEPTED': 'success',
      'REJECTED': 'error'
    };
    return colorMap[status] || 'default';
  };

  const handleApplyClick = () => {
    // Check if user is authenticated and has player role
    if (!isAuthenticated || user?.role !== 'player') {
      // Show login modal if not authenticated, with redirect back to this page
      dispatch(showLoginModal({ path: `/playmate/${id}`, role: 'player' }));
      message.info('Vui lòng đăng nhập với vai trò người chơi để đăng ký tham gia');
      return;
    }
    
    // If authenticated as player, show the apply modal
    setShowApplyModal(true);
  };

  const handleApply = () => {
    form.validateFields().then(values => {
      setSubmitting(true);
      
      // Giả lập API call
      setTimeout(() => {
        // Assuming we have the current user info
        const mockCurrentUser = {
          id: "current_user_id",
          userInfo: {
            name: "Người dùng hiện tại",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            gender: "male",
            phoneNumber: "0987123456"
          }
        };
        
        const newApplication = createApplication(
          search.id,
          mockCurrentUser.id,
          mockCurrentUser.userInfo,
          values.message
        );
        
        // Update the local state to reflect the change
        if (search.applications) {
          setSearch({
            ...search,
            applications: [...search.applications, newApplication]
          });
        } else {
          setSearch({
            ...search,
            applications: [newApplication]
          });
        }
        
        setSubmitting(false);
        setShowApplyModal(false);
        setApplied(true);
        form.resetFields();
      }, 1000);
    });
  };

  const handleGoBack = () => {
    navigate('/user/playmate');
  };

  return (
    <div className="w-full px-4 py-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb className="mb-4 md:mb-6">
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/user/playmate">Tìm bạn chơi</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
        </Breadcrumb>

        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={handleGoBack}
          className="px-0 mb-4"
        >
          Quay lại danh sách
        </Button>
        
        <Card bordered={false} className="shadow-md">
          <div className="relative">
            <div className="h-48 md:h-64 lg:h-80 overflow-hidden mb-6">
              <img 
                src={`https://source.unsplash.com/random/1200x400/?${search.sportName.toLowerCase()}`} 
                alt={search.sportName} 
                className="w-full h-full object-cover"
              />
            </div>
            <Badge 
              status={getStatusColor(search.status) as "success" | "error" | "default" | "processing" | "warning"} 
              text={getStatusText(search.status)}
              className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full"
            />
          </div>
          
          <Title level={2} className="mb-4 text-xl md:text-2xl lg:text-3xl">{search.title}</Title>
          
          <Row gutter={16} align="middle" className="mb-6">
            <Col>
              <Avatar 
                size={64} 
                src={search.userInfo.avatar} 
                icon={!search.userInfo.avatar && <UserOutlined />}
              />
            </Col>
            <Col>
              <Title level={4} className="m-0">{search.userInfo.name}</Title>
              <Text type="secondary">Đăng ngày {formatDate(search.createdAt)}</Text>
            </Col>
          </Row>
          
          <Card title="Mô tả" bordered={false} className="mb-6 border border-gray-200">
            <Paragraph>
              {search.description || 'Không có mô tả'}
            </Paragraph>
          </Card>
          
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Card title="Thông tin chung" bordered={false} className="mb-6 border border-gray-200">
                <Descriptions column={1} layout="horizontal" bordered>
                  <Descriptions.Item label="Môn thể thao">{search.sportName}</Descriptions.Item>
                  <Descriptions.Item label="Trình độ">{getSkillLevelText(search.skillLevel)}</Descriptions.Item>
                  <Descriptions.Item label="Loại tìm kiếm">
                    {search.searchType === 'INDIVIDUAL' ? 'Cá nhân' : 'Nhóm'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số người">
                    {search.participants.current}/{search.participants.required}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giới tính">
                    {getGenderPreferenceText(search.genderPreference)}
                  </Descriptions.Item>
                  {search.price && (
                    <Descriptions.Item label="Chi phí">
                      {search.price.toLocaleString('vi-VN')}đ
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Card>
            </Col>
            
            <Col xs={24} md={12}>
              <Card title="Thời gian và địa điểm" bordered={false} className="mb-6 border border-gray-200">
                <Descriptions column={1} layout="horizontal" bordered>
                  <Descriptions.Item label="Ngày">
                    <Space>
                      <CalendarOutlined />
                      {formatDate(search.date)}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian">
                    <Space>
                      <ClockCircleOutlined />
                      {search.timeStart} - {search.timeEnd}
                    </Space>
                  </Descriptions.Item>
                  {search.facilityName && (
                    <Descriptions.Item label="Cơ sở">{search.facilityName}</Descriptions.Item>
                  )}
                  <Descriptions.Item label="Địa điểm">
                    <Space>
                      <EnvironmentOutlined />
                      {search.location}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          
          {search.applications && search.applications.length > 0 && (
            <Card 
              title={`Danh sách đăng ký (${search.applications.length})`}
              bordered={false}
              className="mb-6 border border-gray-200"
            >
              <List
                itemLayout="horizontal"
                dataSource={search.applications}
                renderItem={(app) => (
                  <List.Item
                    actions={[
                      <Tag 
                        color={
                          app.status === 'PENDING' ? 'warning' :
                          app.status === 'ACCEPTED' ? 'success' :
                          'error'
                        }
                      >
                        {app.status === 'PENDING' ? 'Đang chờ' : 
                        app.status === 'ACCEPTED' ? 'Đã chấp nhận' : 'Đã từ chối'}
                      </Tag>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={app.userInfo.avatar} icon={!app.userInfo.avatar && <UserOutlined />} />}
                      title={<Text strong>{app.userInfo.name}</Text>}
                      description={
                        <div>
                          <Text type="secondary" className="text-xs">
                            {formatDate(app.createdAt)}
                          </Text>
                          {app.message && (
                            <Paragraph className="mt-2 text-sm text-gray-500 italic">
                              "{app.message}"
                            </Paragraph>
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}
          
          <Divider />
          
          <Row justify="space-between">
            <Col>
              <Button onClick={handleGoBack} size="large">
                Quay lại danh sách
              </Button>
            </Col>
            
            <Col>
              {search.status === 'ACTIVE' && !applied ? (
                <Button
                  type="primary"
                  onClick={handleApplyClick}
                  disabled={search.participants.current >= search.participants.required}
                  icon={<TeamOutlined />}
                  size="large"
                >
                  {search.participants.current >= search.participants.required ? 'Đã đủ người' : 'Đăng ký tham gia'}
                </Button>
              ) : applied && (
                <Button 
                  type="text" 
                  icon={<CheckCircleOutlined />} 
                  className="text-green-600"
                  disabled
                  size="large"
                >
                  Đã đăng ký
                </Button>
              )}
            </Col>
          </Row>
        </Card>
        
        <Modal
          title="Đăng ký tham gia"
          open={showApplyModal}
          onCancel={() => setShowApplyModal(false)}
          footer={[
            <Button key="back" onClick={() => setShowApplyModal(false)} disabled={submitting}>
              Hủy
            </Button>,
            <Button 
              key="submit" 
              type="primary" 
              loading={submitting} 
              onClick={handleApply}
            >
              Gửi đăng ký
            </Button>
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{ message: '' }}
          >
            <Form.Item 
              name="message" 
              label="Lời nhắn (tùy chọn)"
            >
              <TextArea
                rows={4}
                placeholder="Giới thiệu ngắn gọn về bạn hoặc lý do bạn muốn tham gia..."
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default PlaymateDetail; 