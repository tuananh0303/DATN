import React from 'react';
import { Modal, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Service, UpdatedServiceValues } from '@/types/service.type';
import { formatPrice } from '@/utils/statusUtils';

interface ServiceConfirmModalProps {
  service: Service | null;
  updatedValues: UpdatedServiceValues | null;
  onOk: () => void;
  onCancel: () => void;
  sportName: string;
}

const ServiceConfirmModal: React.FC<ServiceConfirmModalProps> = ({
  service,
  updatedValues,
  onOk,
  onCancel,
  sportName
}) => {
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

  if (!service || !updatedValues) return null;

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ExclamationCircleOutlined style={{ marginRight: '8px' }} />
          <span>Xác nhận cập nhật dịch vụ</span>
        </div>
      }
      open={!!updatedValues}
      onOk={onOk}
      onCancel={onCancel}
      okText="Cập nhật"
      okType="primary"
      cancelText="Hủy"
    >
      <div>
        <p>Bạn có chắc chắn muốn cập nhật dịch vụ này với thông tin mới?</p>
        <div className="bg-gray-50 p-3 mt-2 rounded-md">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p><strong>Tên cũ:</strong></p>
              <p className="text-gray-500">{service.name}</p>
            </div>
            <div>
              <p><strong>Tên mới:</strong></p>
              <p className="text-blue-500">{updatedValues.name}</p>
            </div>
            
            <div>
              <p><strong>Loại hình cũ:</strong></p>
              <p className="text-gray-500">{service.sport.name}</p>
            </div>
            <div>
              <p><strong>Loại hình mới:</strong></p>
              <p className="text-blue-500">{sportName}</p>
            </div>
            
            <div>
              <p><strong>Loại dịch vụ cũ:</strong></p>
              <p className="text-gray-500">{getServiceTypeTag(service.serviceType)}</p>
            </div>
            <div>
              <p><strong>Loại dịch vụ mới:</strong></p>
              <p className="text-blue-500">{getServiceTypeTag(updatedValues.serviceType)}</p>
            </div>

            <div>
              <p><strong>Trạng thái cũ:</strong></p>
              <p className="text-gray-500">{getStatusTag(service.status)}</p>
            </div>
            <div>
              <p><strong>Trạng thái mới:</strong></p>
              <p className="text-blue-500">{getStatusTag(updatedValues.status)}</p>
            </div>
            
            <div>
              <p><strong>Giá cũ:</strong></p>
              <p className="text-gray-500">{formatPrice(service.price)}/{service.unit}</p>
            </div>
            <div>
              <p><strong>Giá mới:</strong></p>
              <p className="text-blue-500">{formatPrice(updatedValues.price)}/{updatedValues.unit}</p>
            </div>
            
            <div>
              <p><strong>Số lượng cũ:</strong></p>
              <p className="text-gray-500">{service.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
            </div>
            <div>
              <p><strong>Số lượng mới:</strong></p>
              <p className="text-blue-500">{updatedValues.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
            </div>
          </div>
          
          {updatedValues.description !== service.description && (
            <div className="mt-2">
              <p><strong>Mô tả mới:</strong></p>
              <p className="text-blue-500">{updatedValues.description || 'Không có mô tả'}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ServiceConfirmModal; 