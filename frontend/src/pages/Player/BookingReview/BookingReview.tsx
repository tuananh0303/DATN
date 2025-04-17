import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card, Typography, Form, Rate, Input, Button, Space,
  notification, Upload, Divider, Modal
} from 'antd';
import {
  StarOutlined, PictureOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import api from '@/services/api';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Format tiền tệ
const formatCurrency = (amount: number | null) => {
  if (amount === null) return '0 đ';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

// Service methods for bookings
const bookingService = {
  async getBookingDetail(bookingId: string) {
    try {
      const response = await api.get(`/booking/${bookingId}/detail`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking detail:', error);
      throw error;
    }
  },

  async submitReview(bookingId: string, reviewData: ReviewFormValues) {
    try {
      const formData = new FormData();
      formData.append('rating', reviewData.rating.toString());
      formData.append('comment', reviewData.comment);
      
      // Append images if any
      if (reviewData.images && reviewData.images.length > 0) {
        reviewData.images.forEach((file) => {
          if (file.originFileObj) {
            formData.append('images', file.originFileObj);
          }
        });
      }

      const response = await api.post(`/booking/${bookingId}/review`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  }
};

interface Facility {
  id: string;
  name: string;
  description: string;
  location: string;
  status: string;
  avgRating: number;
  numberOfRating: number;
  imagesUrl: string[];
  fieldGroups: FieldGroup[];
}

interface FieldGroup {
  id: string;
  name: string;
  dimension: string;
  surface: string;
  basePrice: number;
}

interface Sport {
  id: number;
  name: string;
}

interface Field {
  id: number;
  name: string;
  status: string;
}

interface BookingSlot {
  id: number;
  date: string;
  field: Field;
}

interface Payment {
  id: string;
  fieldPrice: number;
  servicePrice: number | null;
  discount: number | null;
  status: string;
  updatedAt: string;
}

interface BookingData {
  id: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  sport: Sport;
  bookingSlots: BookingSlot[];
  payment: Payment;
  hasReview?: boolean;
}

interface BookingDetailData {
  facility: Facility;
  booking: BookingData;
}

interface ReviewFormValues {
  rating: number;
  comment: string;
  images: UploadFile[];
}

const BookingReview: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm<ReviewFormValues>();
  const [bookingDetail, setBookingDetail] = useState<BookingDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        setLoading(true);
        if (!bookingId) return;
        
        const data = await bookingService.getBookingDetail(bookingId);
        setBookingDetail(data);
      } catch (error) {
        console.error('Failed to fetch booking detail:', error);
        notification.error({
          message: 'Không thể tải thông tin đặt sân',
          description: 'Đã xảy ra lỗi khi tải thông tin chi tiết đặt sân. Vui lòng thử lại sau.'
        });
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingDetail();
    }
  }, [bookingId]);

  // Xử lý upload ảnh
  const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Xử lý xem trước ảnh
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    setPreviewImage(file.url || file.preview || null);
    setPreviewModalVisible(true);
  };

  // Convert File to base64
  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Xử lý gửi đánh giá
  const handleSubmitReview = async (values: ReviewFormValues) => {
    if (!bookingId) return;
    
    try {
      setSubmitting(true);
      await bookingService.submitReview(bookingId, values);
      
      notification.success({
        message: 'Đánh giá thành công',
        description: 'Cảm ơn bạn đã đánh giá trải nghiệm sử dụng sân của chúng tôi!',
      });
      
      setReviewSubmitted(true);
    } catch (error) {
      console.error('Failed to submit review:', error);
      notification.error({
        message: 'Đánh giá thất bại',
        description: 'Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!bookingDetail) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <div className="text-center py-10">
            <Title level={4}>Không tìm thấy thông tin đặt sân</Title>
            <Paragraph className="mt-2">
              Bạn chỉ có thể đánh giá các đơn đặt sân đã hoàn thành.
            </Paragraph>
            <Button 
              type="primary" 
              onClick={() => navigate('/user/history-booking')}
              className="mt-4"
            >
              Quay lại lịch sử đặt sân
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const { facility, booking } = bookingDetail;

  if (reviewSubmitted) {
    return (
      <div className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <Card className="shadow-md">
            <div className="text-center py-8 md:py-10">
              <CheckCircleOutlined className="text-green-500 text-4xl md:text-5xl mb-4" />
              <Title level={3} className="text-xl md:text-2xl">Cảm ơn bạn đã đánh giá!</Title>
              <Paragraph className="mt-2">
                Đánh giá của bạn đã được gửi thành công và đang chờ xử lý.
              </Paragraph>
              <Paragraph className="text-gray-500">
                Những đánh giá chân thực sẽ giúp chúng tôi cải thiện dịch vụ và giúp người chơi khác lựa chọn sân tốt hơn.
              </Paragraph>
              <Space className="mt-6">
                <Button onClick={() => navigate('/user/history-booking')}>
                  Quay lại lịch sử đặt sân
                </Button>
                <Button type="primary" onClick={() => navigate('/')}>
                  Trang chủ
                </Button>
              </Space>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Title level={3}>Viết đánh giá</Title>
          <Text type="secondary">
            Chia sẻ trải nghiệm của bạn và giúp đỡ người khác tìm được sân tốt nhất
          </Text>
        </div>

        <Card className="shadow-sm rounded-lg">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmitReview}
            initialValues={{
              rating: 0,
              comment: ''
            }}
          >
            <div className="mb-6">
              <Title level={4}>Đánh giá của bạn về {facility.name}</Title>
              <Text type="secondary">
                Ngày đặt sân: {dayjs(booking.bookingSlots[0]?.date).format('DD/MM/YYYY')}
              </Text>
              <br />
              <Text type="secondary">
                {booking.bookingSlots[0]?.field.name} • {booking.startTime.substring(0, 5)} - {booking.endTime.substring(0, 5)} • {formatCurrency(booking.payment.fieldPrice)}
              </Text>
            </div>
            
            <Divider />
            
            {/* Đánh giá tổng thể */}
            <div className="mb-6">
              <Form.Item
                name="rating"
                label={<span className="font-medium">Đánh giá tổng thể</span>}
                rules={[{ required: true, message: 'Vui lòng chọn đánh giá của bạn' }]}
              >
                <Rate
                  allowHalf
                  style={{ fontSize: 36 }}
                  character={<StarOutlined />}
                />
              </Form.Item>
            </div>
            
            {/* Nhận xét chi tiết */}
            <div className="mb-6">
              <Form.Item
                name="comment"
                label={<span className="font-medium">Nhận xét của bạn</span>}
                rules={[
                  { required: true, message: 'Vui lòng nhập nhận xét của bạn' },
                  { min: 20, message: 'Nhận xét phải có ít nhất 20 ký tự' }
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Hãy chia sẻ trải nghiệm của bạn về sân này..."
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </div>
            
            {/* Upload ảnh */}
            <div className="mb-6">
              <Form.Item
                name="images"
                label={<span className="font-medium">Thêm hình ảnh (tùy chọn)</span>}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  onPreview={handlePreview}
                  beforeUpload={() => false}
                  maxCount={5}
                >
                  {fileList.length >= 5 ? null : (
                    <div>
                      <PictureOutlined />
                      <div style={{ marginTop: 8 }}>Tải lên</div>
                    </div>
                  )}
                </Upload>
                <Text type="secondary">Tối đa 5 hình ảnh, mỗi hình không quá 5MB</Text>
              </Form.Item>
            </div>
            
            <Form.Item>
              <Space>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={submitting}
                  size="large"
                >
                  Gửi đánh giá
                </Button>
                <Button 
                  size="large" 
                  onClick={() => navigate('/user/history-booking')}
                >
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        {/* Modal xem trước ảnh */}
        <Modal
          open={previewModalVisible}
          title="Xem trước"
          footer={null}
          onCancel={() => setPreviewModalVisible(false)}
        >
          {previewImage && <img alt="Preview" style={{ width: '100%' }} src={previewImage} />}
        </Modal>
      </div>
    </div>
  );
};

export default BookingReview; 