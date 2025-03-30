import React from 'react';
import { Table, Space, Button, Tooltip, Tag, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Service } from '@/types/service.type';
import { formatPrice } from '@/utils/statusUtils';

const { Text } = Typography;

interface ServiceTableProps {
  services: Service[];
  currentPage: number;
  itemsPerPage: number;
  totalServices: number;
  onPageChange: (page: number) => void;
  onViewService: (service: Service) => void;
  onEditService: (service: Service) => void;
  onDeleteService: (serviceId: string) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  currentPage,
  itemsPerPage,
  totalServices,
  onPageChange,
  onViewService,
  onEditService,
  onDeleteService
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

  // Table columns
  const columns = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Loại hình',
      dataIndex: ['sport', 'name'],
      key: 'sport',
      render: (text: string) => (
        <Tag color="blue" style={{ borderRadius: '4px', padding: '2px 8px' }}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Loại dịch vụ',
      dataIndex: 'serviceType',
      key: 'serviceType',
      render: (type: string) => getServiceTypeTag(type),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number, record: Service) => (
        <div>
          {formatPrice(price)}/{record.unit}
        </div>
      ),
    },
    {
      title: 'Tồn kho',
      key: 'inventory',
      render: (record: Service) => (
        <div>
          <div>{record.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Đang sử dụng: {record.inUseCount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: Service) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined style={{ color: '#1890ff' }} />}
              onClick={() => onViewService(record)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: '#52c41a' }} />}
              onClick={() => onEditService(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
              onClick={() => onDeleteService(record.id.toString())}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={services}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: totalServices,
          onChange: onPageChange,
          showSizeChanger: false
        }}
        scroll={{ x: 1100 }}
      />
    </div>
  );
};

export default ServiceTable; 