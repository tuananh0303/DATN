import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchFacilityList } from '@/store/slices/facilitySlice';
import { createVoucher, VoucherFormData } from '@/store/slices/voucherSlice';
import { format } from 'date-fns';

interface CreateVoucherProps {
  onCancel?: () => void;
  onSubmit?: (data: VoucherFormData) => void;
}

const CreateVoucher: React.FC<CreateVoucherProps> = ({ onCancel, onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { facilityList, facilityListLoading } = useAppSelector(state => state.facility);
  const { loading: voucherLoading, error: voucherError } = useAppSelector(state => state.voucher);
  
  // Local state
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    voucherName: '',
    voucherCode: '',
    startTime: '',
    endTime: '',
    discountType: 'Theo số tiền',
    discountValue: '',
    minOrderValue: '',
    maxDiscount: '',
    maxUsage: ''
  });

  // Fetch facilities on component mount
  useEffect(() => {
    dispatch(fetchFacilityList());
  }, [dispatch]);

  // Handle facility selection
  const handleFacilitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFacilityId(e.target.value);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!selectedFacilityId) {
      errors.facilityId = 'Vui lòng chọn cơ sở';
    }
    
    if (!formData.voucherName.trim()) {
      errors.voucherName = 'Vui lòng nhập tên voucher';
    }
    
    if (!formData.voucherCode.trim()) {
      errors.voucherCode = 'Vui lòng nhập mã voucher';
    }
    
    if (!formData.startTime) {
      errors.startTime = 'Vui lòng chọn thời gian bắt đầu';
    }
    
    if (!formData.endTime) {
      errors.endTime = 'Vui lòng chọn thời gian kết thúc';
    }
    
    if (formData.startTime && formData.endTime) {
      const startDate = new Date(formData.startTime);
      const endDate = new Date(formData.endTime);
      
      if (isNaN(startDate.getTime())) {
        errors.startTime = 'Thời gian bắt đầu không hợp lệ';
      }
      
      if (isNaN(endDate.getTime())) {
        errors.endTime = 'Thời gian kết thúc không hợp lệ';
      }
      
      if (startDate >= endDate) {
        errors.endTime = 'Thời gian kết thúc phải sau thời gian bắt đầu';
      }
    }
    
    if (!formData.discountValue || parseFloat(formData.discountValue) <= 0) {
      errors.discountValue = 'Vui lòng nhập giá trị giảm giá hợp lệ';
    }
    
    if (!formData.minOrderValue || parseFloat(formData.minOrderValue) <= 0) {
      errors.minOrderValue = 'Vui lòng nhập giá trị đơn hàng tối thiểu';
    }
    
    if (!formData.maxDiscount || parseFloat(formData.maxDiscount) <= 0) {
      errors.maxDiscount = 'Vui lòng nhập giá trị giảm tối đa';
    }
    
    if (!formData.maxUsage || parseInt(formData.maxUsage) <= 0) {
      errors.maxUsage = 'Vui lòng nhập số lượng sử dụng tối đa';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Format date string to ISO format
  const formatDateToISO = (dateString: string): string => {
    try {
      // Assuming format is "HH:mm DD/MM/YYYY"
      const [time, date] = dateString.split(' ');
      const [hour, minute] = time.split(':');
      const [day, month, year] = date.split('/');
      
      return `${year}-${month}-${day}T${hour}:${minute}:00.000Z`;
    } catch (error) {
      return dateString; // Return as is if parsing fails
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setFormSubmitted(true);
      
      // Prepare data for API
      const voucherData: VoucherFormData = {
        name: formData.voucherName,
        code: `ANH-${formData.voucherCode}`,
        startTime: formatDateToISO(formData.startTime),
        endTime: formatDateToISO(formData.endTime),
        voucherType: formData.discountType === 'Theo số tiền' ? 'cash' : 'percent',
        value: parseInt(formData.discountValue),
        minPrice: parseInt(formData.minOrderValue),
        maxDiscount: parseInt(formData.maxDiscount),
        amount: parseInt(formData.maxUsage)
      };
      
      // Dispatch create voucher action
      await dispatch(createVoucher({
        facilityId: selectedFacilityId,
        data: voucherData
      })).unwrap();
      
      // Call onSubmit if provided
      if (onSubmit) {
        onSubmit(voucherData);
      } else {
        // Navigate back to voucher management
        navigate('/owner/voucher-management');
      }
    } catch (error) {
      console.error('Error creating voucher:', error);
      setFormSubmitted(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thông tin cơ bản */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Thông tin cơ bản</h2>

          {/* Chọn cơ sở áp dụng */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Chọn cơ sở áp dụng</label>
            <div className="flex-1">
              <select
                value={selectedFacilityId}
                onChange={handleFacilitySelect}
                className={`w-full p-3 rounded-lg border ${validationErrors.facilityId ? 'border-red-500' : 'border-gray-300'}`}
                disabled={facilityListLoading || formSubmitted}
              >
                <option value="">Chọn cơ sở của bạn</option>
                {facilityList.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
              {validationErrors.facilityId && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.facilityId}</p>
              )}
            </div>
          </div>

          {/* Tên Voucher */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Tên Voucher</label>
            <div className="flex-1">
              <input
                type="text"
                name="voucherName"
                value={formData.voucherName}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${validationErrors.voucherName ? 'border-red-500' : 'border-gray-300'}`}
                disabled={formSubmitted}
              />
              {validationErrors.voucherName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.voucherName}</p>
              )}
            </div>
          </div>

          {/* Mã Voucher */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Mã Voucher</label>
            <div className="flex-1">
              <div className="flex gap-2 items-center">
                <span className="bg-gray-100 p-3 rounded-lg">ANH</span>
                <span className="text-gray-400">|</span>
                <input
                  type="text"
                  name="voucherCode"
                  placeholder="INPUT"
                  value={formData.voucherCode}
                  onChange={handleInputChange}
                  className={`flex-1 p-3 rounded-lg border ${validationErrors.voucherCode ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={formSubmitted}
                />
              </div>
              {validationErrors.voucherCode && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.voucherCode}</p>
              )}
            </div>
          </div>

          {/* Giờ hoạt động */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Giờ hoạt động</label>
            <div className="flex-1 flex gap-4">
              <div className="flex-1">
                <div className="relative flex items-center">
                  <span className="absolute left-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    placeholder="02:50 02/10/2024"
                    className={`w-full p-3 pl-10 rounded-lg border ${validationErrors.startTime ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={formSubmitted}
                  />
                </div>
                {validationErrors.startTime && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.startTime}</p>
                )}
              </div>
              <div className="flex-1">
                <div className="relative flex items-center">
                  <span className="absolute left-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    placeholder="02:50 02/10/2024"
                    className={`w-full p-3 pl-10 rounded-lg border ${validationErrors.endTime ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={formSubmitted}
                  />
                </div>
                {validationErrors.endTime && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.endTime}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thiết lập mã giảm giá */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Thiết lập mã giảm giá</h2>

          {/* Loại giảm giá | Mức giảm */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Loại giảm giá | Mức giảm</label>
            <div className="flex-1 flex gap-2">
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleInputChange}
                className="w-40 p-3 rounded-lg border border-gray-300"
                disabled={formSubmitted}
              >
                <option value="Theo số tiền">Theo số tiền</option>
                <option value="Theo phần trăm">Theo phần trăm</option>
              </select>
              <div className="relative flex-1">
                <input
                  type="text"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${validationErrors.discountValue ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={formSubmitted}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {formData.discountType === 'Theo số tiền' ? 'đ' : '%'}
                </span>
              </div>
            </div>
            {validationErrors.discountValue && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.discountValue}</p>
            )}
          </div>

          {/* Giá trị đơn hàng tối thiểu */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Giá trị đơn hàng tối thiểu</label>
            <div className="flex-1 relative">
              <input
                type="text"
                name="minOrderValue"
                value={formData.minOrderValue}
                onChange={handleInputChange}
                className={`w-full p-3 pl-8 rounded-lg border ${validationErrors.minOrderValue ? 'border-red-500' : 'border-gray-300'}`}
                disabled={formSubmitted}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                đ
              </span>
            </div>
            {validationErrors.minOrderValue && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.minOrderValue}</p>
            )}
          </div>

          {/* Giảm tối đa */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Giảm tối đa</label>
            <div className="flex-1 relative">
              <input
                type="text"
                name="maxDiscount"
                value={formData.maxDiscount}
                onChange={handleInputChange}
                className={`w-full p-3 pl-8 rounded-lg border ${validationErrors.maxDiscount ? 'border-red-500' : 'border-gray-300'}`}
                disabled={formSubmitted}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                đ
              </span>
            </div>
            {validationErrors.maxDiscount && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.maxDiscount}</p>
            )}
          </div>

          {/* Số lượng sử dụng tối đa */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Số lượng sử dụng tối đa</label>
            <div className="flex-1">
              <input
                type="text"
                name="maxUsage"
                value={formData.maxUsage}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${validationErrors.maxUsage ? 'border-red-500' : 'border-gray-300'}`}
                disabled={formSubmitted}
              />
              {validationErrors.maxUsage && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.maxUsage}</p>
              )}
            </div>
          </div>
        </div>

        {/* Error message */}
        {voucherError && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            {voucherError}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel || (() => navigate('/owner/voucher-management'))}
            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            disabled={formSubmitted}
          >
            Hủy
          </button>
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg ${
              voucherLoading || formSubmitted
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            disabled={voucherLoading || formSubmitted}
          >
            {voucherLoading ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVoucher;