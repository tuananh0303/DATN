import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockPlaymateSearches, filterBySport } from '@/mocks/playmate/playmate.mock';
import { PlaymateSearch, SkillLevel, PlaymateSearchType } from '@/types/playmate.type';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  Typography,
  Button,
  Row,
  Col,
  Card,
  Select,
  Tag,
  Spin,
  Empty,
  Breadcrumb,
  Avatar,
  Space,
  Divider
} from 'antd';
import {
  PlusOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const PlaymateList: React.FC = () => {
  const [filteredSearches, setFilteredSearches] = useState<PlaymateSearch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sportFilter, setSportFilter] = useState<number | null>(null);
  const [skillFilter, setSkillFilter] = useState<SkillLevel | null>(null);
  const [typeFilter, setTypeFilter] = useState<PlaymateSearchType | null>(null);

  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      setFilteredSearches(mockPlaymateSearches);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let result = mockPlaymateSearches;
    
    if (sportFilter !== null) {
      result = filterBySport(sportFilter);
    }
    
    if (skillFilter !== null) {
      result = result.filter(search => search.skillLevel === skillFilter);
    }
    
    if (typeFilter !== null) {
      result = result.filter(search => search.searchType === typeFilter);
    }
    
    setFilteredSearches(result);
  }, [sportFilter, skillFilter, typeFilter]);

  const handleSportFilterChange = (value: string) => {
    setSportFilter(value ? parseInt(value) : null);
  };

  const handleSkillFilterChange = (value: string) => {
    setSkillFilter(value as SkillLevel || null);
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value as PlaymateSearchType || null);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'dd/MM/yyyy', { locale: vi });
  };

  const getSkillLevelText = (level: SkillLevel) => {
    const skillMap: Record<SkillLevel, string> = {
      'BEGINNER': 'Người mới',
      'INTERMEDIATE': 'Trung bình',
      'ADVANCED': 'Nâng cao',
      'PROFESSIONAL': 'Chuyên nghiệp',
      'ANY': 'Tất cả'
    };
    return skillMap[level];
  };

  // Hàm trả về màu của Tag dựa trên loại
  const getTagColor = (type: string) => {
    const colorMap: Record<string, string> = {
      'sport': 'blue',
      'skill': 'purple',
      'gender': 'orange',
      'price': 'green',
      'searchType': 'cyan'
    };
    return colorMap[type] || 'default';
  };

  return (
    <div className="w-full px-4 py-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb className="mb-4 md:mb-6">
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Tìm bạn chơi</Breadcrumb.Item>
        </Breadcrumb>

        <Row justify="space-between" align="middle" className="mb-6">
          <Col>
            <Title level={2} className="mb-0 text-xl md:text-2xl lg:text-3xl">Tìm bạn chơi thể thao</Title>
          </Col>
          <Col>
            <Link to="/user/playmate/create">
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                size="large"
              >
                Tạo tìm kiếm mới
              </Button>
            </Link>
          </Col>
        </Row>

        <Card title="Bộ lọc" className="mb-6 shadow-md border border-gray-200">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <div>
                <Text strong>Môn thể thao</Text>
                <Select
                  style={{ width: '100%', marginTop: 8 }}
                  placeholder="Tất cả môn thể thao"
                  value={sportFilter?.toString() || undefined}
                  onChange={handleSportFilterChange}
                  allowClear
                >
                  <Option value="">Tất cả môn thể thao</Option>
                  <Option value="1">Bóng đá</Option>
                  <Option value="2">Tennis</Option>
                  <Option value="3">Cầu lông</Option>
                  <Option value="4">Bơi lội</Option>
                  <Option value="5">Yoga</Option>
                  <Option value="6">Golf</Option>
                  <Option value="7">Bóng rổ</Option>
                </Select>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div>
                <Text strong>Trình độ</Text>
                <Select
                  style={{ width: '100%', marginTop: 8 }}
                  placeholder="Tất cả trình độ"
                  value={skillFilter || undefined}
                  onChange={handleSkillFilterChange}
                  allowClear
                >
                  <Option value="">Tất cả trình độ</Option>
                  <Option value="BEGINNER">Người mới</Option>
                  <Option value="INTERMEDIATE">Trung bình</Option>
                  <Option value="ADVANCED">Nâng cao</Option>
                  <Option value="PROFESSIONAL">Chuyên nghiệp</Option>
                </Select>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div>
                <Text strong>Loại tìm kiếm</Text>
                <Select
                  style={{ width: '100%', marginTop: 8 }}
                  placeholder="Tất cả loại"
                  value={typeFilter || undefined}
                  onChange={handleTypeFilterChange}
                  allowClear
                >
                  <Option value="">Tất cả loại</Option>
                  <Option value="INDIVIDUAL">Cá nhân</Option>
                  <Option value="GROUP">Nhóm</Option>
                </Select>
              </div>
            </Col>
          </Row>
        </Card>

        {loading ? (
          <div className="flex justify-center items-center py-12 bg-gray-50 rounded-lg shadow-md border border-gray-200">
            <Spin size="large" />
          </div>
        ) : filteredSearches.length === 0 ? (
          <Empty 
            description="Không tìm thấy kết quả nào phù hợp với bộ lọc" 
            className="py-12 bg-gray-50 rounded-lg shadow-md border border-gray-200"
          />
        ) : (
          <Row gutter={[16, 16]}>
            {filteredSearches.map((search) => (
              <Col key={search.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  className="h-full shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                  cover={
                    <div className="relative h-48">
                      <img
                        alt={search.sportName}
                        src={`https://source.unsplash.com/random/400x200/?${search.sportName.toLowerCase()}`}
                        className="w-full h-full object-cover"
                      />
                      <Tag 
                        color={search.searchType === 'INDIVIDUAL' ? 'cyan' : 'blue'}
                        className="absolute top-3 right-3 text-xs px-2 py-1"
                      >
                        {search.searchType === 'INDIVIDUAL' ? 'Cá nhân' : `Nhóm (${search.participants.current}/${search.participants.required})`}
                      </Tag>
                    </div>
                  }
                  bodyStyle={{ padding: 16 }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-3">
                      <Space>
                        <Avatar 
                          src={search.userInfo.avatar || undefined} 
                          icon={!search.userInfo.avatar && <UserOutlined />} 
                        />
                        <div>
                          <Text strong className="block">{search.userInfo.name}</Text>
                          <Text type="secondary" className="text-xs">{formatDate(search.createdAt)}</Text>
                        </div>
                      </Space>
                    </div>
                    
                    <Title level={5} className="mb-3 line-clamp-1">{search.title}</Title>
                    
                    <div className="mb-2">
                      <Space>
                        <EnvironmentOutlined className="text-gray-400" />
                        <Text className="text-sm line-clamp-1">
                          {search.facilityName || search.location}
                        </Text>
                      </Space>
                    </div>
                    
                    <Row className="mb-3">
                      <Col span={12}>
                        <Space>
                          <CalendarOutlined className="text-gray-400" />
                          <Text className="text-sm">{formatDate(search.date)}</Text>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space>
                          <ClockCircleOutlined className="text-gray-400" />
                          <Text className="text-sm">{search.timeStart} - {search.timeEnd}</Text>
                        </Space>
                      </Col>
                    </Row>
                    
                    <div className="mb-4">
                      <Space wrap>
                        <Tag color={getTagColor('sport')}>{search.sportName}</Tag>
                        <Tag color={getTagColor('skill')}>{getSkillLevelText(search.skillLevel)}</Tag>
                        <Tag color={getTagColor('gender')}>
                          {search.genderPreference === 'ANY' ? 'Không yêu cầu giới tính' : 
                          search.genderPreference === 'MALE' ? 'Nam' : 'Nữ'}
                        </Tag>
                        {search.price && (
                          <Tag color={getTagColor('price')}>
                            {search.price.toLocaleString('vi-VN')}đ
                          </Tag>
                        )}
                      </Space>
                    </div>
                    
                    <Divider className="my-2" />
                    
                    <Link to={`/user/playmate/${search.id}`}>
                      <Button type="primary" block>
                        Xem chi tiết
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        
        <div className="mt-6 text-center">
          <Link to="/user/playmate/manage">
            <Button icon={<TeamOutlined />} size="large">
              Quản lý tìm kiếm của tôi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaymateList; 