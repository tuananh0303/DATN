import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Mock data and types - these would be replaced with actual imports
// Temporarily using explicit type declarations to avoid linter errors
type Sport = {
  id: string;
  name: string;
}

// Mock functions for data
const getSportsList = (): Sport[] => {
  return [
    { id: '1', name: 'Bóng đá' },
    { id: '2', name: 'Bóng rổ' },
    { id: '3', name: 'Cầu lông' },
    { id: '4', name: 'Tennis' },
  ];
};

const createSearch = (data: Record<string, unknown>): { id: string } => {
  console.log('Creating search with data:', data);
  return { id: Math.random().toString(36).substring(2, 9) };
};

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Radio,
  InputNumber,
  Card,
  Typography,
  Row,
  Col,
  message,
  Breadcrumb,
  Space
} from 'antd';
import {
  ArrowLeftOutlined,
  PlusOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/vi_VN';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface FormValues {
  title: string;
  sportId: string;
  location: string;
  date: moment.Moment;
  timeRange: [moment.Moment, moment.Moment];
  description: string;
  cost: number;
  costType: string;
  requiredParticipants: number;
  genderRestriction: string;
  minAge: number | null;
  maxAge: number | null;
  additionalNotes: string;
}

// Add moment type
import moment from 'moment';

const PlaymateCreate: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [sports, setSports] = useState<Sport[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    // Fetch sports list
    const sportsList = getSportsList();
    setSports(sportsList);
  }, []);

  const onFinish = (values: FormValues) => {
    setSubmitting(true);
    
    // Prepare data
    const searchData = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      timeStart: values.timeRange[0].format('HH:mm'),
      timeEnd: values.timeRange[1].format('HH:mm'),
      participants: {
        required: values.requiredParticipants,
        current: 1 // Creator is the first participant
      },
      // Mock user info
      userId: 'current_user_id',
      userInfo: {
        name: 'Người dùng hiện tại',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        gender: 'male',
        phoneNumber: '0987123456'
      }
    };
    
    // Use object rest destructuring to omit unwanted properties
    const { timeRange, requiredParticipants, ...finalData } = searchData;
    
    // Create search (mock API call)
    setTimeout(() => {
      try {
        const newSearch = createSearch(finalData);
        message.success('Đã tạo bài đăng tìm bạn chơi thành công!');
        navigate(`/user/playmate/${newSearch.id}`);
      } catch (error) {
        console.error('Error creating playmate search:', error);
        message.error('Có lỗi xảy ra khi tạo bài đăng. Vui lòng thử lại sau.');
        setSubmitting(false);
      }
    }, 1000);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    message.error('Vui lòng kiểm tra lại thông tin đã nhập');
    console.log('Failed:', errorInfo);
  };

  const handleGoBack = () => {
    navigate('/user/playmate');
  };

  return (
    <div className="w-full px-4 py-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4 md:mb-6">
          <Breadcrumb.Item>
            <Link to="/user/dashboard">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/user/playmate">Tìm bạn chơi</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Tạo mới</Breadcrumb.Item>
        </Breadcrumb>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button 
              onClick={handleGoBack} 
              icon={<ArrowLeftOutlined />} 
              className="mb-4"
            >
              Quay lại
            </Button>
            <Card className="shadow-md">
              <Title level={2} className="mb-6 text-xl md:text-2xl">Tạo bài đăng tìm bạn chơi</Title>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                requiredMark="optional"
                scrollToFirstError
              >
                <Card title="Thông tin cơ bản" className="mb-4 border border-gray-200">
                  <Row gutter={16}>
                    <Col xs={24} md={16}>
                      <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                      >
                        <Input placeholder="Nhập tiêu đề cho bài đăng của bạn" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        label="Môn thể thao"
                        name="sportId"
                        rules={[{ required: true, message: 'Vui lòng chọn môn thể thao!' }]}
                      >
                        <Select placeholder="Chọn môn thể thao">
                          {sports.map(sport => (
                            <Option key={sport.id} value={sport.id}>{sport.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Địa điểm"
                    name="location"
                    rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
                  >
                    <Input placeholder="Nhập địa điểm (VD: Sân bóng ABC, 123 Đường XYZ)" />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Ngày"
                        name="date"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                      >
                        <DatePicker 
                          locale={locale} 
                          format="DD/MM/YYYY" 
                          className="w-full" 
                          placeholder="Chọn ngày" 
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Thời gian"
                        name="timeRange"
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
                      >
                        <TimePicker.RangePicker 
                          format="HH:mm" 
                          className="w-full" 
                          placeholder={['Từ', 'Đến']} 
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                  >
                    <TextArea 
                      rows={4} 
                      placeholder="Mô tả chi tiết về buổi chơi thể thao (kĩ năng yêu cầu, dụng cụ cần mang theo...)" 
                    />
                  </Form.Item>
                </Card>

                <Card title="Chi phí" className="mb-4 border border-gray-200">
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Chi phí dự kiến"
                        name="cost"
                        rules={[{ required: true, message: 'Vui lòng nhập chi phí!' }]}
                      >
                        <InputNumber 
                          min={0} 
                          step={1000} 
                          className="w-full" 
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={(value): 0 => value ? Number(value.replace(/\s?|(,*)/g, '')) as 0 : 0}
                          placeholder="Nhập chi phí" 
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Loại chi phí"
                        name="costType"
                        initialValue="perPerson"
                        rules={[{ required: true, message: 'Vui lòng chọn loại chi phí!' }]}
                      >
                        <Radio.Group>
                          <Radio value="perPerson">Tính trên đầu người</Radio>
                          <Radio value="total">Tổng chi phí</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Yêu cầu người tham gia" className="mb-4 border border-gray-200">
                  <Row gutter={16}>
                    <Col xs={24} md={8}>
                      <Form.Item
                        label="Số người cần thiết"
                        name="requiredParticipants"
                        initialValue={2}
                        rules={[{ required: true, message: 'Vui lòng nhập số người cần thiết!' }]}
                      >
                        <InputNumber 
                          min={2} 
                          max={50} 
                          className="w-full" 
                          placeholder="Số người cần thiết"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        label="Giới tính"
                        name="genderRestriction"
                        initialValue="any"
                      >
                        <Select placeholder="Chọn giới tính">
                          <Option value="any">Không giới hạn</Option>
                          <Option value="male">Nam</Option>
                          <Option value="female">Nữ</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={4}>
                      <Form.Item
                        label="Độ tuổi từ"
                        name="minAge"
                      >
                        <InputNumber 
                          min={0} 
                          className="w-full" 
                          placeholder="Từ"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={4}>
                      <Form.Item
                        label="Đến"
                        name="maxAge"
                      >
                        <InputNumber 
                          min={0} 
                          className="w-full" 
                          placeholder="Đến"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Ghi chú thêm"
                    name="additionalNotes"
                  >
                    <TextArea 
                      rows={3} 
                      placeholder="Các yêu cầu khác với người tham gia (nếu có)" 
                    />
                  </Form.Item>
                </Card>

                <Form.Item>
                  <Space>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      icon={<PlusOutlined />} 
                      loading={submitting}
                      size="large"
                    >
                      Tạo bài đăng
                    </Button>
                    <Button onClick={handleGoBack} size="large">Hủy</Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PlaymateCreate; 