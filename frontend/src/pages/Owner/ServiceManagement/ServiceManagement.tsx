import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '@/constants/owner/Content/content';
import { Service, Facility, ServiceFilter, serviceService } from '@/services/serviceService';


const ServiceManagement: React.FC = () => {
  const navigate = useNavigate();
  
  // States
  const [services, setServices] = useState<Service[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'time' | 'product'>('all');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [selectedFacility, activeFilter]);

  const fetchFacilities = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await serviceService.getFacilities();
      // setFacilities(response.data);
      setFacilities([
        { id: '1', name: 'Sân cầu lông Phạm Kha' }
      ]);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const filters: ServiceFilter = {
        facilityId: selectedFacility || undefined,
        type: activeFilter !== 'all' ? activeFilter : undefined,
       
      };

      // TODO: Replace with actual API call
      // const response = await serviceService.getServices(filters);
      // setServices(response.data);
      // setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE));

      // Mock data
      setServices([
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          type: 'time',
          price: '15.000đ/h',
          time: '10:00 - 11:00',
          sport: 'Cầu lông',
          status: 'Còn'
        },
        // ... your existing mock data
      ]);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = () => {
    navigate('/owner/create-service');
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-8">
      {/* Banner Section */}
      <div className="bg-white p-5 rounded-lg mb-8 flex justify-between items-center flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] mb-4 lg:mb-0">
          <h1 className="text-[26px] font-bold font-roboto tracking-wide mb-2">
            Tạo ngay dịch vụ để thu hút người chơi đến cơ sở của bạn!!!
          </h1>
          <p className="text-base font-roboto tracking-wide mb-8 text-gray-600">
            Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo Voucher ưu đãi cho Khách hàng.
          </p>
          <button 
            onClick={handleCreateService}
            className="bg-[#cc440a] text-white rounded-md px-6 py-3 text-xl font-semibold 
                     flex items-center gap-3 hover:bg-[#b33a08] transition-colors"
          >
            Tạo dịch vụ ngay!
            <img src={ICONS.ARROW_RIGHT} alt="arrow" className="w-6" />
          </button>
        </div>
        <div className="flex-shrink-0">
          <img src={ICONS.SERVICE} alt="Sports Services" className="w-full max-w-[500px] h-auto object-contain rounded-lg" />
        </div>
      </div>

      {/* Service List Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold font-roboto tracking-wide mb-6">Danh sách dịch vụ</h2>
        
        {/* Facility Dropdown */}
        <div className="relative mb-8">
          <select 
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="w-full px-5 py-2 border border-gray-300 rounded-lg appearance-none
                     focus:outline-none focus:border-blue-500"
          >
            <option value="">Chọn cơ sở của bạn</option>
            {facilities.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <img src={ICONS.DROP_DOWN} alt="dropdown" className="w-4 rotate-180" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 mb-6">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'time', label: 'Theo thời gian' },
            { id: 'product', label: 'Theo số lượng' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as 'all' | 'time' | 'product')}
              className={`text-lg font-roboto transition-colors
                ${activeFilter === filter.id 
                  ? 'text-blue-500 font-medium' 
                  : 'text-gray-600 hover:text-blue-500'}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

          {/* border */}
        <div className="border-b border-black/70 mb-8"></div>


        {/* Services Table */}
        <div className="rounded-[15px] overflow-hidden mb-8 border border-[#d8d8d880]">
          {/* Table Container with fixed width and horizontal scroll */}
          <div className="max-w-full ">
            <div className="relative" style={{ maxHeight: '500px' }}>
              <div className="overflow-x-auto overflow-y-auto h-full">
                <table className="w-full table-fixed " style={{ minWidth: '1100px' }}>
                  {/* Table Header */}
                  <thead className="border-b border-[#d8d8d880] bg-[#fafbfd] sticky top-0 z-30 bg-opacity-100">
                    <tr>
                      {/* Sticky Left Column */}
                      <th className="sticky left-0 z-10  w-[250px] font-bold font-opensans px-4 py-5 text-left" style={{ background: '#448ff033' }}>
                        Tên dịch vụ
                      </th>
                      
                      {/* Scrollable Middle Columns */}
                      <th className="w-[200px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                        Loại dịch vụ | Giá
                      </th>
                      <th className="w-[180px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                        Thời gian áp dụng
                      </th>
                      <th className="w-[120px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                        Loại hình thể thao
                      </th>
                      <th className="w-[300px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
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
                      <tr><td colSpan={8} className="text-center py-4">Loading...</td></tr>
                    ) : (
                      services.map((service, index) => (
                        <tr key={index} className="hover:bg-gray-50 border-b border-[#9a9a9a]/50">
                          {/* Sticky Left Column */}
                          <td className="sticky left-0 z-10 bg-[#fafbfd] w-[250px]">
                            <div className="p-5">
                              <div className="font-medium">{service.name}</div>
                              <div className="text-gray-500">{service.id}</div>
                            </div>
                          </td>

                          {/* Scrollable Middle Columns */}
                          <td className="w-[200px] p-5 whitespace-nowrap">
                            <div>{service.type === 'time' ? 'Theo thời gian' : 'Theo sản phẩm'}</div>
                            <div>{service.price}</div>
                          </td>
                          <td className="w-[180px] p-5 font-semibold whitespace-nowrap">{service.time}</td>
                          <td className="w-[120px] p-5 font-semibold whitespace-nowrap">{service.sport}</td>
                          <td className="w-[300px] p-5 whitespace-nowrap">
                            <span className={`${
                              service.status === 'Còn' ? 'text-green-500' : 'text-red-500'
                            } font-medium`}>
                              {service.status}
                            </span>
                          </td>
                          
                          {/* Sticky Right Column */}
                          <td className="sticky right-0 z-10 bg-[#fafbfd] w-[120px]">
                            <div className="p-5">
                              <div className="flex items-center gap-2 bg-[#fafbfd] border-[0.6px] border-[#d5d5d5] rounded-lg px-2">
                                <button>
                                  <img src={ICONS.EDIT} alt="Edit" className="w-[20px] h-[20px] hover:bg-[#f0f0f0]" />
                                </button>
                                <div className="w-[1px] h-8 bg-[#d8d8d880] opacity-70"></div>
                                <button>
                                  <img src={ICONS.BIN} alt="Delete" className="w-[20px] h-[20px] hover:bg-[#f0f0f0]" />
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
    </div>
  );
};

export default ServiceManagement; 