import { ICONS } from '@/constants/owner/Content/content';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { facilityService } from '@/services/facility.service';

// Define the Facility interface based on the API response
interface Facility {
  id: string;
  name: string;
  location: string;
  openTime: string;
  closeTime: string;
  status: 'approved' | 'rejected' | 'pending' | 'closed';
  imagesUrl: string[];
}

// // Define the filter interface
// interface FacilityFilter {
//   status?: 'active' | 'maintenance' | 'pending';
// }

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
      // Call the API to get facilities
      const response = await facilityService.getMyFacilities();
      
      // Filter facilities based on activeFilter if it's not 'all'
      let filteredFacilities = response;
      if (activeFilter !== 'all') {
        filteredFacilities = response.filter(
          (facility: Facility) => facility.status === activeFilter
        );
      }      
      setFacilities(filteredFacilities);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      try {
        // For now, we'll just filter the existing facilities
        // In a real implementation, you might want to call a search API
        const response = await facilityService.getMyFacilities();
        const filteredFacilities = response.filter(
          (facility: Facility) => 
            facility.name.toLowerCase().includes(query.toLowerCase()) ||
            facility.location.toLowerCase().includes(query.toLowerCase())
        );
        setFacilities(filteredFacilities);
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
    { id: 'approved', label: 'Đang hoạt động' },
    { id: 'closed', label: 'Đang bảo trì' },
    { id: 'pending', label: 'Đang chờ phê duyệt' },
    { id: 'rejected', label: 'Đã bị từ chối' }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'text-[#20b202]';
      case 'closed': return 'text-[#f38556]';
      case 'pending': return 'text-[#d2c209]';
      case 'rejected': return 'text-[#c24008]';
      default: return '';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'approved': return 'Đang hoạt động';
      case 'closed': return 'Đang bảo trì';
      case 'pending': return 'Đang chờ phê duyệt';
      case 'rejected': return 'Đã bị từ chối';
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
      <div className="grid grid-cols-5 bg-white rounded-lg mt-12 mb-8">
        {filterButtons.map(({ id, label }) => (
          <div
            key={id}
            onClick={() => setActiveFilter(id)}
            className={`
              px-4 py-4 text-center font-opensans font-bold text-[15px] cursor-pointer
              transition-colors hover:bg-[rgba(68,143,240,0.1)] hover:text-[#448ff0] hover:rounded-lg
              ${activeFilter === id ? 'bg-[rgba(68,143,240,0.13)] text-[#448ff0] rounded-lg' : ''}
            `}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Facilities List Section with Scroll - Updated to match VoucherManagement.tsx */}
      <div className="bg-[#fdfdfd] rounded-[15px] overflow-hidden mb-8 border border-[#d8d8d880]">
        {/* Table Container with fixed width and horizontal scroll */}
        <div className="max-w-full">
          <div className="relative" style={{ height: '500px' }}>
            <div className="overflow-x-auto overflow-y-auto h-full">
              <table className="w-full table-fixed" style={{ minWidth: '1200px' }}>
                {/* Table Header */}
                <thead className="border-b border-[#d8d8d880] bg-[#fafbfd] sticky top-0 z-30 bg-opacity-100">
                  <tr>
                    {/* Sticky Left Column */}
                    <th className="sticky left-0 z-10 w-[300px] font-bold font-opensans px-4 py-5 text-left" style={{ background: '#448ff033' }}>
                      Cơ sở
                    </th>
                    
                    {/* Scrollable Middle Columns */}
                    <th className="w-[400px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                      Vị trí
                    </th>
                    <th className="w-[150px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                      Giờ mở cửa
                    </th>
                    <th className="w-[150px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                      Trạng thái
                    </th>

                    {/* Sticky Right Column */}
                    <th className="sticky right-0 z-10 bg-[#448ff033] w-[120px] font-bold font-opensans px-4 py-5 text-left">
                      Thao tác
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
                  ) : facilities.length === 0 ? (
                    <tr><td colSpan={3} className="text-center py-4 mx-auto">Không có cơ sở thể thao nào</td></tr>
                  ) :(
                    facilities.map((facility, index) => (
                      <tr key={index} className="hover:bg-gray-50 border-b border-[#9a9a9a]/50">
                        {/* Sticky Left Column */}
                        <td className="sticky left-0 z-10 bg-[#fafbfd] w-[300px]">
                          <div className="p-5 flex items-center gap-[5px] font-opensans text-sm">
                            <img src={facility.imagesUrl[0]} alt="Facility" className="w-[60px] h-[50px] object-cover" />
                            <span>{facility.name}</span>
                          </div>
                        </td>

                        {/* Scrollable Middle Columns */}
                        <td className="w-[400px] p-5 font-nunito text-sm whitespace-normal">{facility.location}</td>
                        <td className="w-[150px] p-5 font-nunito text-sm whitespace-nowrap">
                          {`${facility.openTime} - ${facility.closeTime}`}
                        </td>
                        <td className={`w-[150px] p-5 font-nunito font-bold text-sm ${getStatusColor(facility.status)} whitespace-nowrap`}>
                          {getStatusText(facility.status)}
                        </td>

                        {/* Sticky Right Column */}
                        <td className="sticky right-0 z-10 bg-[#fafbfd] w-[120px]">
                          <div className="p-5">
                            <div className="flex items-center gap-2 bg-[#fafbfd] border-[0.6px] border-[#d5d5d5] rounded-lg px-2 py-1">
                              <button>
                                <img src={ICONS.EDIT} alt="Edit" className="w-[22px] h-[22px] hover:bg-[#f0f0f0]" />
                              </button>
                              <div className="w-[1px] h-8 bg-[#d8d8d880] opacity-70"></div>
                              <button>
                                <img src={ICONS.BIN} alt="Delete" className="w-[22px] h-[22px] hover:bg-[#f0f0f0]" />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityManagement;