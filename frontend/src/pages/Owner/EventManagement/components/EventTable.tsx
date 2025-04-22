import React from 'react';
import { Table, Tag, Button, Space, Tooltip, Dropdown, Menu } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, MoreOutlined, TeamOutlined } from '@ant-design/icons';
import { Event } from '@/types/event.type';
import dayjs from 'dayjs';

interface EventTableProps {
  events: Event[];
  loading: boolean;
  onView: (event: Event) => void;
  onEdit: (event: Event) => void;
  onDelete: (eventId: number) => void;
  onManageRegistrations: (event: Event) => void;
  getRegistrationBadge?: (eventId: number) => React.ReactNode;
}

const EventTable: React.FC<EventTableProps> = ({ 
  events, 
  loading, 
  onView, 
  onEdit, 
  onDelete, 
  onManageRegistrations,
  getRegistrationBadge
}) => {
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'draft':
        return <Tag color="gray">Nháp</Tag>;
      case 'published':
        return <Tag color="green">Đã đăng</Tag>;
      case 'closed':
        return <Tag color="orange">Đã đóng</Tag>;
      case 'cancelled':
        return <Tag color="red">Đã hủy</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  const formatDate = (date: string) => {
    return dayjs(date).format('DD/MM/YYYY HH:mm');
  };

  const columns = [
    {
      title: 'Tên sự kiện',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Event) => (
        <Space>
          <span className="font-medium">{text}</span>
          {getRegistrationBadge && getRegistrationBadge(record.id)}
        </Space>
      ),
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Phí tham gia',
      dataIndex: 'fee',
      key: 'fee',
      render: (fee: number) => fee > 0 ? `${fee.toLocaleString('vi-VN')} đ` : 'Miễn phí',
    },
    {
      title: 'Đã đăng ký/Tối đa',
      key: 'capacity',
      render: (_, record: Event) => `${record.registeredCount || 0}/${record.maxParticipants}`,
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
      render: (_, record: Event) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => onView(record)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => onEdit(record)}
              disabled={record.status === 'cancelled'}
            />
          </Tooltip>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item 
                  key="registrations" 
                  icon={<TeamOutlined />}
                  onClick={() => onManageRegistrations(record)}
                >
                  Quản lý đăng ký
                </Menu.Item>
                <Menu.Item 
                  key="delete" 
                  icon={<DeleteOutlined />} 
                  danger
                  onClick={() => onDelete(record.id)}
                >
                  Xóa
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={events.map(event => ({ ...event, key: event.id }))}
      loading={loading}
      pagination={{ pageSize: 10 }}
      rowClassName="py-3"
      className="bg-white rounded-lg shadow-sm"
    />
  );
};

export default EventTable; 