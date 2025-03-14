import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchFacilityList } from '@/store/slices/facilitySlice';
import { createService, ServiceFormData } from '@/store/slices/serviceSlice';
import { fieldService } from '@/services/field.service';

interface CreateServiceProps {
  onCancel?: () => void;
  onSubmit?: (data: ServiceFormData) => void;
}

const CreateService: React.FC<CreateServiceProps> = ({ onCancel, onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { facilityList, facilityListLoading } = useAppSelector(state => state.facility);
  const { loading: serviceLoading, error: serviceError } = useAppSelector(state => state.service);
  
  // Local state
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('');
  const [sports, setSports] = useState<any[]>([]);
  const [selectedSportId, setSelectedSportId] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [servicesList, setServicesList] = useState<ServiceFormData[]>([]);
  
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    price: 0,
    description: '',
    amount: 0,
    sportId: 0
  });

  // Fetch facilities and sports on component mount
  useEffect(() => {
    dispatch(fetchFacilityList());
    fetchSports();
  }, [dispatch]);

  // Fetch sports from API
  const fetchSports = async () => {
    try {
      const sportsData = await fieldService.getSport();
      setSports(sportsData);
    } catch (error) {
      console.error('Error fetching sports:', error);
    }
  };

  // Handle facility selection
  const handleFacilitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFacilityId(e.target.value);
  };

  // Handle sport selection
  const handleSportSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sportId = parseInt(e.target.value);
    setSelectedSportId(sportId);
    setFormData(prev => ({ ...prev, sportId }));
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert price and amount to numbers
    if (name === 'price' || name === 'amount') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Add service to the list
  const handleAddService = () => {
    if (!formData.name || !formData.price || !selectedSportId) {
      alert('Vui lòng điền đầy đủ thông tin dịch vụ');
      return;
    }

    setServicesList(prev => [...prev, { ...formData, sportId: selectedSportId }]);
    
    // Reset form
    setFormData({
      name: '',
      price: 0,
      description: '',
      amount: 0,
      sportId: selectedSportId || 0
    });
  };

  // Remove service from the list
  const handleRemoveService = (index: number) => {
    setServicesList(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFacilityId) {
      alert('Vui lòng chọn cơ sở');
      return;
    }

    if (servicesList.length === 0) {
      alert('Vui lòng thêm ít nhất một dịch vụ');
      return;
    }

    try {
      setFormSubmitted(true);
      
      // Dispatch create service action
      await dispatch(createService({
        facilityId: selectedFacilityId,
        data: { servicesData: servicesList }
      })).unwrap();
      
      // Call onSubmit if provided
      if (onSubmit) {
        onSubmit(formData);
      } else {
        // Navigate back to service management
        navigate('/owner/service-management');
      }
    } catch (error) {
      console.error('Error creating services:', error);
      setFormSubmitted(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Thông tin dịch vụ</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Chọn cơ sở áp dụng */}
        <div className="flex items-center">
          <label className="w-48 text-right mr-4">Chọn cơ sở áp dụng</label>
          <div className="flex-1">
            <select
              value={selectedFacilityId}
              onChange={handleFacilitySelect}
              className="w-full p-3 rounded-lg border border-gray-300"
              disabled={facilityListLoading || formSubmitted}
            >
              <option value="">Chọn cơ sở của bạn</option>
              {facilityList.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedFacilityId && (
          <>
            {/* Chọn loại hình thể thao */}
            <div className="flex items-center">
              <label className="w-48 text-right mr-4">Chọn loại hình thể thao</label>
              <div className="flex-1">
                <select
                  value={selectedSportId || ''}
                  onChange={handleSportSelect}
                  className="w-full p-3 rounded-lg border border-gray-300"
                  disabled={formSubmitted}
                >
                  <option value="">Chọn loại hình thể thao</option>
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedSportId && (
              <>
                {/* Tên dịch vụ */}
                <div className="flex items-center">
                  <label className="w-48 text-right mr-4">Tên dịch vụ</label>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      disabled={formSubmitted}
                    />
                  </div>
                </div>

                {/* Mô tả dịch vụ */}
                <div className="flex items-center">
                  <label className="w-48 text-right mr-4">Mô tả dịch vụ</label>
                  <div className="flex-1">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      rows={3}
                      disabled={formSubmitted}
                    />
                  </div>
                </div>

                {/* Giá dịch vụ */}
                <div className="flex items-center">
                  <label className="w-48 text-right mr-4">Giá dịch vụ</label>
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-gray-300"
                        disabled={formSubmitted}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        đ
                      </span>
                    </div>
                  </div>
                </div>

                {/* Số lượng */}
                <div className="flex items-center">
                  <label className="w-48 text-right mr-4">Số lượng</label>
                  <div className="flex-1">
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      disabled={formSubmitted}
                    />
                  </div>
                </div>

                {/* Add Service Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    disabled={formSubmitted}
                  >
                    Thêm dịch vụ
                  </button>
                </div>
              </>
            )}

            {/* Services List */}
            {servicesList.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Danh sách dịch vụ</h3>
                <div className="space-y-3">
                  {servicesList.map((service, index) => {
                    const sportName = sports.find(s => s.id === service.sportId)?.name || '';
                    
                    return (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{service.name}</h5>
                            <p className="text-sm text-gray-600">Loại hình: {sportName}</p>
                            <p className="text-sm text-gray-600">Giá: {service.price.toLocaleString()} đ</p>
                            <p className="text-sm text-gray-600">Số lượng: {service.amount}</p>
                            {service.description && (
                              <p className="text-sm text-gray-600 mt-1">Mô tả: {service.description}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveService(index)}
                            disabled={formSubmitted}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={onCancel || (() => navigate('/owner/service-management'))}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                disabled={formSubmitted}
              >
                Hủy
              </button>
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg ${
                  serviceLoading || formSubmitted
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                disabled={serviceLoading || formSubmitted}
              >
                {serviceLoading ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>

            {/* Error message */}
            {serviceError && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {serviceError}
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default CreateService;