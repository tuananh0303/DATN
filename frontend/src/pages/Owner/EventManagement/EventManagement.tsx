import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '@/constants/owner/Content/content';
import { Event, Facility, EventFilter, eventService } from '@/services/eventService';


const EventManagement: React.FC = () => {
  const navigate = useNavigate();
  
  // States
  const [events, setEvents] = useState<Event[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
 

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Đang diễn ra', label: 'Đang diễn ra' },
    { id: 'Sắp diễn ra', label: 'Sắp diễn ra' },
    { id: 'Đã kết thúc', label: 'Đã kết thúc' }
  ];

  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [selectedFacility, activeFilter]);

  const fetchFacilities = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await eventService.getFacilities();
      // setFacilities(response.data);
      setFacilities([
        { id: '1', name: 'Sân cầu lông Phạm Kha' },
        { id: '2', name: 'Sân cầu lông Phạm Hùng' },
        { id: '3', name: 'Sân cầu lông Phạm Hùng' },
      ]);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const filters: EventFilter = {
        facilityId: selectedFacility || undefined,
        status: activeFilter !== 'all' ? activeFilter as 'Đang diễn ra' | 'Sắp diễn ra' | 'Đã kết thúc' : undefined,
      };

      // TODO: Replace with actual API call
      // const response = await eventService.getEvents(filters);
      // setEvents(response.data);
      // setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE));

      // Mock data
      setEvents([
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          description: 'Nguyễn Tuấn Anh',
          image: 'Nguyễn Tuấn Anh',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          status: 'Đang diễn ra'
        },
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          description: 'Nguyễn Tuấn Anh',
          image: 'Nguyễn Tuấn Anh',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          status: 'Đang diễn ra'
          },
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          description: 'Nguyễn Tuấn Anh',
          image: 'Nguyễn Tuấn Anh',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          status: 'Đang diễn ra'
        },
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          description: 'Nguyễn Tuấn Anh',
          image: 'Nguyễn Tuấn Anh',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          status: 'Đang diễn ra'
        },
        // ... your existing mock data
      ]);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = () => {
    navigate('/owner/create-event');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Đang diễn ra': 'text-green-500',
      'Sắp diễn ra': 'text-yellow-500',
      'Đã kết thúc': 'text-red-500'
    };
    return colors[status as keyof typeof colors] || '';
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-8">
      {/* Banner Section */}
      <div className="bg-white p-5 rounded-lg mb-8 flex justify-between items-center flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] mb-4 lg:mb-0">
          <h1 className="text-[26px] font-bold font-roboto tracking-wide mb-2">
            Tạo ngay Event để thu hút người chơi đến cơ sở của bạn nào!!!
          </h1>
          <p className="text-base font-roboto tracking-wide mb-8 text-gray-600">
            Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo Event cho Khách hàng.
          </p>
          <button 
            onClick={handleCreateEvent}
            className="bg-[#cc440a] text-white rounded-md px-6 py-3 text-xl font-semibold 
                     flex items-center gap-3 hover:bg-[#b33a08] transition-colors"
          >
            Tạo Event ngay!
            <img src={ICONS.ARROW_RIGHT} alt="arrow" className="w-6" />
          </button>
        </div>
        <div className="flex-shrink-0">
          <img src={ICONS.EVENT} alt="Event Promotion" className="w-full max-w-[500px] h-auto object-contain rounded-lg" />
        </div>
      </div>

      {/* Event List Section */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-xl font-bold font-roboto tracking-wide mb-6">Danh sách sự kiện</h3>
        
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
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
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

        {/* Events Table */}
        <div className="bg-[#fdfdfd] rounded-[15px] overflow-hidden mb-8 border border-[#d8d8d880]">
          

            {/* Table Header */}
            <div className="bg-[#448ff033] rounded-md px-4 py-5 grid grid-cols-12 gap-4 border-b border-[#d8d8d880]">
              <div className="col-span-3 font-opensans font-bold">Tên sự kiện</div>
              <div className="col-span-2 font-opensans font-bold">Mô tả</div>
              <div className="col-span-3 font-opensans font-bold">Hình ảnh minh họa</div>
              <div className="col-span-2 font-opensans font-bold">Thời gian diễn ra sự kiện</div>
              <div className="col-span-2 font-opensans font-bold">Thao tác</div>
            </div>

            {/* Table Body */}
            {/* Table Body */}
          <div className="max-h-[500px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              events.map((event) => (
                <div 
                  key={event.id} 
                  className="border-b border-[#9a9a9a]/50 rounded-md p-5 grid grid-cols-12 gap-4 
                           hover:bg-gray-50 transition-colors items-center"
                >
                  <div className="col-span-3 font-opensans font-bold text-sm">
                    <div className="font-medium">{event.name}</div>
                    <div className="text-gray-500">{event.id}</div>
                  </div>
                  <div className="col-span-2 font-opensans text-sm">{event.description}</div>
                  <div className="col-span-3 font-opensans font-semibold text-sm">{event.image}</div>
                  <div 
                    className="col-span-2 font-opensans font-bold text-sm"
                    style={{ color: getStatusColor(event.status) }}
                  >                    
                        <span className={`font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                        <div className="text-gray-500">{event.timeRange}</div>                      
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

export default EventManagement; 