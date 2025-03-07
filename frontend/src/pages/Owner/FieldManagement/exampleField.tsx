import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '@/constants/owner/Content/content';
import { Field, Facility, FieldFilter, fieldService } from '@/services/fieldService';


const ExampleField: React.FC = () => {
  const navigate = useNavigate();
  
  // States
  const [fields, setFields] = useState<Field[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
 

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'Tất cả' },
    { id: 'active', label: 'Đang hoạt động' },
    { id: 'pending', label: 'Đang chờ phê duyệt' },
    { id: 'maintenance', label: 'Đang bảo trì' }
  ];

  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    fetchFields();
  }, [selectedFacility, activeFilter]);

  const fetchFacilities = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fieldService.getFacilities();
      // setFacilities(response.data);
      setFacilities([
        { id: '1', name: 'Sân cầu lông Phạm Kha' },
        { id: '2', name: 'Sân bóng đá Mini' }
      ]);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const fetchFields = async () => {
    setLoading(true);
    try {
      const filters: FieldFilter = {
        facilityId: selectedFacility || undefined,
        status: activeFilter !== 'all' ? activeFilter as 'active' | 'pending' | 'maintenance' : undefined,
      };

      // TODO: Replace with actual API call
      // const response = await fieldService.getFields(filters);
      // setFields(response.data);
      // setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE));

      // Mock data
      setFields([
        {
          id: '1',
          name: 'Sân 1',
          price: '150.000đ/h',
          sportType: 'Cầu lông',
          status: 'active'
        },
        {
          id: '2',
          name: 'Sân 2',
          price: '150.000đ/h',
          sportType: 'Cầu lông',
          status: 'active'
        },
        {
          id: '3',
          name: 'Sân 3',
          price: '150.000đ/h',
          sportType: 'Cầu lông',
          status: 'active'
        },
        {
          id: '4',
          name: 'Sân 4',
          price: '150.000đ/h',
          sportType: 'Cầu lông',
          status: 'active'
        },
        {
          id: '5',
          name: 'Sân 5',
          price: '150.000đ/h',
          sportType: 'Cầu lông',
          status: 'active'
        },
        {
          id: '6',
          name: 'Sân 6',
          price: '150.000đ/h',
          sportType: 'Cầu lông',
          status: 'active'
        },
        {
          id: '7',
          name: 'Sân 7',
          price: '150.000đ/h',
          sportType: 'Cầu lông',
          status: 'active'
        },
          {
            id: '8',
            name: 'Sân 8',
            price: '150.000đ/h',
            sportType: 'Cầu lông',
            status: 'active'
          },
          {
            id: '9',
            name: 'Sân 9',
            price: '150.000đ/h',
            sportType: 'Cầu lông',
            status: 'active'
          },
        // ... more mock data
      ]);
    } catch (error) {
      console.error('Error fetching fields:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateField = () => {
    navigate('/owner/create-field');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#20b202',
      pending: '#b29802',
      maintenance: '#cd1010'
    };
    return colors[status as keyof typeof colors] || '#000';
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
          Danh sách sân
        </h3>

        {/* Facility Dropdown */}
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
        <div className="bg-[#fdfdfd] rounded-[15px] overflow-hidden mb-8 border border-[#d8d8d880]">
          {/* Table Header */}
          <div className="bg-[#448ff033] rounded-md px-4 py-5 grid grid-cols-12 gap-4 border-b border-[#d8d8d880]">
            <div className="col-span-3 font-opensans font-bold">Tên sân</div>
            <div className="col-span-2 font-opensans font-bold">Giá</div>
            <div className="col-span-3 font-opensans font-bold">Loại hình thể thao</div>
            <div className="col-span-2 font-opensans font-bold">Trạng thái</div>
            <div className="col-span-2 font-opensans font-bold">Thao tác</div>
            
          </div>

          {/* Table Body */}
          <div className="max-h-[500px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              fields.map((field) => (
                <div 
                  key={field.id} 
                  className="border-b border-[#9a9a9a]/50 rounded-md p-5 grid grid-cols-12 gap-4 
                           hover:bg-gray-50 transition-colors items-center"
                >
                  <div className="col-span-3 font-opensans font-bold text-sm">{field.name}</div>
                  <div className="col-span-2 font-opensans text-sm">{field.price}</div>
                  <div className="col-span-3 font-opensans font-semibold text-sm">{field.sportType}</div>
                  <div 
                    className="col-span-2 font-opensans font-bold text-sm"
                    style={{ color: getStatusColor(field.status) }}
                  >
                    {field.status}
                  </div>
                  <div className="flex items-center gap-2 bg-[#fafbfd] border-[0.6px] border-[#d5d5d5] rounded-lg px-2 cursor-pointer transition-colors w-[74px]">
                  <button className=" ">
                    <img src={ICONS.EDIT} alt="Edit" className="w-[20px] h-[20px] hover:bg-[#f0f0f0]" />
                  </button>
                  <div className="w-[1px] h-8 bg-[#d8d8d880] opacity-70"></div>
                  <button className="">
                    <img src={ICONS.BIN} alt="Delete" className="w-[20px] h-[20px] hover:bg-[#f0f0f0]" />
                  </button>
                </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExampleField;

