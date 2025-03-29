import React, { useState, useEffect, useRef } from 'react';
import { Select, Card, Typography, Button, Table, Empty, notification, Spin, Checkbox, Tag, Alert } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { mockFacilitiesDropdown } from '@/mocks/facility/mockFacilities';
import { getSportNameInVietnamese } from '@/utils/translateSport';
import { sportService } from '@/services/sport.service';
import { Sport } from '@/types/sport.type';
import { FieldGroup, FieldGroupFormData, Field } from '@/types/field.type';
import FieldGroupForm from './components/FieldGroupForm';
import { mockFieldGroups } from '@/mocks/field/Groupfield_Field';
import { COMPATIBLE_SPORT_GROUPS } from '@/mocks/default/defaultData';

const { Title, Text } = Typography;
const { Option } = Select;
const { CheckableTag } = Tag;

// Danh sách tất cả các loại thể thao được hỗ trợ trong ứng dụng
const ALL_SUPPORTED_SPORTS = [
  'football',
  'basketball',
  'volleyball',
  'tennis',
  'badminton',
  'tabletennis',
  'pickleball',
  'golf'
];

// Mock data để đảm bảo UI hiển thị khi API không trả về kết quả
const MOCK_SPORTS: Sport[] = ALL_SUPPORTED_SPORTS.map((sportName, index) => ({
  id: index + 1,
  name: sportName
}));

// Thêm mục "Tổng hợp" vào danh sách thể thao
const COMPOSITE_SPORT: Sport = {
  id: 999,
  name: 'composite',
  // Thêm các thuộc tính khác nếu cần
};

// Mock data field groups tương ứng với từng loại hình thể thao
const mockFieldGroupsBySport: Record<string, FieldGroup[]> = {
  // Cho các loại thể thao riêng, chỉ hiển thị các nhóm sân CHỨA DUY NHẤT loại thể thao đó
  football: mockFieldGroups.filter(group => group.sports.length === 1 && group.sports.some(sport => 
    sport.name.toLowerCase() === 'football' || sport.name.toLowerCase() === 'bóng đá')),
  basketball: mockFieldGroups.filter(group => group.sports.length === 1 && group.sports.some(sport => 
    sport.name.toLowerCase() === 'basketball' || sport.name.toLowerCase() === 'bóng rổ')),
  volleyball: mockFieldGroups.filter(group => group.sports.length === 1 && group.sports.some(sport => 
    sport.name.toLowerCase() === 'volleyball' || sport.name.toLowerCase() === 'bóng chuyền')),
  tennis: mockFieldGroups.filter(group => group.sports.length === 1 && group.sports.some(sport => 
    sport.name.toLowerCase() === 'tennis')),
  badminton: mockFieldGroups.filter(group => group.sports.length === 1 && group.sports.some(sport => 
    sport.name.toLowerCase() === 'badminton' || sport.name.toLowerCase() === 'cầu lông')),
  tabletennis: mockFieldGroups.filter(group => group.sports.length === 1 && group.sports.some(sport => 
    sport.name.toLowerCase() === 'tabletennis' || sport.name.toLowerCase() === 'bóng bàn')),
  pickleball: mockFieldGroups.filter(group => group.sports.length === 1 && group.sports.some(sport => 
    sport.name.toLowerCase() === 'pickleball')),
  golf: mockFieldGroups.filter(group => group.sports.length === 1 && group.sports.some(sport => 
    sport.name.toLowerCase() === 'golf')),
  // Đối với "Tổng hợp", hiển thị tất cả các nhóm sân có từ 2 môn trở lên
  composite: mockFieldGroups.filter(group => group.sports.length > 1),
};

