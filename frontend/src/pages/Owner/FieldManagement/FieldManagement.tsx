import React, { useState, useMemo } from 'react';
import { Table, Select, Button, Tag, Space, Input, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { 
  DownOutlined, 
  FilterOutlined,
  MoreOutlined 
} from '@ant-design/icons';
import { MOCK_FACILITIES, MOCK_COURT_GROUPS } from './constants/mockData';
import type { CourtGroup, Court } from './interfaces/fields';
import { ICONS } from '@/constants/owner/Content/content';

const { Search } = Input;

const FieldManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [searchText, setSearchText] = useState('');

  // Logic xử lý dữ liệu (giữ nguyên)
  const filteredCourtGroups = useMemo(() => {
    if (!selectedFacility) return [];
    return MOCK_COURT_GROUPS.filter(group => group.facilityId === selectedFacility);
  }, [selectedFacility]);

  const mergedCourtGroups = useMemo(() => {
    const groupMap = new Map<string, CourtGroup>();
    filteredCourtGroups.forEach(group => {
      const key = `${group.sportTypeId}-${group.size}-${group.surface}-${group.basePrice}`;
      if (groupMap.has(key)) {
        const existingGroup = groupMap.get(key)!;
        existingGroup.courts = [...existingGroup.courts, ...group.courts];
      } else {
        groupMap.set(key, { ...group });
      }
    });
    return Array.from(groupMap.values());
  }, [filteredCourtGroups]);

  // Columns config (giữ nguyên logic, cập nhật giao diện)
  const columns: ColumnsType<CourtGroup> = [
    {
      title: 'Loại sân',
      dataIndex: 'sportTypeName',
      key: 'sportTypeName',
      render: (text) => (
        <span className="font-semibold">{text}</span>
      )
    },
    {
      title: 'Số lượng sân',
      key: 'courtCount',
      render: (_, record) => (
        <span className="text-blue-600 font-medium">
          {record.courts.length} sân
        </span>
      )
    },
    {
      title: 'Thông tin sân',
      key: 'courtInfo',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.size}</div>
          <div className="text-gray-500">{record.surface}</div>
        </div>
      )
    },
    {
      title: 'Giá thuê',
      key: 'price',
      render: (_, record) => (
        <div>
          <div className="font-medium text-green-600">
            {record.basePrice.toLocaleString()}đ/giờ
          </div>
          {record.peakHourPricing.map((peak, index) => (
            <div key={index} className="text-sm text-gray-500">
              {peak.startTime}-{peak.endTime}: 
              <span className="text-orange-500">
                {(record.basePrice + peak.priceIncrease).toLocaleString()}đ/giờ
              </span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => {
        const active = record.courts.filter(c => c.status === 'active').length;
        const maintenance = record.courts.filter(c => c.status === 'maintenance').length;
        const inactive = record.courts.filter(c => c.status === 'inactive').length;
        
        return (
          <Space direction="vertical" size="small">
            {active > 0 && (
              <Tag color="success" className="rounded-full px-3">
                {active} hoạt động
              </Tag>
            )}
            {maintenance > 0 && (
              <Tag color="warning" className="rounded-full px-3">
                {maintenance} bảo trì
              </Tag>
            )}
            {inactive > 0 && (
              <Tag color="error" className="rounded-full px-3">
                {inactive} ngưng hoạt động
              </Tag>
            )}
          </Space>
        );
      }
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: 'Chỉnh sửa',
                onClick: () => handleEdit(record)
              },
              {
                key: 'delete',
                label: 'Xóa',
                danger: true,
                onClick: () => handleDelete(record)
              }
            ]
          }}
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      )
    }
  ];

  // Expanded row config (cập nhật giao diện)
  const expandedRowRender = (record: CourtGroup) => {
    const columns: ColumnsType<Court> = [
      { 
        title: 'Tên sân',
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
          <span className="font-medium">{text}</span>
        )
      },
      {
        title: 'Trạng thái',
        key: 'status',
        render: (_, court) => {
          const statusConfig = {
            active: { color: 'success', text: 'Hoạt động' },
            maintenance: { color: 'warning', text: 'Đang bảo trì' },
            inactive: { color: 'error', text: 'Ngưng hoạt động' }
          };
          const status = statusConfig[court.status];
          return (
            <Tag color={status.color} className="rounded-full px-3">
              {status.text}
            </Tag>
          );
        }
      },
      {
        title: 'Thao tác',
        key: 'action',
        render: (_, court) => (
          <Button 
            type="link" 
            onClick={() => handleCourtStatusChange(court)}
            className="text-blue-600 hover:text-blue-800"
          >
            Đổi trạng thái
          </Button>
        )
      }
    ];

    return (
      <div className="bg-gray-50 p-4">
        <Table
          columns={columns}
          dataSource={record.courts}
          pagination={false}
          rowKey="id"
          className="nested-table"
        />
      </div>
    );
  };

  // Handlers (giữ nguyên)
  const handleEdit = (record: CourtGroup) => {
    console.log('Edit:', record);
  };

  const handleDelete = (record: CourtGroup) => {
    console.log('Delete:', record);
  };

  const handleCourtStatusChange = (court: Court) => {
    console.log('Change status:', court);
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-8">
      {/* Promotional Banner */}
      <div className="bg-white p-5 rounded-lg mb-8 flex justify-between items-center flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] mb-4 lg:mb-0">
          <h2 className="text-[26px] font-bold font-roboto tracking-wide mb-2">
            Tạo thêm sân trong cơ sở của bạn nào!!!
          </h2>
          <p className="text-base font-roboto tracking-wide mb-8 text-gray-600">
            Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo Voucher ưu đãi cho Khách hàng.
          </p>
          <button 
            onClick={() => navigate('/owner/create-field')}
            className="bg-[#cc440a] text-white rounded-md px-6 py-3 text-xl font-semibold 
                     flex items-center gap-3 hover:bg-[#b33a08] transition-colors"
          >
            Tạo sân ngay
            <img src={ICONS.ARROW_RIGHT} alt="arrow" className="w-6" />
          </button>
        </div>
        <img src={ICONS.FIELD} alt="field" className="w-full max-w-[500px] h-auto object-contain" />
      </div>

      {/* Court List Section */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-xl font-bold font-roboto tracking-wide mb-6">
          Danh sách sân
        </h3>

        {/* Facility Dropdown
        <div className="relative mb-8">
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="w-full appearance-none border border-black/70 rounded-xl px-5 py-2
                     text-lg font-roboto bg-white cursor-pointer focus:outline-none"
          >
            <option value="">Chọn cơ sở của bạn</option>
            {facilities.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
          <img 
            src={ICONS.DROP_DOWN} 
            alt="dropdown" 
            className="absolute right-5 top-1/2 -translate-y-1/2 w-4 pointer-events-none rotate-180" 
          />
        </div> */}

        {/* Filters */}
    <div className="p-6 border-b">
      <div className="flex items-center gap-4">
        <Select
          placeholder="Chọn cơ sở của bạn"
          style={{ width: 300 }}
          value={selectedFacility}
          onChange={setSelectedFacility}
          className="flex-shrink-0"
        >
          {MOCK_FACILITIES.map(facility => (
            <Select.Option key={facility.id} value={facility.id}>
              {facility.name}
            </Select.Option>
          ))}
        </Select>

        <Search
          placeholder="Tìm kiếm sân..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          className="flex-shrink-0"
        />

        <Button icon={<FilterOutlined />}>
          Bộ lọc
        </Button>
      </div>
    </div>

        
        {/* Filter Tabs status */}
        {/* <div className="flex gap-6 mb-6 flex-wrap">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={`text-lg font-roboto transition-colors
                ${activeFilter === option.id 
                  ? 'font-medium text-[#448ff0]' 
                  : 'font-normal text-gray-600 hover:text-[#448ff0]'}`}
            >
              {option.label}
            </button>
          ))}
        </div> */}

          {/* border */}
        <div className="border-b border-black/70 mb-8"></div>       

        {/* Table */}
      <div className="p-6">
      <Table
        columns={columns}
        dataSource={mergedCourtGroups}
        expandable={{
          expandedRowRender,
          expandIcon: ({ expanded, onExpand, record }) => (
            <Button
              type="text"
              icon={<DownOutlined rotate={expanded ? 180 : 0} />}
              onClick={e => onExpand(record, e)}
            />
          )
        }}
        rowKey="id"
        className="field-management-table"
      />
      </div>
      </div>
    </div>  
  
  );
};

export default FieldManagement;