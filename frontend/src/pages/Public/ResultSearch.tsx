import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Breadcrumb, 
  Card, 
  Row, 
  Col, 
  Input, 
  Select, 
  Checkbox, 
  Slider, 
  Rate, 
  Button, 
  Typography, 
  Divider, 
  Space,
  Tag,
  Pagination,
  Empty
} from 'antd';
import { 
  SearchOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined, 
} from '@ant-design/icons';
import { IMAGE } from '@/constants/user/Home/Image';

const { Title, Text } = Typography;

// Interface cho facility data (giống như trong Home.tsx)
interface FacilityData {
  id: string;
  name: string;
  thumbnail: string;
  operatingHours: {
    start: string;
    end: string;
  };
  sports: string[];
  address: string;
  rating: number;
  priceRange: {
    min: number;
    max: number;
  };
  hasPromotion?: boolean;
  hasEvent?: boolean;
}

const ResultSearch: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // States
  const [searchParams, setSearchParams] = useState({
    keyword: queryParams.get('keyword') || '',
    sport: queryParams.get('sport') || undefined,
    location: queryParams.get('location') || '',
    timeRange: null,
  });

  const [filters, setFilters] = useState({
    sports: [] as string[],
    priceRange: [0, 1000000] as [number, number],
    rating: 0,
    hasPromotion: false,
    hasEvent: false,
    openNow: false,
    facilities: [] as string[],
  });

  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Mock data - sau này sẽ được thay thế bằng API calls
  const searchResults: FacilityData[] = [
    {
      id: '1',
      name: 'Thể thao 247 - Thủ Đức',
      thumbnail: IMAGE.THUMBNAIL_2,
      operatingHours: { start: '05:00', end: '22:00' },
      sports: ['football', 'basketball', 'badminton'],
      address: 'Phường Linh Trung, Thủ Đức, TP.HCM',
      rating: 4.8,
      priceRange: { min: 200000, max: 500000 },
      hasPromotion: true,
      hasEvent: false,
    },
    {
      id: '2',
      name: 'Sân Bóng Đá Mini Thống Nhất',
      thumbnail: IMAGE.THUMBNAIL_2,
      operatingHours: { start: '06:00', end: '23:00' },
      sports: ['football'],
      address: 'Quận 7, TP.HCM',
      rating: 4.5,
      priceRange: { min: 180000, max: 350000 },
      hasPromotion: false,
      hasEvent: true,
    },
    {
      id: '3',
      name: 'Cầu Lông Phú Nhuận',
      thumbnail: IMAGE.THUMBNAIL_2,
      operatingHours: { start: '07:00', end: '21:00' },
      sports: ['badminton'],
      address: 'Quận Phú Nhuận, TP.HCM',
      rating: 4.2,
      priceRange: { min: 100000, max: 150000 },
      hasPromotion: true,
      hasEvent: true,
    },
    {
      id: '4',
      name: 'Sân Bóng Rổ Tân Bình',
      thumbnail: IMAGE.THUMBNAIL_2,
      operatingHours: { start: '08:00', end: '22:00' },
      sports: ['basketball'],
      address: 'Quận Tân Bình, TP.HCM',
      rating: 4.6,
      priceRange: { min: 220000, max: 400000 },
      hasPromotion: false,
      hasEvent: false,
    },
    {
      id: '5',
      name: 'Trung Tâm Thể Thao Quận 1',
      thumbnail: IMAGE.THUMBNAIL_2,
      operatingHours: { start: '06:00', end: '22:00' },
      sports: ['football', 'basketball', 'badminton', 'tennis'],
      address: 'Quận 1, TP.HCM',
      rating: 4.9,
      priceRange: { min: 250000, max: 600000 },
      hasPromotion: true,
      hasEvent: true,
    },
    {
      id: '6',
      name: 'Sân Tennis Bình Thạnh',
      thumbnail: IMAGE.THUMBNAIL_2,
      operatingHours: { start: '05:30', end: '21:30' },
      sports: ['tennis'],
      address: 'Quận Bình Thạnh, TP.HCM',
      rating: 4.3,
      priceRange: { min: 180000, max: 300000 },
      hasPromotion: false,
      hasEvent: false,
    },
    // Thêm các kết quả khác...
  ];

  // Danh sách các môn thể thao để filter
  const sportOptions = [
    { label: 'Bóng đá', value: 'football' },
    { label: 'Bóng rổ', value: 'basketball' },
    { label: 'Cầu lông', value: 'badminton' },
    { label: 'Tennis', value: 'tennis' },
    { label: 'Bơi lội', value: 'swimming' },
  ];

  // Danh sách các tiện ích để filter
  const facilityOptions = [
    { label: 'Có chỗ đậu xe', value: 'parking' },
    { label: 'Có phòng thay đồ', value: 'changingRoom' },
    { label: 'Có phòng tắm', value: 'shower' },
    { label: 'Có quầy đồ uống', value: 'beverages' },
    { label: 'Cho thuê dụng cụ', value: 'equipment' },
  ];

  // Xử lý thay đổi filter
  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1); // Reset về trang 1 khi thay đổi filter
  };

  // Xử lý thay đổi sắp xếp
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  // Xử lý click vào facility
  const handleFacilityClick = (facilityId: string) => {
    navigate(`/facility/${facilityId}`);
  };

  // Facility Card component (tương tự như trong Home.tsx)
  const FacilityCard = ({ facility }: { facility: FacilityData }) => (
    <Card 
      hoverable 
      className="w-full mb-4"
      onClick={() => handleFacilityClick(facility.id)}
      cover={<img alt={facility.name} src={facility.thumbnail} className="h-48 object-cover" />}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">
          <ClockCircleOutlined className="mr-1" />
          {facility.operatingHours.start} - {facility.operatingHours.end}
        </span>
        <Rate disabled defaultValue={facility.rating} className="text-sm" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{facility.name}</h3>
      <div className="flex gap-2 mb-2">
        {facility.sports.map(sport => (
          <Tag key={sport} color="blue">{sport}</Tag>
        ))}
      </div>
      <p className="text-gray-600 mb-2">
        <EnvironmentOutlined className="mr-1" />
        {facility.address}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-blue-600 font-semibold">
          {facility.priceRange.min.toLocaleString()}đ - {facility.priceRange.max.toLocaleString()}đ
        </p>
        <Space>
          {facility.hasPromotion && <Tag color="red">Ưu đãi</Tag>}
          {facility.hasEvent && <Tag color="green">Sự kiện</Tag>}
        </Space>
      </div>
    </Card>
  );

  // Breadcrumb items
  const breadcrumbItems = [
    {
      title: <Link to="/">Trang chủ</Link>,
    },
    {
      title: 'Kết quả tìm kiếm',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
    

      {/* Title */}
      <Title level={2} className="mb-6">Kết quả tìm kiếm</Title>
     
      {/* Search bar */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8} lg={10}>
            <Input 
              placeholder="Tìm kiếm cơ sở thể thao" 
              prefix={<SearchOutlined />}
              value={searchParams.keyword}
              onChange={(e) => setSearchParams(prev => ({ ...prev, keyword: e.target.value }))}
              size="large"
            />
          </Col>
          <Col xs={24} md={8} lg={6}>
            <Select
              placeholder="Chọn môn thể thao"
              style={{ width: '100%' }}
              value={searchParams.sport}
              onChange={(value) => setSearchParams(prev => ({ ...prev, sport: value }))}
              size="large"
              allowClear
              options={sportOptions}
            />
          </Col>
          <Col xs={24} md={8} lg={6}>
            <Input 
              prefix={<EnvironmentOutlined />}
              placeholder="Địa điểm"
              value={searchParams.location}
              onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
              size="large"
            />
          </Col>
          <Col xs={24} md={24} lg={2}>
            <Button 
              type="primary" 
              icon={<SearchOutlined />} 
              size="large"
              block
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </div>
     
      {/* Main content */}
      <Row gutter={24}>
        {/* Left sidebar - Filters */}
        <Col xs={24} md={8} lg={6}>
        <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <Title level={4} className="m-0">Bộ lọc</Title>
              <Button 
                type="text" 
                onClick={() => {
                  setFilters({
                    sports: [],
                    priceRange: [0, 1000000],
                    rating: 0,
                    hasPromotion: false,
                    hasEvent: false,
                    openNow: false,
                    facilities: [],
                  });
                }}
              >
                Đặt lại
              </Button>
            </div>
            
            
            <Divider className="my-3" />

            {/* Môn thể thao */}
            <div className="mb-4">
              <Title level={5}>Môn thể thao</Title>
              <Checkbox.Group
                options={sportOptions}
                value={filters.sports}
                onChange={(values) => handleFilterChange('sports', values)}
              />
            </div>

            <Divider className="my-3" />

            {/* Khoảng giá */}
            <div className="mb-4">
              <Title level={5}>Khoảng giá (VNĐ)</Title>
              <Slider
                range
                min={0}
                max={1000000}
                step={50000}
                value={filters.priceRange}
                onChange={(value) => handleFilterChange('priceRange', value)}
                tooltip={{ formatter: (value) => `${value.toLocaleString()}đ` }}
              />
              <div className="flex justify-between text-gray-500 mt-2">
                <span>{filters.priceRange[0].toLocaleString()}đ</span>
                <span>{filters.priceRange[1].toLocaleString()}đ</span>
              </div>
            </div>

            <Divider className="my-3" />

            {/* Đánh giá */}
            <div className="mb-4">
              <Title level={5}>Đánh giá tối thiểu</Title>
              <Rate 
                allowHalf 
                value={filters.rating} 
                onChange={(value) => handleFilterChange('rating', value)} 
              />
            </div>

            <Divider className="my-3" />

            {/* Ưu đãi & Sự kiện */}
            <div className="mb-4">
              <Title level={5}>Ưu đãi & Sự kiện</Title>
              <div className="flex flex-col gap-2">
                <Checkbox 
                  checked={filters.hasPromotion}
                  onChange={(e) => handleFilterChange('hasPromotion', e.target.checked)}
                >
                  Có ưu đãi
                </Checkbox>
                <Checkbox 
                  checked={filters.hasEvent}
                  onChange={(e) => handleFilterChange('hasEvent', e.target.checked)}
                >
                  Có sự kiện
                </Checkbox>
              </div>
            </div>

            <Divider className="my-3" />

            {/* Thời gian */}
            <div className="mb-4">
              <Title level={5}>Thời gian</Title>
              <Checkbox 
                checked={filters.openNow}
                onChange={(e) => handleFilterChange('openNow', e.target.checked)}
              >
                Đang mở cửa
              </Checkbox>
            </div>

            <Divider className="my-3" />

            {/* Tiện ích */}
            <div className="mb-4">
              <Title level={5}>Tiện ích</Title>
              <Checkbox.Group
                options={facilityOptions}
                value={filters.facilities}
                onChange={(values) => handleFilterChange('facilities', values)}
              />
            </div>
        </div> 
        </Col>
        

        {/* Right content - Search results */}
        <Col xs={24} md={16} lg={18}>
          {/* Sort options */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
            <Text>Tìm thấy {searchResults.length} kết quả</Text>
            <div className="flex items-center">
              <Text className="mr-2">Sắp xếp theo:</Text>
              <Select
                defaultValue="relevance"
                style={{ width: 150 }}
                onChange={handleSortChange}
                options={[
                  { value: 'relevance', label: 'Liên quan nhất' },
                  { value: 'rating', label: 'Đánh giá cao nhất' },
                  { value: 'priceAsc', label: 'Giá: Thấp đến cao' },
                  { value: 'priceDesc', label: 'Giá: Cao đến thấp' },
                ]}
              />
            </div>
          </div>

          {/* Results */}
          {searchResults.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {searchResults.map(facility => (
                  <Col key={facility.id} xs={24} sm={12} lg={8} xl={6}>
                    <FacilityCard facility={facility} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={searchResults.length}
                  onChange={handlePageChange}
                  showSizeChanger
                  showQuickJumper
                  showTotal={(total) => `Tổng cộng ${total} kết quả`}
                />
              </div>
            </>
          ) : (
            <Empty
              description="Không tìm thấy kết quả nào phù hợp"
              className="py-12"
            />
          )}
        </Col>
      </Row>
    </div>
  );


};

export default ResultSearch;