import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchFacilityList } from '@/store/slices/facilitySlice';
import { fetchServices, deleteService } from '@/store/slices/serviceSlice';

const ServiceManagement: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { facilityList } = useAppSelector(state => state.facility);
  const { services, loading, error } = useAppSelector(state => state.service);
  
  // Local state
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch facilities on component mount
  useEffect(() => {
    dispatch(fetchFacilityList());
  }, [dispatch]);

  // Fetch services when facility is selected
  useEffect(() => {
    if (selectedFacilityId) {
      dispatch(fetchServices(selectedFacilityId));
    }
  }, [dispatch, selectedFacilityId]);

  // Handle facility selection
  const handleFacilitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFacilityId(e.target.value);
  };

  // Handle service deletion
  const handleDeleteService = async (serviceId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này không?')) {
      try {
        await dispatch(deleteService(serviceId)).unwrap();
        // Refresh services list
        if (selectedFacilityId) {
          dispatch(fetchServices(selectedFacilityId));
        }
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  // Filter services by search term
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate services
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  return (
    <div className="flex flex-col p-5 bg-[#f5f6fa] min-h-screen w-full box-border">
      {/* Header and Actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý dịch vụ</h1>
        <button
          onClick={() => navigate('/owner/create-service')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Thêm dịch vụ mới
        </button>
      </div>

      {/* Facility Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Chọn cơ sở</label>
        <div className="relative">
          <select
            value={selectedFacilityId}
            onChange={handleFacilitySelect}
            className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2
                     text-lg bg-white cursor-pointer focus:outline-none"
          >
            <option value="">Chọn cơ sở của bạn</option>
            {facilityList.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-[540px] h-10 relative mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm dịch vụ"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
        />
        <svg 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>

      {selectedFacilityId ? (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          ) : services.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-6">
              <p className="text-lg text-gray-600 mb-4">Chưa có dịch vụ nào</p>
              <button
                onClick={() => navigate('/owner/service-management/create')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                + Thêm dịch vụ mới
              </button>
            </div>
          ) : (
            <>
              {/* Services List */}
              <div className="bg-white rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tên dịch vụ</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Loại hình</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Giá</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Số lượng</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentServices.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {service.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {service.sport.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {service.price.toLocaleString()} đ
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {service.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/owner/service-management/edit/${service.id}`)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Sửa
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id.toString())}
                              className="text-red-600 hover:text-red-900"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <nav className="flex items-center">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      Trước
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === page ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      Sau
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-6">
          <p className="text-lg text-gray-600 mb-4">Vui lòng chọn cơ sở để xem danh sách dịch vụ</p>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;