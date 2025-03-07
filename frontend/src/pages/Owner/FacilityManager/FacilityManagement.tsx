import { ICONS } from '@/constants/owner/Content/content';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Facility, FacilityFilter, facilityService } from '@/services/facilityService';


const FacilityManagement: React.FC = () => {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
 


  useEffect(() => {
    fetchFacilities();
  }, [activeFilter]);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const filters: FacilityFilter = {
        status: activeFilter as 'active' | 'maintenance' | 'pending'
      };

      

      // TODO: Replace with actual API call
      // const response = await facilityService.getFacilities(filters);
      // setFacilities(response.data);
      // setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE));
      
      setFacilities([
        {
          name: 'Sân cầu lông Phạm Kha',
          location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
          openingHours: '5:00 - 23:00',
          status: 'active',
          image: ICONS.IMAGE_FACILITY
        },
        {
          name: 'Sân cầu lông Phạm Kha',
          location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
          openingHours: '5:00 - 23:00',
          status: 'active',
          image: ICONS.IMAGE_FACILITY
        },
        {
          name: 'Sân cầu lông Phạm Kha',
          location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
          openingHours: '5:00 - 23:00',
          status: 'active',
          image: ICONS.IMAGE_FACILITY
        },
        {
          name: 'Sân cầu lông Phạm Kha',
          location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
          openingHours: '5:00 - 23:00',
          status: 'active',
          image: ICONS.IMAGE_FACILITY
        },
        {
          name: 'Sân cầu lông Phạm Kha',
          location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
          openingHours: '5:00 - 23:00',
          status: 'active',
          image: ICONS.IMAGE_FACILITY
        },
        {
          name: 'Sân cầu lông Phạm Kha',
          location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
          openingHours: '5:00 - 23:00',
          status: 'active',
          image: ICONS.IMAGE_FACILITY
        },
        {
          name: 'Sân cầu lông Phạm Kha',
          location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
          openingHours: '5:00 - 23:00',
          status: 'active',
          image: ICONS.IMAGE_FACILITY
        },
        {
          name: 'Sân cầu lông Phạm Kha',
          location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
          openingHours: '5:00 - 23:00',
          status: 'active',
          image: ICONS.IMAGE_FACILITY
        },
        {
          name: 'Sân cầu lông Phạm Kha',
          location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
          openingHours: '5:00 - 23:00',
          status: 'active',
          image: ICONS.IMAGE_FACILITY
        },
        {
          name: 'Sân cầu lông Phạm Kha',
          location: 'Số 40 Đường 3/2, Q10, tp Hồ Chí Minh',
          openingHours: '5:00 - 23:00',
          status: 'active',
          image: ICONS.IMAGE_FACILITY
        },
        
      // Mock implementation
      
       ]);}
      catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      try {
        // TODO: Replace with actual API call
        // const results = await facilityService.searchFacilities(query);
        // setFacilities(results);
      } catch (error) {
        console.error('Error searching facilities:', error);
      }
    } else if (query === '') {
      fetchFacilities();
    }
  };

  const handleSearchClick = () => {
    handleSearch(searchQuery);
  };

  const handleCreateFacility = () => {
    navigate('/owner/create-facility');
  };

  const filterButtons = [
    { id: 'all', label: 'Tất cả cơ sở' },
    { id: 'active', label: 'Đang hoạt động' },
    { id: 'maintenance', label: 'Đang bảo trì' },
    { id: 'pending', label: 'Đang chờ phê duyệt' }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'text-[#20b202]';
      case 'maintenance': return 'text-[#c24008]';
      case 'pending': return 'text-[#d2c209]';
      default: return '';
    }
  };

  return (
    <div className="p-8 w-full">
      <h1 className="font-roboto text-[22px] font-semibold tracking-wider mb-6">
        Cơ sở thể thao của bạn
      </h1>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5">
        <div className="relative flex-grow max-w-[450px]">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên cơ sở hoặc vị trí"
            className="w-full h-[40px] px-[18px] border border-[#d5d5d5] rounded-[19px] font-nunito text-base" 
          />
          <div 
            onClick={handleSearchClick}
            className="cursor-pointer absolute right-[18px] top-1/2 -translate-y-1/2"
          >
            <img 
              src={ICONS.SEARCH} 
              alt="Search"
              className="w-[22px] h-[22px]" 
            />
          </div>
        </div>
        <button 
          onClick={handleCreateFacility}
          className="bg-[#197dfe] text-white rounded px-5 py-2.5 font-roboto font-semibold text-base cursor-pointer transition-colors hover:bg-[#0066e8]"
        >
          Tạo cơ sở mới
        </button>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-4 bg-white rounded-lg mt-12 mb-8">
        {filterButtons.map(({ id, label }) => (
          <div
            key={id}
            onClick={() => setActiveFilter(id)}
            className={`
              px-6 py-4 text-center font-opensans font-bold text-[15px] cursor-pointer
              transition-colors hover:bg-[rgba(68,143,240,0.1)] hover:text-[#448ff0] hover:rounded-lg
              ${activeFilter === id ? 'bg-[rgba(68,143,240,0.13)] text-[#448ff0] rounded-lg' : ''}
            `}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Facilities List Section with Scroll */}
      <div className="bg-[#fdfdfd] rounded-[15px] overflow-hidden mb-8">
        <div className="grid grid-cols-[300px_400px_150px_150px_150px] p-5 bg-[rgba(68,143,240,0.7)] border-b border-[#d8d8d880]">
          {['Cơ sở', 'Vị trí', 'Giờ mở cửa', 'Trạng thái', 'Thao tác'].map((header) => (
            <div key={header} className="font-opensans font-bold text-[15px]">{header}</div>
          ))}
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            facilities.map((facility, index) => (
              <div 
                key={index} 
                className="grid grid-cols-[300px_400px_150px_150px_50px] p-5 border-b border-[#d8d8d880] bg-white hover:bg-gray-50 transition-colors items-center"
              >
                <div className="flex items-center gap-[5px] font-opensans text-sm w-[300px]">
                  <img src={facility.image} alt="Facility" className="w-[60px] h-[50px] object-cover" />
                  <span>{facility.name}</span>
                </div>
                <div className="font-nunito text-sm w-[400px]">{facility.location}</div>
                <div className="font-nunito text-sm w-[150px]">{facility.openingHours}</div>
                <div className={`font-nunito font-bold text-sm ${getStatusColor(facility.status)} w-[150px]`}>
                  {facility.status === 'active' && 'Đang hoạt động'}
                  {facility.status === 'maintenance' && 'Đang bảo trì'}
                  {facility.status === 'pending' && 'Đang chờ phê duyệt'}
                </div>
                <div className="flex items-center gap-2 bg-[#fafbfd] border-[0.6px] border-[#d5d5d5] rounded-lg px-2 py-1 cursor-pointer transition-colors w-[78px]">
                  <button className=" ">
                    <img src={ICONS.EDIT} alt="Edit" className="w-[22px] h-[22px] hover:bg-[#f0f0f0]" />
                  </button>
                  <div className="w-[1px] h-8 bg-[#d8d8d880] opacity-70"></div>
                  <button className="">
                    <img src={ICONS.BIN} alt="Delete" className="w-[22px] h-[22px] hover:bg-[#f0f0f0]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityManagement;

