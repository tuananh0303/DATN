import React from 'react';
import { Modal, Descriptions, Badge, Button, Image, Tag, Divider } from 'antd';
import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import { Event } from '@/types/event.type';
import { formatDate, formatDateRange } from '@/utils/dateUtils';

interface EventDetailModalProps {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
  onEdit: (event: Event) => void;
}

// Mock sports data
const mockSports: Record<number, string> = {
  1: 'Bóng đá',
  2: 'Bóng rổ',
  3: 'Tennis',
  4: 'Cầu lông'
};

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  visible,
  event,
  onClose,
  onEdit
}) => {
  if (!event) return null;

  // Get the event details from mock data
  const eventDetail = mockEventDetails[event.id];
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'success',
      upcoming: 'warning',
      expired: 'error'
    };
    return statusMap[status] || 'default';
  };

  // Get status text
  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'Đang diễn ra',
      upcoming: 'Sắp diễn ra',
      expired: 'Đã kết thúc'
    };
    return statusMap[status] || status;
  };

  // Get event type text
  const getEventTypeText = (type: string) => {
    const typeMap: Record<string, string> = {
      'TOURNAMENT': 'Giải đấu',
      'DISCOUNT': 'Khuyến mãi',
      'SPECIAL_OFFER': 'Ưu đãi đặc biệt'
    };
    return typeMap[type] || type;
  };

  // Get facility name
  const getFacilityName = (facilityId: string) => {
    const facilityMap: Record<string, string> = {
      '1': 'Sân bóng đá Phạm Kha',
      '2': 'Sân Tennis Bình Chánh',
      '3': 'Sân bóng rổ Quận 7',
      '4': 'Sân cầu lông Phạm Kha'
    };
    return facilityMap[facilityId] || 'Không xác định';
  };

  // Get sport name
  const getSportName = (sportId?: number) => {
    if (!sportId) return 'Không xác định';
    return mockSports[sportId] || 'Không xác định';
  };

  // Format date time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal
      title="Chi tiết sự kiện"
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
        <Button 
          key="edit" 
          type="primary" 
          icon={<EditOutlined />} 
          onClick={() => onEdit(event)}
        >
          Chỉnh sửa
        </Button>
      ]}
    >
      {/* Event Image */}
      {(event.image || event.bannerImage) && (
        <div className="mb-4">
          <Image
            src={event.bannerImage || event.image || `https://via.placeholder.com/800x300?text=${event.name}`}
            alt={event.name}
            style={{ maxHeight: 300, width: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      <Descriptions bordered column={2} className="mt-4">
        <Descriptions.Item label="Tên sự kiện" span={2}>
          {event.name}
        </Descriptions.Item>
        
        <Descriptions.Item label="Mã sự kiện">
          {event.id}
        </Descriptions.Item>
        
        <Descriptions.Item label="Trạng thái">
          <Badge status={getStatusBadge(event.status) as "success" | "warning" | "error" | "default" | "processing"} text={getStatusText(event.status)} />
        </Descriptions.Item>
        
        <Descriptions.Item label="Thời gian diễn ra" span={2}>
          {formatDateRange(event.startDate, event.endDate)}
        </Descriptions.Item>
        
        <Descriptions.Item label="Mô tả" span={2}>
          {event.description}
        </Descriptions.Item>
        
        {event.eventType && (
          <Descriptions.Item label="Loại sự kiện">
            {getEventTypeText(event.eventType)}
          </Descriptions.Item>
        )}
        
        {event.facilityId && (
          <Descriptions.Item label="Cơ sở">
            {getFacilityName(event.facilityId)}
          </Descriptions.Item>
        )}
        
        {event.location && (
          <Descriptions.Item label="Vị trí cụ thể" span={2}>
            {event.location}
          </Descriptions.Item>
        )}

        {/* Registration Link */}
        {event.registrationLink && (
          <Descriptions.Item label="Link đăng ký" span={2}>
            <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
              <Button type="link" icon={<LinkOutlined />} style={{ padding: 0 }}>
                {event.registrationLink}
              </Button>
            </a>
          </Descriptions.Item>
        )}

        <Divider orientation="left">Chi tiết theo loại sự kiện</Divider>
        
        {/* Tournament specific fields */}
        {event.eventType === 'TOURNAMENT' && (
          <>
            {eventDetail?.targetSportId && (
              <Descriptions.Item label="Môn thể thao">
                {getSportName(eventDetail.targetSportId)}
              </Descriptions.Item>
            )}
            
            {eventDetail?.tournamentFormat && (
              <Descriptions.Item label="Thể thức thi đấu">
                {eventDetail.tournamentFormat}
              </Descriptions.Item>
            )}

            {eventDetail?.fields && eventDetail.fields.length > 0 && (
              <Descriptions.Item label="Sân tổ chức" span={2}>
                {eventDetail.fields.join(', ')}
              </Descriptions.Item>
            )}
            
            {eventDetail?.maxParticipants && (
              <Descriptions.Item label="Số người tham gia tối đa">
                {eventDetail.maxParticipants}
              </Descriptions.Item>
            )}

            {eventDetail?.minParticipants && (
              <Descriptions.Item label="Số người tham gia tối thiểu">
                {eventDetail.minParticipants}
              </Descriptions.Item>
            )}
            
            {eventDetail?.currentParticipants !== undefined && (
              <Descriptions.Item label="Số người đã đăng ký">
                {eventDetail.currentParticipants}
              </Descriptions.Item>
            )}
            
            {eventDetail?.registrationEndDate && (
              <Descriptions.Item label="Hạn đăng ký" span={2}>
                {formatDateTime(eventDetail.registrationEndDate)}
              </Descriptions.Item>
            )}

            {eventDetail?.registrationFee !== undefined && (
              <Descriptions.Item label="Phí đăng ký">
                {eventDetail.registrationFee.toLocaleString('vi-VN')} VNĐ
              </Descriptions.Item>
            )}
            
            {eventDetail?.prizes && eventDetail.prizes.length > 0 && (
              <Descriptions.Item label="Giải thưởng" span={2}>
                <ul className="list-disc pl-5">
                  {eventDetail.prizes.map((prize, index) => (
                    <li key={index}>
                      Giải {prize.position}: {prize.prize}
                    </li>
                  ))}
                </ul>
              </Descriptions.Item>
            )}

            {eventDetail?.rules && (
              <Descriptions.Item label="Luật thi đấu" span={2}>
                {eventDetail.rules}
              </Descriptions.Item>
            )}
          </>
        )}

        {/* Discount specific fields */}
        {event.eventType === 'DISCOUNT' && (
          <>
            {eventDetail?.discountPercent && (
              <Descriptions.Item label="Mức giảm giá">
                <Tag color="green">{eventDetail.discountPercent}%</Tag>
              </Descriptions.Item>
            )}

            {eventDetail?.discountCode && (
              <Descriptions.Item label="Mã giảm giá">
                <Tag color="cyan">{eventDetail.discountCode}</Tag>
              </Descriptions.Item>
            )}
            
            {eventDetail?.conditions && (
              <Descriptions.Item label="Điều kiện áp dụng" span={2}>
                {eventDetail.conditions}
              </Descriptions.Item>
            )}

            {eventDetail?.minBookingValue !== undefined && (
              <Descriptions.Item label="Giá trị đặt sân tối thiểu">
                {eventDetail.minBookingValue.toLocaleString('vi-VN')} VNĐ
              </Descriptions.Item>
            )}
          </>
        )}

        
        
        <Divider />
        
        <Descriptions.Item label="Thời gian tạo">
          {formatDate(event.createdAt)}
        </Descriptions.Item>
        
        <Descriptions.Item label="Cập nhật lần cuối">
          {formatDate(event.updatedAt)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default EventDetailModal; 