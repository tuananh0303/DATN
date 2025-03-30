import React from 'react';
import { Modal, Button, Typography, Tag, Divider } from 'antd';
import { Service } from '@/types/service.type';
import { formatPrice } from '@/utils/statusUtils';

const { Text } = Typography;

interface ServiceDetailModalProps {
  visible: boolean;
  service: Service | null;
  onClose: () => void;
  onEdit: (service: Service) => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  visible,
  service,
  onClose,
  onEdit
}) => {
  // Helper function to format date
  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('vi-VN');
  };

  // Helper function để hiển thị trạng thái
  const getStatusTag = (status: string) => {
    const config: Record<string, { color: string, text: string }> = {
      available: { color: 'success', text: 'Còn hàng' },
      low_stock: { color: 'warning', text: 'Sắp hết' },
      out_of_stock: { color: 'error', text: 'Hết hàng' },
      discontinued: { color: 'default', text: 'Ngừng kinh doanh' },
    };
    const statusConfig = config[status] || { color: 'default', text: status };
    return <Tag color={statusConfig.color}>{statusConfig.text}</Tag>;
  };

  // Helper function để hiển thị loại dịch vụ
  const getServiceTypeTag = (type: string) => {
    const config: Record<string, { color: string, text: string }> = {
      rental: { color: 'blue', text: 'Cho thuê' },
      coaching: { color: 'purple', text: 'Huấn luyện' },
      equipment: { color: 'cyan', text: 'Thiết bị' },
      food: { color: 'green', text: 'Đồ uống/Thực phẩm' },
      other: { color: 'gray', text: 'Khác' },
    };
    const typeConfig = config[type] || { color: 'default', text: type };
    return <Tag color={typeConfig.color}>{typeConfig.text}</Tag>;
  };

  return (
    <Modal
      title="Chi tiết dịch vụ"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
        <Button 
          key="edit" 
          type="primary" 
          onClick={() => {
            if (service) {
              onEdit(service);
            }
          }}
          disabled={!service}
        >
          Chỉnh sửa
        </Button>
      ]}
      width={600}
    >
      {service && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Text strong className="text-lg">{service.name}</Text>
              <div className="mt-1 flex gap-1">
                <Tag color="blue">{service.sport.name}</Tag>
                {getServiceTypeTag(service.serviceType)}
                {getStatusTag(service.status)}
              </div>
            </div>
            <div className="text-right">
              <Text strong className="text-lg text-red-500">{formatPrice(service.price)}/{service.unit}</Text>
              <div className="mt-1">
                <Text type="secondary">Còn {service.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} sản phẩm</Text>
              </div>
            </div>
          </div>
          
          <Divider />
          
          <div>
            <Text strong>Mô tả dịch vụ:</Text>
            <p className="mt-1">{service.description || 'Không có mô tả'}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <Text strong>Thông tin bổ sung:</Text>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Text type="secondary">ID dịch vụ:</Text>
                <p>{service.id}</p>
              </div>
              <div>
                <Text type="secondary">Loại hình thể thao:</Text>
                <p>{service.sport.name}</p>
              </div>
              <div>
                <Text type="secondary">Giá dịch vụ:</Text>
                <p>{formatPrice(service.price)}/{service.unit}</p>
              </div>
              <div>
                <Text type="secondary">Số lượng còn lại:</Text>
                <p>{service.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
              </div>
              <div>
                <Text type="secondary">Độ phổ biến:</Text>
                <p>{service.popularityScore}/100</p>
              </div>
              <div>
                <Text type="secondary">Lượt đặt:</Text>
                <p>{service.bookedCount}</p>
              </div>
              <div>
                <Text type="secondary">Đang sử dụng:</Text>
                <p>{service.inUseCount}</p>
              </div>
              <div>
                <Text type="secondary">Cập nhật cuối:</Text>
                <p>{formatDate(service.lastUpdated)}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <Text type="secondary">
              * Lưu ý: Quản lý đầy đủ thông tin dịch vụ để tăng hiệu quả kinh doanh
            </Text>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ServiceDetailModal; 