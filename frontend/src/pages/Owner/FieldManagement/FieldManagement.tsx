import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '@/constants/owner/Content/content';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchFacilityList } from '@/store/slices/facilitySlice';
import { fetchFieldGroups, setSelectedFacilityId } from '@/store/slices/fieldSlice';

const FieldManagement: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { facilityList, facilityListLoading } = useAppSelector(state => state.facility);
  const { fieldGroups, loading: fieldGroupsLoading } = useAppSelector(state => state.field);
  const selectedFacilityId = useAppSelector(state => state.field.selectedFacilityId);
  
  // Local state
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'Tất cả' },
    { id: 'active', label: 'Đang hoạt động' },
    { id: 'pending', label: 'Đang chờ phê duyệt' },
    { id: 'maintenance', label: 'Đang bảo trì' }
  ];

  // Fetch facilities on component mount
  useEffect(() => {
    dispatch(fetchFacilityList());
  }, [dispatch]);

  // Set default selected facility when facilityList is loaded
  useEffect(() => {
    if (facilityList.length > 0 && !selectedFacilityId) {
      dispatch(setSelectedFacilityId(facilityList[0].id));
    }
  }, [facilityList, selectedFacilityId, dispatch]);

  // Fetch field groups when selectedFacilityId changes
  useEffect(() => {
    if (selectedFacilityId) {
      dispatch(fetchFieldGroups(selectedFacilityId));
    }
  }, [selectedFacilityId, dispatch]);

  // Handle facility selection change
  const handleFacilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedFacilityId(e.target.value));
  };

  // Handle create field button click
  const handleCreateField = () => {
    navigate('/owner/create-field');
  };

  // Toggle expand/collapse for a field group
  const toggleExpandGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Format time from "HH:MM:SS" to "HH:MM"
  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      active: '#20b202',
      pending: '#b29802',
      maintenance: '#cd1010'
    };
    return colors[status as keyof typeof colors] || '#000';
  };

  // Filter field groups based on active filter
  const filteredFieldGroups = fieldGroups.filter(group => {
    if (activeFilter === 'all') return true;
    
    // Check if any field in the group matches the filter
    return group.fields.some(field => field.status === activeFilter);
  });

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
            onClick={handleCreateField}
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
          Danh sách nhóm sân
        </h3>

        {/* Facility Dropdown */}
        <div className="relative mb-8">
          <select
            value={selectedFacilityId || ''}
            onChange={handleFacilityChange}
            className="w-full appearance-none border border-black/70 rounded-xl px-5 py-2
                     text-lg font-roboto bg-white cursor-pointer focus:outline-none"
            disabled={facilityListLoading}
          >
            <option value="">Chọn cơ sở của bạn</option>
            {facilityList.map((facility) => (
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
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 mb-6 flex-wrap">
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
        </div>

        {/* border */}
        <div className="border-b border-black/70 mb-8"></div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="bg-[#fdfdfd] rounded-[15px] overflow-hidden mb-8 border border-[#d8d8d880] min-w-[1200px]">
            {/* Table Header */}
            <div className="bg-[#448ff033] rounded-md px-4 py-5 grid grid-cols-12 gap-4 border-b border-[#d8d8d880]">
              <div className="col-span-2 font-opensans font-bold">Tên nhóm sân</div>
              <div className="col-span-1 font-opensans font-bold">Kích thước</div>
              <div className="col-span-1 font-opensans font-bold">Mặt sân</div>
              <div className="col-span-1 font-opensans font-bold">Giá sân</div>
              <div className="col-span-2 font-opensans font-bold">Giờ cao điểm</div>
              <div className="col-span-1 font-opensans font-bold">Giá giờ cao điểm</div>
              <div className="col-span-2 font-opensans font-bold">Loại hình sân</div>
              <div className="col-span-2 font-opensans font-bold">Thao tác</div>
            </div>

            {/* Table Body */}
            <div className="max-h-[500px] overflow-y-auto">
              {fieldGroupsLoading ? (
                <div className="text-center py-4">Đang tải...</div>
              ) : filteredFieldGroups.length === 0 ? (
                <div className="text-center py-4">Không có nhóm sân nào</div>
              ) : (
                filteredFieldGroups.map((group) => (
                  <React.Fragment key={group.id}>
                    {/* Field Group Row */}
                    <div 
                      className="border-b border-[#9a9a9a]/50 rounded-md p-5 grid grid-cols-12 gap-4 
                               hover:bg-gray-50 transition-colors items-center cursor-pointer"
                      onClick={() => toggleExpandGroup(group.id)}
                    >
                      <div className="col-span-2 font-opensans font-bold text-sm flex items-center">
                        <span className="mr-2">{expandedGroups[group.id] ? '▼' : '▶'}</span>
                        {group.name}
                      </div>
                      <div className="col-span-1 font-opensans text-sm">{group.dimension}</div>
                      <div className="col-span-1 font-opensans text-sm">{group.surface}</div>
                      <div className="col-span-1 font-opensans text-sm">{formatPrice(group.basePrice)}</div>
                      <div className="col-span-2 font-opensans text-sm">
                        {formatTime(group.peakStartTime)} - {formatTime(group.peakEndTime)}
                      </div>
                      <div className="col-span-1 font-opensans text-sm">{formatPrice(group.priceIncrease)}</div>
                      <div className="col-span-2 font-opensans text-sm">
                        {group.sports.map(sport => sport.name).join(', ')}
                      </div>
                      <div className="col-span-2 flex items-center gap-2 bg-[#fafbfd] border-[0.6px] border-[#d5d5d5] rounded-lg px-2 w-fit">
                        <button className="p-1" onClick={(e) => { e.stopPropagation(); /* Edit logic */ }}>
                          <img src={ICONS.EDIT} alt="Edit" className="w-[20px] h-[20px] hover:bg-[#f0f0f0]" />
                        </button>
                        <div className="w-[1px] h-8 bg-[#d8d8d880] opacity-70"></div>
                        <button className="p-1" onClick={(e) => { e.stopPropagation(); /* Delete logic */ }}>
                          <img src={ICONS.BIN} alt="Delete" className="w-[20px] h-[20px] hover:bg-[#f0f0f0]" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Fields */}
                    {expandedGroups[group.id] && (
                      <div className="bg-gray-100 px-10 py-3">
                        <div className="font-bold mb-2">Danh sách sân:</div>
                        <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-200 rounded-md mb-2">
                          <div className="col-span-6 font-opensans font-bold">Tên sân</div>
                          <div className="col-span-6 font-opensans font-bold">Trạng thái</div>
                        </div>
                        {group.fields.map(field => (
                          <div key={field.id} className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-gray-300">
                            <div className="col-span-6 font-opensans">{field.name}</div>
                            <div 
                              className="col-span-6 font-opensans font-bold"
                              style={{ color: getStatusColor(field.status) }}
                            >
                              {field.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldManagement;