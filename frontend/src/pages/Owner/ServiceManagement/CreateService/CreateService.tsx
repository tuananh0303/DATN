import React, { useState } from 'react';

interface CreateServiceProps {
  onCancel?: () => void;
  onSubmit?: (data: ServiceFormData) => void;
}

interface ServiceFormData {
  facility: string;
  sportType: string;
  serviceName: string;
  serviceType: string;
  price: string;
  timeFrom: string;
  timeTo: string;
  status: string;
}

const CreateService: React.FC<CreateServiceProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    facility: '',
    sportType: '',
    serviceName: '',
    serviceType: 'Theo số tiền',
    price: '',
    timeFrom: '05:00',
    timeTo: '23:00',
    status: 'Còn'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
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
              value={formData.facility}
              onChange={(e) => setFormData({...formData, facility: e.target.value})}
              className="w-full p-3 rounded-lg border border-gray-300"
            >
              <option value="">Sân cầu lông Phạm Kha, Sân cầu lông Bình Chánh</option>
            </select>
          </div>
        </div>

        {/* Chọn loại hình thể thao */}
        <div className="flex items-center">
          <label className="w-48 text-right mr-4">Chọn loại hình thể thao</label>
          <div className="flex-1">
            <select
              value={formData.sportType}
              onChange={(e) => setFormData({...formData, sportType: e.target.value})}
              className="w-full p-3 rounded-lg border border-gray-300"
            >
              <option value="Cầu lông">Cầu lông</option>
            </select>
          </div>
        </div>

        {/* Tên dịch vụ */}
        <div className="flex items-center">
          <label className="w-48 text-right mr-4">Tên dịch vụ</label>
          <div className="flex-1">
            <input
              type="text"
              value={formData.serviceName}
              onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
              className="w-full p-3 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        {/* Loại dịch vụ | Mức giá */}
        <div className="flex items-center">
          <label className="w-48 text-right mr-4">Loại dịch vụ | Mức giá</label>
          <div className="flex-1 flex gap-2">
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
              className="w-40 p-3 rounded-lg border border-gray-300"
            >
              <option value="Theo số tiền">Theo số tiền</option>
            </select>
            <div className="relative flex-1">
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                đ/h
              </span>
            </div>
          </div>
        </div>

        {/* Thời gian áp dụng */}
        <div className="flex items-center">
          <label className="w-48 text-right mr-4">Thời gian áp dụng</label>
          <div className="flex-1 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Từ</span>
              <select
                value={formData.timeFrom}
                onChange={(e) => setFormData({...formData, timeFrom: e.target.value})}
                className="p-3 rounded-lg border border-gray-300"
              >
                <option value="05:00">05:00</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span>Đến</span>
              <select
                value={formData.timeTo}
                onChange={(e) => setFormData({...formData, timeTo: e.target.value})}
                className="p-3 rounded-lg border border-gray-300"
              >
                <option value="23:00">23:00</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trạng thái */}
        <div className="flex items-center">
          <label className="w-48 text-right mr-4">Trạng thái</label>
          <div className="flex-1">
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-3 rounded-lg border border-gray-300"
            >
              <option value="Còn">Còn</option>
              <option value="Hết">Hết</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateService; 