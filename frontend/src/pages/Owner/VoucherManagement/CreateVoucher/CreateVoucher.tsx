import React, { useState } from 'react';

interface CreateVoucherProps {
  onCancel?: () => void;
  onSubmit?: (data: VoucherFormData) => void;
}

interface VoucherFormData {
  facilities: string;
  sportTypes: string;
  voucherName: string;
  voucherCode: string;
  startTime: string;
  endTime: string;
  discountType: string;
  discountValue: string;
  minOrderValue: string;
  maxUsage: string;
  maxPerUser: string;
}

const CreateVoucher: React.FC<CreateVoucherProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState<VoucherFormData>({
    facilities: '',
    sportTypes: '',
    voucherName: '',
    voucherCode: '',
    startTime: '',
    endTime: '',
    discountType: 'Theo số tiền',
    discountValue: '',
    minOrderValue: '',
    maxUsage: '',
    maxPerUser: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
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
                value={formData.facilities}
                onChange={(e) => setFormData({...formData, facilities: e.target.value})}
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
                value={formData.sportTypes}
                onChange={(e) => setFormData({...formData, sportTypes: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300"
              >
                <option value="">Cầu lông, Bóng bàn</option>
              </select>
            </div>
          </div>

          {/* Tên Voucher */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Tên Voucher</label>
            <div className="flex-1">
              <input
                type="text"
                value={formData.voucherName}
                onChange={(e) => setFormData({...formData, voucherName: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
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
                  placeholder="INPUT"
                  value={formData.voucherCode}
                  onChange={(e) => setFormData({...formData, voucherCode: e.target.value})}
                  className="flex-1 p-3 rounded-lg border border-gray-300"
                />
              </div>
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
        </div>

        {/* Thiết lập mã giảm giá */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Thiết lập mã giảm giá</h2>

          {/* Loại giảm giá | Mức giảm */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Loại giảm giá | Mức giảm</label>
            <div className="flex-1 flex gap-2">
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                className="w-40 p-3 rounded-lg border border-gray-300"
              >
                <option value="Theo số tiền">Theo số tiền</option>
                <option value="Theo phần trăm">Theo phần trăm</option>
              </select>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  đ
                </span>
              </div>
            </div>
          </div>

          {/* Giá trị đơn hàng tối thiểu */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Giá trị đơn hàng tối thiểu</label>
            <div className="flex-1 relative">
              <input
                type="text"
                value={formData.minOrderValue}
                onChange={(e) => setFormData({...formData, minOrderValue: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                đ
              </span>
            </div>
          </div>

          {/* Số lượng sử dụng tối đa */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Số lượng sử dụng tối đa</label>
            <div className="flex-1">
              <input
                type="text"
                value={formData.maxUsage}
                onChange={(e) => setFormData({...formData, maxUsage: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          {/* Lượt sử dụng tối đa/người chơi */}
          <div className="flex items-center">
            <label className="w-48 text-right mr-4">Lượt sử dụng tối đa/người chơi</label>
            <div className="flex-1">
              <input
                type="text"
                value={formData.maxPerUser}
                onChange={(e) => setFormData({...formData, maxPerUser: e.target.value})}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
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

export default CreateVoucher; 