const CreateFieldGroup: React.FC = () => {
  const isMounted = useRef<boolean>(false);
  
  // States
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('');
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [currentSportForModal, setCurrentSportForModal] = useState<Sport | null>(null);
  
  // Fetch sports data
  useEffect(() => {
    // Sử dụng cờ để tránh fetch 2 lần trong Strict Mode
    if (!isMounted.current) {
      isMounted.current = true;
      
      const fetchSports = async () => {
        setIsLoading(true);
        try {
          // sportService.getSport() đã trả về response.data rồi
          const data = await sportService.getSport();          
          // Kiểm tra data có phải là mảng và có phần tử không
          if (Array.isArray(data) && data.length > 0) {
            // Thêm mục "Tổng hợp" vào danh sách thể thao
            setSports([...data, COMPOSITE_SPORT]);
          } else {
            // Chỉ sử dụng mock data khi API trả về mảng rỗng
            setSports([...MOCK_SPORTS, COMPOSITE_SPORT]);
          }
        } catch (error) {
          notification.error({
            message: 'Lỗi',
            description: 'Không thể tải danh sách loại hình thể thao'
          });
          console.error('Error fetching sports:', error);
          // Sử dụng mock data khi API bị lỗi
          setSports([...MOCK_SPORTS, COMPOSITE_SPORT]);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchSports();
    }
  }, []);
  
  // Handle facility selection
  const handleFacilityChange = (value: string) => {
    setSelectedFacilityId(value);
    // Reset sport selection when facility changes
    setSelectedSports([]);
  };
  
  // Handle sport selection
  const handleSportSelect = (sport: Sport) => {
    // Kiểm tra xem loại thể thao đã được chọn hay chưa
    const isSelected = selectedSports.some(s => s.id === sport.id);
    
    if (isSelected) {
      // Nếu đã chọn, loại bỏ khỏi danh sách đã chọn
      const newSelection = selectedSports.filter(s => s.id !== sport.id);
      setSelectedSports(newSelection);
    } else {
      // Thêm vào danh sách đã chọn
      const newSelection = [...selectedSports, sport];
      setSelectedSports(newSelection);
    }
  };
  
  // Lấy danh sách nhóm sân cho một loại thể thao cụ thể
  const getFieldGroupsForSport = (sport: Sport): FieldGroup[] => {
    const sportName = sport.name.toLowerCase();
    return mockFieldGroupsBySport[sportName] || [];
  };
  
  // Lấy tên hiển thị cho loại thể thao
  const getSportDisplayName = (sport: Sport): string => {
    return sport.id === COMPOSITE_SPORT.id 
      ? "Tổng hợp" 
      : getSportNameInVietnamese(sport.name);
  };
  
  // Show add modal for a specific sport
  const showAddModal = (sport: Sport) => {
    if (!selectedFacilityId) {
      notification.warning({
        message: 'Chưa chọn cơ sở',
        description: 'Vui lòng chọn cơ sở trước khi tạo nhóm sân mới.'
      });
      return;
    }
    
    setCurrentSportForModal(sport);
    setIsAddModalVisible(true);
  };
  
  // Handle form submission
  const handleFormSubmit = (formData: FieldGroupFormData) => {
    // In real app, you would save the field group data
    console.log('Form data:', formData);
    
    notification.success({
      message: 'Thành công',
      description: 'Đã tạo nhóm sân mới thành công!'
    });
    
    setIsAddModalVisible(false);
    
    // Optionally navigate back to field management
    // navigate('/owner/field-management');
  };
  
  // Column definition for existing field groups table
  const columns = [
    {
      title: 'Tên nhóm sân',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Kích thước',
      dataIndex: 'dimension',
      key: 'dimension',
    },
    {
      title: 'Mặt sân',
      dataIndex: 'surface',
      key: 'surface',
    },
    {
      title: 'Giá cơ bản',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (price: number) => `${price.toLocaleString('de-DE')} VNĐ`,
    },
    {
      title: 'Số sân',
      dataIndex: 'fields',
      key: 'fieldCount',
      render: (fields: Field[]) => fields.length,
    },
    {
      title: 'Loại hình thể thao',
      dataIndex: 'sports',
      key: 'sports',
      render: (sports: Sport[]) => (
        <div className="flex flex-wrap gap-1">
          {sports.map(sport => (
            <Tag key={sport.id} color="blue">
              {getSportNameInVietnamese(sport.name)}
            </Tag>
          ))}
        </div>
      ),
    },
  ];
  
  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Title level={2} style={{ margin: 0 }}>Tạo nhóm sân mới</Title>
        </div>
      </div>
      
      {/* Main content */}
      <Card className="mb-6">
        <Title level={4}>1. Chọn cơ sở</Title>
        <div className="mb-6">
          <Select
            placeholder="Chọn cơ sở quản lý"
            style={{ width: '100%' }}
            onChange={handleFacilityChange}
            value={selectedFacilityId || undefined}
          >
            {mockFacilitiesDropdown.map(facility => (
              <Option key={facility.id} value={facility.id}>
                {facility.name}
              </Option>
            ))}
          </Select>
        </div>
        
        {selectedFacilityId && (
          <>
            <Title level={4}>2. Chọn loại hình thể thao</Title>
            <div className="mb-4">
              <Text type="secondary">
                Chọn một hoặc nhiều loại hình thể thao mà bạn muốn tạo nhóm sân
              </Text>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Spin size="large" />
              </div>
            ) : sports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {sports.map(sport => (
                  <Card
                    key={sport.id}
                    hoverable
                    className={`cursor-pointer ${selectedSports.some(s => s.id === sport.id) ? 'border-2 border-blue-500' : ''}`}
                    onClick={() => handleSportSelect(sport)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-lg">
                          {getSportDisplayName(sport)}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {sport.id === COMPOSITE_SPORT.id 
                            ? "Nhóm sân đa năng" 
                            : "Dành riêng cho một môn"
                          }
                        </div>
                      </div>
                      <Checkbox 
                        checked={selectedSports.some(s => s.id === sport.id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleSportSelect(sport)}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Empty 
                description="Không có loại hình thể thao nào" 
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </>
        )}
        
        {selectedSports.length > 0 && (
          <>
            <Title level={4}>3. Nhóm sân hiện có</Title>
            <div className="mb-4">
              <Text type="secondary">
                Danh sách các nhóm sân theo từng loại hình thể thao
              </Text>
            </div>
            
            {/* Hiển thị thẻ cho loại thể thao đã chọn */}
            <div className="mb-4">
              <Text className="mr-2">Đã chọn:</Text>
              {selectedSports.map(sport => (
                <CheckableTag
                  key={sport.id}
                  checked={true}
                  onChange={() => handleSportSelect(sport)}
                >
                  {getSportDisplayName(sport)}
                </CheckableTag>
              ))}
            </div>
            
            {/* Hiển thị danh sách nhóm sân cho từng loại thể thao */}
            {selectedSports.length > 0 ? (
              <div className="space-y-6">
                {selectedSports.map(sport => {
                  const sportFieldGroups = getFieldGroupsForSport(sport);
                  return (
                    <div key={sport.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <Title level={5} style={{ margin: 0 }}>
                          Danh sách nhóm sân {getSportDisplayName(sport)}
                        </Title>
                        
                        <Button 
                          type="primary" 
                          icon={<PlusOutlined />} 
                          onClick={() => showAddModal(sport)}
                        >
                          Thêm nhóm sân {getSportDisplayName(sport)}
                        </Button>
                      </div>
                      
                      {/* Add suggested combinations for composite sport */}
                      {sport.id === COMPOSITE_SPORT.id && (
                        <Alert
                          type="info"
                          message={
                            <div className="mb-4">
                              <div className="font-medium mb-2">
                                <InfoCircleOutlined className="mr-2" />
                                Gợi ý các loại sân tổng hợp phổ biến
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {COMPATIBLE_SPORT_GROUPS.map(group => (
                                  <Card 
                                    key={group.id} 
                                    size="small" 
                                    className="cursor-pointer hover:shadow-md"
                                    onClick={() => {
                                      // Find sport IDs matching the sport names
                                      const sportIds = group.sports
                                        .map(sportName => {
                                          const matchingSport = MOCK_SPORTS.find(
                                            s => s.name.toLowerCase() === sportName.toLowerCase()
                                          );
                                          return matchingSport?.id;
                                        })
                                        .filter(Boolean) as number[];
                                      
                                      if (sportIds.length > 0) {
                                        // Open add modal with preselected sports
                                        setCurrentSportForModal(COMPOSITE_SPORT);
                                        setIsAddModalVisible(true);
                                      }
                                    }}
                                  >
                                    <div className="font-medium text-sm">{group.name}</div>
                                    <div className="text-xs text-gray-500">{group.description}</div>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {group.sports.map((sportName, idx) => {
                                        const matchingSport = MOCK_SPORTS.find(
                                          s => s.name.toLowerCase() === sportName.toLowerCase()
                                        );
                                        return matchingSport ? (
                                          <Tag key={idx} color="blue">
                                            {getSportNameInVietnamese(matchingSport.name)}
                                          </Tag>
                                        ) : null;
                                      })}
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          }
                        />
                      )}
                      
                      {sportFieldGroups.length > 0 ? (
                        <Table 
                          dataSource={sportFieldGroups}
                          columns={columns}
                          rowKey="id"
                          pagination={false}
                          size="small"
                        />
                      ) : (
                        <Empty 
                          description={`Chưa có nhóm sân ${getSportDisplayName(sport)} nào`}
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        >
                          <Button 
                            type="primary" 
                            icon={<PlusOutlined />} 
                            onClick={() => showAddModal(sport)}
                          >
                            Thêm nhóm sân {getSportDisplayName(sport)} đầu tiên
                          </Button>
                        </Empty>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <Empty 
                description="Chưa có nhóm sân nào thuộc loại hình này tại cơ sở đã chọn"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </>
        )}
      </Card>
      
      {/* Field Group Form Modal */}
      {isAddModalVisible && currentSportForModal && (
        <FieldGroupForm
          open={isAddModalVisible}
          onClose={() => {
            setIsAddModalVisible(false);
            setCurrentSportForModal(null);
          }}
          onSave={handleFormSubmit}
          sport={currentSportForModal}
          allSports={sports}
          selectedSportIds={currentSportForModal.id === COMPOSITE_SPORT.id 
            ? selectedSports.filter(s => s.id !== COMPOSITE_SPORT.id).map(s => s.id) 
            : [currentSportForModal.id]}
        />
      )}
    </div>
  );
};

export default CreateFieldGroup;
