import React, { useState } from 'react';

interface CreateEventProps {
  onCancel?: () => void;
  onSubmit?: (data: EventFormData) => void;
}

interface EventFormData {
  facility: string;
  sportType: string;
  courts: string[];
  eventName: string;
  description: string;
  startTime: string;
  endTime: string;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState<EventFormData>({
    facility: '',
    sportType: '',
    courts: [],
    eventName: '',
    description: '',
    startTime: '',
    endTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Thông tin sự kiện</h2>
      
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

        {/* Các sân tổ chức sự kiện */}
        <div className="flex items-center">
          <label className="w-48 text-right mr-4">Các sân tổ chức sự kiện</label>
          <div className="flex-1">
            <select
              value={formData.courts}
              onChange={(e) => setFormData({...formData, courts: [e.target.value]})}
              className="w-full p-3 rounded-lg border border-gray-300"
            >
              <option value="">Sân 1, Sân 2, Sân 3</option>
            </select>
          </div>
        </div>

        {/* Tên sự kiện */}
        <div className="flex items-center">
          <label className="w-48 text-right mr-4">Tên sự kiện</label>
          <div className="flex-1">
            <input
              type="text"
              value={formData.eventName}
              onChange={(e) => setFormData({...formData, eventName: e.target.value})}
              className="w-full p-3 rounded-lg border border-gray-300"
              placeholder="Nhập tên sự kiện"
            />
          </div>
        </div>

        {/* Mô tả */}
        <div className="flex items-center">
          <label className="w-48 text-right mr-4">Mô tả</label>
          <div className="flex-1">
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 rounded-lg border border-gray-300 min-h-[100px]"
              placeholder="Nhập mô tả sự kiện"
            />
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
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  placeholder="02:50 02/10/2024"
                  className="w-full p-3 pl-10 rounded-lg border border-gray-300"
                />
              </div>
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
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  placeholder="02:50 02/10/2024"
                  className="w-full p-3 pl-10 rounded-lg border border-gray-300"
                />
              </div>
            </div>
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

export default CreateEvent; 