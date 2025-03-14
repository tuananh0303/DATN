import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Breadcrumb, 
  Card, 
  Tag, 
  Image, 
  Button, 
  Tabs, 
  Typography, 
  Rate, 
  Divider, 
  List, 
  Avatar, 
  Collapse,
  Space
} from 'antd';
import { 
  ClockCircleOutlined, 
  EnvironmentOutlined, 
  PhoneOutlined, 
  UserOutlined,
  CommentOutlined,
  ExpandOutlined
} from '@ant-design/icons';
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import { AdvancedMarker } from '@googlemaps/adv-markers-react';

const { Title, Text, Paragraph } = Typography;

// Mock data - will be replaced with API calls later
const facilityData = {
  id: '1',
  name: 'Sân Bóng Đá Mini Thống Nhất',
  status: 'active', // active, closed, maintenance
  images: [
    'https://images.unsplash.com/photo-1575361204480-aadea25e6e68',
    'https://images.unsplash.com/photo-1524015368236-bbf6f72545b6',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55',
    'https://images.unsplash.com/photo-1552667466-07770ae110d0'
  ],
  operatingHours: {
    start: '06:00',
    end: '22:00'
  },
  address: '123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
  owner: {
    name: 'Nguyễn Văn A',
    phone: '0912345678'
  },
  sports: ['Bóng đá', 'Bóng rổ', 'Cầu lông'],
  description: 'Sân Bóng Đá Mini Thống Nhất là một trong những cơ sở thể thao hiện đại nhất tại Quận 7. Với hệ thống sân cỏ nhân tạo chất lượng cao, hệ thống đèn chiếu sáng hiện đại và các tiện ích đi kèm, chúng tôi cam kết mang đến trải nghiệm chơi thể thao tốt nhất cho khách hàng.',
  fieldGroups: [
    {
      id: 'fg1',
      name: 'Sân bóng đá 5 người',
      fields: [
        { id: 'f1', name: 'Sân số 1', surface: 'Cỏ nhân tạo', dimensions: '25m x 15m', price: 200000 },
        { id: 'f2', name: 'Sân số 2', surface: 'Cỏ nhân tạo', dimensions: '25m x 15m', price: 200000 }
      ]
    },
    {
      id: 'fg2',
      name: 'Sân bóng đá 7 người',
      fields: [
        { id: 'f3', name: 'Sân số 3', surface: 'Cỏ nhân tạo', dimensions: '40m x 20m', price: 300000 },
        { id: 'f4', name: 'Sân số 4', surface: 'Cỏ nhân tạo', dimensions: '40m x 20m', price: 300000 }
      ]
    },
    {
      id: 'fg3',
      name: 'Sân cầu lông',
      fields: [
        { id: 'f5', name: 'Sân cầu lông 1', surface: 'Gỗ', dimensions: '13.4m x 6.1m', price: 100000 },
        { id: 'f6', name: 'Sân cầu lông 2', surface: 'Gỗ', dimensions: '13.4m x 6.1m', price: 100000 }
      ]
    }
  ],
  services: [
    { id: 's1', name: 'Cho thuê giày', price: '30,000đ/đôi' },
    { id: 's2', name: 'Cho thuê áo', price: '20,000đ/bộ' },
    { id: 's3', name: 'Nước uống', price: '15,000đ/chai' },
    { id: 's4', name: 'Phòng tắm', price: 'Miễn phí' }
  ],
  events: [
    { id: 'e1', name: 'Giải đấu bóng đá cuối tuần', date: '20/05/2023', description: 'Giải đấu bóng đá 5 người dành cho các đội trong khu vực.' },
    { id: 'e2', name: 'Khuyến mãi giờ vàng', date: '01/06/2023 - 30/06/2023', description: 'Giảm 20% giá thuê sân từ 13:00 - 16:00 các ngày trong tuần.' }
  ],
  reviews: [
    { id: 'r1', user: 'Trần Văn B', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 5, comment: 'Sân rất đẹp, dịch vụ tốt, nhân viên thân thiện.', date: '15/04/2023' },
    { id: 'r2', user: 'Lê Thị C', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', rating: 4, comment: 'Sân tốt, giá cả hợp lý. Chỉ có điều đôi khi hơi đông.', date: '20/03/2023' },
    { id: 'r3', user: 'Phạm Văn D', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', rating: 5, comment: 'Tuyệt vời! Sẽ quay lại nhiều lần nữa.', date: '05/05/2023' }
  ],
  overallRating: 4.7,
  location: {
    lat: 10.762622,
    lng: 106.660172
  }
};

const DetailFacility: React.FC = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(facilityData.images[0]);
  const [activeTab, setActiveTab] = useState('general');
//   const mapLibraries = ['marker'] 
  // Use the useJsApiLoader hook instead of LoadScript
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
//     libraries: mapLibraries
//   });

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'active':
        return <Tag color="success" className="text-base px-3 py-1">Đang hoạt động</Tag>;
      case 'closed':
        return <Tag color="error" className="text-base px-3 py-1">Đang đóng cửa</Tag>;
      case 'maintenance':
        return <Tag color="warning" className="text-base px-3 py-1">Đang bảo trì</Tag>;
      default:
        return <Tag color="default" className="text-base px-3 py-1">Không xác định</Tag>;
    }
  };

  const handleBookingClick = () => {
    navigate(`/booking/${facilityData.id}`);
  };

  // Define breadcrumb items
  const breadcrumbItems = [
    {
      title: <Link to="/">Trang chủ</Link>,
    },
    {
      title: <Link to="/search">Tìm kiếm</Link>,
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
      label: 'Sự kiện',
    },
  ];

  // Define collapse items for field groups
  const getCollapseItems = () => {
    return facilityData.fieldGroups.map(group => ({
      key: group.id,
      label: (
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">{group.name}</span>
          <span className="text-gray-500">{group.fields.length} sân</span>
        </div>
      ),
      children: (
        <List
          itemLayout="horizontal"
          dataSource={group.fields}
          renderItem={field => (
            <List.Item
              actions={[
                <Text key="price" className="text-blue-600 font-semibold">{field.price.toLocaleString()}đ/giờ</Text>,
                <Button key="book" type="primary" size="small" onClick={handleBookingClick}>Đặt sân</Button>
              ]}
            >
              <List.Item.Meta
                title={<Text strong>{field.name}</Text>}
                description={
                  <Space direction="vertical">
                    <Text>Bề mặt: {field.surface}</Text>
                    <Text>Kích thước: {field.dimensions}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      ),
    }));
  };

  // Create a ref for the map
//   const mapRef = React.useRef<google.maps.Map | null>(null);
  
//   // Create a ref for the marker
//   const markerRef = React.useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  
//   // Handle map load
//   const onMapLoad = React.useCallback((map: google.maps.Map) => {
//     mapRef.current = map;
    
//     // Create the advanced marker when the map is loaded
//     if (window.google && window.google.maps) {
//       // Create a marker element
//       const markerElement = document.createElement('div');
//       markerElement.className = 'marker';
//       markerElement.style.color = 'red';
//       markerElement.innerHTML = '📍';
      
//       // Create the advanced marker
//       markerRef.current = new google.maps.marker.AdvancedMarkerElement({
//         map,
//         position: facilityData.location,
//         content: markerElement
//       });
//     }
//   }, []);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Section 1: Breadcrumb, Facility Name, Status, and Images */}
      <section className="mb-8">
        <Breadcrumb items={breadcrumbItems} className="mb-4" />

        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="m-0">{facilityData.name}</Title>
          {getStatusTag(facilityData.status)}
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <Image
              src={mainImage}
              alt={facilityData.name}
              className="w-full h-96 object-cover rounded-lg"
              preview={{
                mask: <div className="flex items-center justify-center"><ExpandOutlined /> Xem ảnh lớn</div>
              }}
            />
          </div>
          <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-4">
            {facilityData.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative cursor-pointer" onClick={() => handleImageClick(image)}>
                <Image
                  src={image}
                  alt={`${facilityData.name} ${index + 1}`}
                  className="w-full h-44 object-cover rounded-lg"
                  preview={false}
                />
                {index === 3 && facilityData.images.length > 5 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <Text className="text-white text-lg font-bold">+{facilityData.images.length - 5}</Text>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Main Content with Tabs */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            className="w-full md:w-auto"
            size="large"
            items={tabItems}
          />
          <Button 
            type="primary" 
            size="large" 
            onClick={handleBookingClick}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Đặt sân ngay
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {activeTab === 'general' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <Title level={4} className="mb-3">Giờ hoạt động</Title>
                    <div className="flex items-center">
                      <ClockCircleOutlined className="mr-2 text-blue-600" />
                      <Text>{facilityData.operatingHours.start} - {facilityData.operatingHours.end}</Text>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Title level={4} className="mb-3">Địa chỉ</Title>
                    <div className="flex items-center">
                      <EnvironmentOutlined className="mr-2 text-blue-600" />
                      <Text>{facilityData.address}</Text>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Title level={4} className="mb-3">Thông tin liên hệ</Title>
                    <div className="flex items-center mb-2">
                      <UserOutlined className="mr-2 text-blue-600" />
                      <Text>{facilityData.owner.name}</Text>
                    </div>
                    <div className="flex items-center">
                      <PhoneOutlined className="mr-2 text-blue-600" />
                      <Text>{facilityData.owner.phone}</Text>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <Title level={4} className="mb-3">Môn thể thao</Title>
                    <div className="flex flex-wrap gap-2">
                      {facilityData.sports.map((sport, index) => (
                        <Tag key={index} color="blue" className="px-3 py-1 text-base">{sport}</Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Title level={4} className="mb-3">Mô tả</Title>
                    <Paragraph>{facilityData.description}</Paragraph>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fields' && (
            <div>
              <Title level={4} className="mb-4">Danh sách sân</Title>
              <Collapse 
                defaultActiveKey={['fg1']} 
                className="mb-4"
                items={getCollapseItems()}
              />
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <Title level={4} className="mb-4">Dịch vụ</Title>
              <List
                itemLayout="horizontal"
                dataSource={facilityData.services}
                renderItem={service => (
                  <List.Item
                    actions={[
                      <Text key="price" className="text-blue-600 font-semibold">{service.price}</Text>
                    ]}
                  >
                    <List.Item.Meta
                      title={<Text strong>{service.name}</Text>}
                    />
                  </List.Item>
                )}
              />
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <Title level={4} className="mb-4">Sự kiện</Title>
              <List
                itemLayout="vertical"
                dataSource={facilityData.events}
                renderItem={event => (
                  <List.Item>
                    <List.Item.Meta
                      title={<Text strong>{event.name}</Text>}
                      description={<Text type="secondary">Thời gian: {event.date}</Text>}
                    />
                    <Paragraph>{event.description}</Paragraph>
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Reviews */}
      <section className="mb-8">
        <Card className="shadow-md">
          <Title level={3} className="mb-6">Đánh giá</Title>
          
          <div className="flex items-center mb-6">
            <div className="mr-8 text-center">
              <Title level={1} className="m-0 text-blue-600">{facilityData.overallRating}</Title>
              <Rate disabled defaultValue={facilityData.overallRating} allowHalf />
              <Text className="block mt-2">{facilityData.reviews.length} đánh giá</Text>
            </div>
            <Divider type="vertical" className="h-20" />
            <div>
              <Title level={4} className="mb-2">Đánh giá của người chơi</Title>
              <Text>Dựa trên trải nghiệm thực tế của người chơi đã đặt sân tại cơ sở này</Text>
            </div>
          </div>

          <Divider />

          <List
            itemLayout="vertical"
            dataSource={facilityData.reviews}
            renderItem={review => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={review.avatar} size={48} />}
                  title={
                    <div className="flex items-center">
                      <Text strong className="mr-2">{review.user}</Text>
                      <Rate disabled defaultValue={review.rating} className="text-sm" />
                    </div>
                  }
                  description={<Text type="secondary">{review.date}</Text>}
                />
                <Paragraph>{review.comment}</Paragraph>
              </List.Item>
            )}
          />

          <div className="mt-4 text-center">
            <Button 
              type="default" 
              icon={<CommentOutlined />}
              onClick={() => setActiveTab('reviews')}
            >
              Viết đánh giá
            </Button>
          </div>
        </Card>
      </section>

      {/* Section 4: Map */}
      <section>
      <div className="h-96 w-full">
  <img 
    src={`https://maps.googleapis.com/maps/api/staticmap?center=${facilityData.location.lat},${facilityData.location.lng}&zoom=15&size=600x400&markers=color:red%7C${facilityData.location.lat},${facilityData.location.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
    alt="Bản đồ vị trí cơ sở"
    className="w-full h-full object-cover"
  />
</div>
      </section>
    </div>
  );
};

export default DetailFacility;