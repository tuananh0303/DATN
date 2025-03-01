import React, { useState } from 'react';

interface CreateFacilityStep1Props {
  onNext?: () => void;
  onExit?: () => void;
  onSubmit?: (data: FacilityFormData) => void;
}

interface FacilityFormData {
  name: string;
  description: string;
  openTime: string;
  closeTime: string;
  city: string;
  district: string;
  ward: string;
  address: string;
}

const CreateFacilityStep1: React.FC<CreateFacilityStep1Props> = ({ onNext, onExit, onSubmit }) => {
  const [formData, setFormData] = useState<FacilityFormData>({
    name: 'Sân cầu lông Phạm Kha',
    description: 'Sân được thiết kế thoáng mát, rộng rãi. Có trang thiết bị hiện đại.',
    openTime: '05:00',
    closeTime: '23:00',
    city: 'Thành phố Hồ Chí Minh',
    district: 'Bình Chánh',
    ward: 'Phong Phú',
    address: 'Số 29 đường Phạm Văn Đồng'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    onNext?.();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Bước 1: Điền thông tin của cơ sở bạn muốn tạo</h1>
        <button
          onClick={onExit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Thoát
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tên cơ sở */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên cơ sở
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 border rounded-lg"
            placeholder="Nhập tên cơ sở"
          />
        </div>

        {/* Mô tả cơ sở */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả cơ sở
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-3 border rounded-lg min-h-[100px]"
            placeholder="Mô tả chi tiết về cơ sở của bạn"
          />
        </div>

        {/* Giờ hoạt động */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giờ hoạt động
          </label>
          <div className="flex gap-4">
            <select
              value={formData.openTime}
              onChange={(e) => setFormData({...formData, openTime: e.target.value})}
              className="flex-1 p-3 border rounded-lg"
            >
              <option value="05:00">05:00</option>
              {/* Add more time options */}
            </select>
            <select
              value={formData.closeTime}
              onChange={(e) => setFormData({...formData, closeTime: e.target.value})}
              className="flex-1 p-3 border rounded-lg"
            >
              <option value="23:00">23:00</option>
              {/* Add more time options */}
            </select>
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn tỉnh, thành phố
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full p-3 border rounded-lg"
            >
              <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn quận, huyện
            </label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value})}
              className="w-full p-3 border rounded-lg"
            >
              <option value="Bình Chánh">Bình Chánh</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn phường, xã
            </label>
            <select
              value={formData.ward}
              onChange={(e) => setFormData({...formData, ward: e.target.value})}
              className="w-full p-3 border rounded-lg"
            >
              <option value="Phong Phú">Phong Phú</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số nhà, tên đường
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="Nhập số nhà, tên đường"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Tiếp theo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFacilityStep1; 