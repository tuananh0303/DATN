import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Space, Tag, message, Card, Tabs, Modal, Descriptions, Image } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { approvalService } from '@/services/approval.service';
import { Approval, ApprovalFilter } from '@/types/approval.types';

const { Option } = Select;
const { TabPane } = Tabs;

const ApprovalPage: React.FC = () => {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(null);

  useEffect(() => {
    fetchApprovals();
  }, [activeTab]);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const filter: ApprovalFilter = {
        status: activeTab as 'pending' | 'approved' | 'rejected',
        type: filterType as Approval['type'] | undefined
      };
      const response = await approvalService.getApprovals(filter);
      setApprovals(response.data);
    } catch (error) {
      console.error('Error fetching approvals:', error);
      message.error('Không thể tải danh sách yêu cầu phê duyệt');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approvalService.approveRequest(id);
      message.success('Đã phê duyệt yêu cầu');
      fetchApprovals();
    } catch (error) {
      console.error('Error approving request:', error);
      message.error('Không thể phê duyệt yêu cầu');
    }
  };

  const handleReject = async (id: string) => {
    setSelectedApprovalId(id);
    setRejectModalVisible(true);
  };

  const confirmReject = async () => {
    if (!selectedApprovalId || !rejectReason) return;
    
    try {
      await approvalService.rejectRequest(selectedApprovalId, rejectReason);
      message.success('Đã từ chối yêu cầu');
      setRejectModalVisible(false);
      setRejectReason('');
      fetchApprovals();
    } catch (error) {
      console.error('Error rejecting request:', error);
      message.error('Không thể từ chối yêu cầu');
    }
  };

  const handleViewDetails = (approval: Approval) => {
    setSelectedApproval(approval);
    setDetailsModalVisible(true);
  };

  const getApprovalTypeText = (type: string) => {
    switch (type) {
      case 'facility':
        return 'Đăng ký cơ sở mới';
      case 'facility_name':
        return 'Thay đổi tên cơ sở';
      case 'certificate':
        return 'Giấy chứng nhận';
      case 'license':
        return 'Giấy phép kinh doanh';
      default:
        return type;
    }
  };

  const columns = [
    {
      title: 'Loại yêu cầu',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={
          type === 'facility' ? 'blue' :
          type === 'facility_name' ? 'orange' :
          type === 'certificate' ? 'green' :
          type === 'license' ? 'purple' : 'default'
        }>
          {getApprovalTypeText(type)}
        </Tag>
      ),
    },
    {
      title: 'Cơ sở',
      key: 'facility',
      render: (record: Approval) => (
        <div>
          <div>{record.facility?.name || 'N/A'}</div>
          {record.facility?.id && (
            <div className="text-xs text-gray-500">ID: {record.facility.id}</div>
          )}
        </div>
      ),
    },
    {
      title: 'Thông tin thêm',
      key: 'info',
      render: (record: Approval) => {
        if (record.type === 'facility_name' && record.name) {
          return <div>Tên mới: {record.name}</div>;
        } else if (record.type === 'license' && record.sport) {
          return <div>Môn thể thao: {record.sport.name}</div>;
        }
        return <div>-</div>;
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (record: Approval) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Chi tiết
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="link"
                danger
                icon={<CloseOutlined />}
                onClick={() => handleReject(record.id)}
              >
                Từ chối
              </Button>
              <Button
                type="link"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record.id)}
              >
                Duyệt
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = searchText === '' || 
      approval.facility?.name?.toLowerCase().includes(searchText.toLowerCase());
      
    const matchesType = filterType === null || approval.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quản lý phê duyệt</h1>
      </div>
      
      <Tabs 
        activeKey={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      >
        <TabPane tab="Đang chờ" key="pending" />
        <TabPane tab="Đã duyệt" key="approved" />
        <TabPane tab="Đã từ chối" key="rejected" />
      </Tabs>
      
      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Tìm kiếm theo tên cơ sở..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          
          <Select
            placeholder="Lọc theo loại yêu cầu"
            allowClear
            style={{ width: 200 }}
            onChange={value => setFilterType(value)}
            value={filterType}
          >
            <Option value="facility">Đăng ký cơ sở mới</Option>
            <Option value="facility_name">Thay đổi tên cơ sở</Option>
            <Option value="certificate">Giấy chứng nhận</Option>
            <Option value="license">Giấy phép kinh doanh</Option>
          </Select>
        </div>
      </Card>
      
      <Table
        columns={columns}
        dataSource={filteredApprovals}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      {/* Modal Chi tiết yêu cầu */}
      <Modal
        title="Chi tiết yêu cầu phê duyệt"
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        width={800}
        footer={null}
      >
        {selectedApproval && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Loại yêu cầu" span={2}>
                <Tag color={
                  selectedApproval.type === 'facility' ? 'blue' :
                  selectedApproval.type === 'facility_name' ? 'orange' :
                  selectedApproval.type === 'certificate' ? 'green' :
                  selectedApproval.type === 'license' ? 'purple' : 'default'
                }>{getApprovalTypeText(selectedApproval.type)}</Tag>
              </Descriptions.Item>
              
              <Descriptions.Item label="Trạng thái" span={2}>
                <Tag color={
                  selectedApproval.status === 'approved' ? 'success' :
                  selectedApproval.status === 'pending' ? 'processing' : 'error'
                }>
                  {selectedApproval.status === 'approved' ? 'Đã phê duyệt' :
                  selectedApproval.status === 'pending' ? 'Đang chờ' : 'Đã từ chối'}
                </Tag>
              </Descriptions.Item>
              
              <Descriptions.Item label="Cơ sở" span={2}>
                {selectedApproval.facility?.name || 'N/A'}
              </Descriptions.Item>
              
              <Descriptions.Item label="Địa chỉ" span={2}>
                {selectedApproval.facility?.location || 'N/A'}
              </Descriptions.Item>
              
              {selectedApproval.type === 'facility_name' && (
                <Descriptions.Item label="Tên mới" span={2}>
                  {selectedApproval.name || 'N/A'}
                </Descriptions.Item>
              )}
              
              {selectedApproval.type === 'license' && selectedApproval.sport && (
                <Descriptions.Item label="Môn thể thao" span={2}>
                  {selectedApproval.sport.name}
                </Descriptions.Item>
              )}
              
              <Descriptions.Item label="Ngày tạo">
                {new Date(selectedApproval.createdAt).toLocaleString('vi-VN')}
              </Descriptions.Item>
              
              <Descriptions.Item label="Cập nhật lần cuối">
                {new Date(selectedApproval.updatedAt).toLocaleString('vi-VN')}
              </Descriptions.Item>
              
              {selectedApproval.note && (
                <Descriptions.Item label="Ghi chú" span={2}>
                  {selectedApproval.note}
                </Descriptions.Item>
              )}
            </Descriptions>
            
            {/* Hiển thị hình ảnh giấy tờ */}
            {(selectedApproval.type === 'certificate' && selectedApproval.certifiacte) && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Giấy chứng nhận</h3>
                <div className="flex justify-center">
                  <Image
                    src={selectedApproval.certifiacte}
                    alt="Giấy chứng nhận"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              </div>
            )}
            
            {(selectedApproval.type === 'license' && selectedApproval.license) && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Giấy phép kinh doanh</h3>
                <div className="flex justify-center">
                  <Image
                    src={selectedApproval.license}
                    alt="Giấy phép kinh doanh"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              </div>
            )}
            
            {/* Hình ảnh cơ sở nếu là đăng ký cơ sở mới */}
            {selectedApproval.type === 'facility' && selectedApproval.facility?.imagesUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Hình ảnh cơ sở</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedApproval.facility.imagesUrl.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Hình ảnh ${index + 1}`}
                      style={{ height: '150px', objectFit: 'cover', marginBottom: '10px' }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Nút phê duyệt/từ chối nếu đang ở trạng thái pending */}
            {selectedApproval.status === 'pending' && (
              <div className="mt-6 flex justify-end gap-2">
                <Button danger onClick={() => handleReject(selectedApproval.id)}>
                  Từ chối
                </Button>
                <Button type="primary" onClick={() => handleApprove(selectedApproval.id)}>
                  Phê duyệt
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
      
      {/* Modal Từ chối */}
      <Modal
        title="Từ chối yêu cầu"
        open={rejectModalVisible}
        onOk={confirmReject}
        onCancel={() => setRejectModalVisible(false)}
        okText="Xác nhận từ chối"
        cancelText="Hủy"
        okButtonProps={{ disabled: !rejectReason.trim() }}
      >
        <p>Vui lòng nhập lý do từ chối:</p>
        <Input.TextArea
          rows={4}
          value={rejectReason}
          onChange={e => setRejectReason(e.target.value)}
          placeholder="Nhập lý do từ chối yêu cầu..."
        />
      </Modal>
    </div>
  );
};

export default ApprovalPage;