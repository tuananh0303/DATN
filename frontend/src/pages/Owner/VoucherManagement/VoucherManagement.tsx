import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '@/constants/owner/Content/content';
import { Voucher, Facility, VoucherFilter, voucherService } from '@/services/voucherService';


const VoucherManagement: React.FC = () => {
  const navigate = useNavigate();
  
  // States
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);


  // Filter options
  const filterOptions = [
    { id: 'all', label: 'Tất cả' },
    { id: 'active', label: 'Đang diễn ra' },
    { id: 'upcoming', label: 'Sắp diễn ra' },
    { id: 'expired', label: 'Đã kết thúc' }
  ];

  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    fetchVouchers();
  }, [selectedFacility, activeFilter]);

  const fetchFacilities = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await voucherService.getFacilities();
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

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const filters: VoucherFilter = {
        facilityId: selectedFacility || undefined,
        status: activeFilter !== 'all' ? activeFilter as 'active' | 'upcoming' | 'expired' : undefined,
      };

      // TODO: Replace with actual API call
      // const response = await voucherService.getVouchers(filters);
      // setVouchers(response.data);
      // setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE));

      // Mock data
      setVouchers([
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          discountType: 'fixed',
          discountValue: '15.000đ',
          totalCodes: 100,
          usedCodes: 5,
          status: 'active',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          minOrder: '100.000đ',
          maxDiscount: '15.000đ'
        },
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          discountType: 'fixed',
          discountValue: '15.000đ',
          totalCodes: 100,
          usedCodes: 5,
          status: 'active',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          minOrder: '100.000đ',
          maxDiscount: '15.000đ'
        },
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          discountType: 'fixed',
          discountValue: '15.000đ',
          totalCodes: 100,
          usedCodes: 5,
          status: 'active',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          minOrder: '100.000đ',
          maxDiscount: '15.000đ'
        },
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          discountType: 'fixed',
          discountValue: '15.000đ',
          totalCodes: 100,
          usedCodes: 5,
          status: 'active',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          minOrder: '100.000đ',
          maxDiscount: '15.000đ'
        },
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          discountType: 'fixed',
          discountValue: '15.000đ',
          totalCodes: 100,
          usedCodes: 5,
          status: 'active',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          minOrder: '100.000đ',
          maxDiscount: '15.000đ'
        },
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          discountType: 'fixed',
          discountValue: '15.000đ',
          totalCodes: 100,
          usedCodes: 5,
          status: 'active',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          minOrder: '100.000đ',
          maxDiscount: '15.000đ'
        },
        {
          id: 'ANH-2607',
          name: 'Nguyễn Tuấn Anh',
          discountType: 'fixed',
          discountValue: '15.000đ',
          totalCodes: 100,
          usedCodes: 5,
          status: 'active',
          timeRange: '20:00 05/12/2024 - 11:00 08/12/2024',
          minOrder: '100.000đ',
          maxDiscount: '15.000đ'
        },
        // ... your existing mock data
      ]);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVoucher = () => {
    navigate('/owner/create-voucher');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'text-green-500',
      upcoming: 'text-yellow-500',
      expired: 'text-red-500'
    };
    return colors[status as keyof typeof colors] || '';
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-8">
      {/* Banner Section */}
      <div className="bg-white p-5 rounded-lg mb-8 flex justify-between items-center flex-wrap gap-10">
        <div className="flex-1 min-w-[300px] mb-4 lg:mb-0">
          <h1 className="text-[26px] font-bold font-roboto tracking-wide mb-2">
            Tạo ngay Voucher để tăng doanh thu cho cơ sở của bạn!!!
          </h1>
          <p className="text-base font-roboto tracking-wide mb-8 text-gray-600">
            Cơ hội tăng đến 43% đơn đặt sân và 28% doanh thu khi tạo Voucher ưu đãi cho Khách hàng.
          </p>
          <button 
            onClick={handleCreateVoucher}
            className="bg-[#cc440a] text-white rounded-md px-6 py-3 text-xl font-semibold 
                     flex items-center gap-3 hover:bg-[#b33a08] transition-colors"
          >
            Tạo Voucher ngay!
            <img src={ICONS.ARROW_RIGHT} alt="arrow" className="w-6" />
          </button>
        </div>
        <div className="flex-shrink-0">
          <img src={ICONS.VOUCHER} alt="Voucher Promotion" className="w-full max-w-[500px] h-auto object-contain" />
        </div>
      </div>

      {/* Voucher List Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold font-roboto tracking-wide mb-6">Danh sách mã giảm giá</h2>
        
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

        {/* Vouchers Table */}
        <div className="rounded-[15px] overflow-hidden mb-8 border border-[#d8d8d880]">
          {/* Table Container with fixed width and horizontal scroll */}
          <div className="max-w-full ">
            <div className="relative" style={{ height: '500px' }}>
              <div className="overflow-x-auto overflow-y-auto h-full">
                <table className="w-full table-fixed " style={{ minWidth: '1410px' }}>
                  {/* Table Header */}
                  <thead className="border-b border-[#d8d8d880] bg-[#fafbfd] sticky top-0 z-30 bg-opacity-100">
                    <tr>
                      {/* Sticky Left Column */}
                      <th className="sticky left-0 z-10   w-[250px] font-bold font-opensans px-4 py-5 text-left" style={{ background: '#448ff033' }}>
                        Tên Voucher / Mã Voucher
                      </th>
                      
                      {/* Scrollable Middle Columns */}
                      <th className="w-[200px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                        Loại giảm giá | Giá giảm
                      </th>
                      <th className="w-[180px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                        Tổng số mã giảm giá
                      </th>
                      <th className="w-[120px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                        Đã dùng
                      </th>
                      <th className="w-[300px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                        Trạng thái | Thời gian dùng mã giảm giá
                      </th>
                      <th className="w-[120px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                        Đơn hàng tối thiểu
                      </th>
                      <th className="w-[120px] font-bold font-opensans px-4 py-5 text-left bg-[#448ff033]">
                        Giảm tối đa
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
                      vouchers.map((voucher, index) => (
                        <tr key={index} className="hover:bg-gray-50 border-b border-[#9a9a9a]/50">
                          {/* Sticky Left Column */}
                          <td className="sticky left-0 z-10 bg-[#fafbfd] w-[250px]">
                            <div className="p-5">
                              <div className="font-medium">{voucher.name}</div>
                              <div className="text-gray-500">{voucher.id}</div>
                            </div>
                          </td>

                          {/* Scrollable Middle Columns */}
                          <td className="w-[200px] p-5 whitespace-nowrap">
                            <div>{voucher.discountType === 'percentage' ? 'Giảm theo %' : 'Giảm theo số tiền'}</div>
                            <div>{voucher.discountValue}</div>
                          </td>
                          <td className="w-[180px] p-5 font-semibold whitespace-nowrap">{voucher.totalCodes}</td>
                          <td className="w-[120px] p-5 font-semibold whitespace-nowrap">{voucher.usedCodes}</td>
                          <td className="w-[300px] p-5 whitespace-nowrap">
                            <span className={`font-medium ${getStatusColor(voucher.status)}`}>
                              {filterOptions.find(f => f.id === voucher.status)?.label}
                            </span>
                            <div className="text-gray-500">{voucher.timeRange}</div>
                          </td>
                          <td className="w-[120px] p-5 font-semibold whitespace-nowrap">{voucher.minOrder}</td>
                          <td className="w-[120px] p-5 font-semibold whitespace-nowrap">{voucher.maxDiscount}</td>

                          {/* Sticky Right Column */}
                          <td className="sticky right-0 z-10 bg-[#fafbfd] w-[120px]">
                            <div className="p-5">
                              <div className="flex items-center gap-2 bg-[#fafbfd] border-[0.6px] border-[#d5d5d5] rounded-lg px-2">
                                <button>
                                  <img src={ICONS.DETAIL} alt="Detail" className="w-[20px] h-[20px] hover:bg-[#f0f0f0]" />
                                </button>
                                <div className="w-[1px] h-8 bg-[#d8d8d880] opacity-70"></div>
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

export default VoucherManagement; 