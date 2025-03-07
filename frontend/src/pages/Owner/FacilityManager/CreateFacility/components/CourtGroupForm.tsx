import React, { useState } from 'react';
import { SportType, CourtGroup, Court, PeakHourPricing } from '../interfaces/facility';

interface CourtGroupFormProps {
  sportType: SportType;
  allSportTypes: SportType[];
  onSave: (courtGroup: CourtGroup) => void;
  onCancel: () => void;
  initialData?: CourtGroup;
}

export const CourtGroupForm: React.FC<CourtGroupFormProps> = ({
  sportType,
  allSportTypes,
  onSave,
  onCancel,
  initialData
}) => {
  const [formData, setFormData] = useState({
    quantity: initialData?.courts[0]?.quantity || 1,
    size: initialData?.courts[0]?.size || sportType.standardSizes[0],
    surface: initialData?.courts[0]?.surface || sportType.surfaceTypes[0],
    basePrice: initialData?.courts[0]?.basePrice || sportType.defaultPricing || 0,
    selectedSportTypes: initialData?.sportTypeIds || [sportType.id],
    namingMethod: 'numeric' as 'numeric' | 'alphabet' | 'custom',
    customNames: [] as string[],
    peakHourPricing: initialData?.courts[0]?.peakHourPricing || [
      {
        startTime: '17:00',
        endTime: '22:00',
        priceIncrease: 0
      }
    ]
  });

  const handlePeakHourChange = (
    index: number,
    field: keyof PeakHourPricing,
    value: string | number
  ) => {
    const newPeakHours = [...formData.peakHourPricing];
    newPeakHours[index] = {
      ...newPeakHours[index],
      [field]: value
    };
    setFormData({ ...formData, peakHourPricing: newPeakHours });
  };

  const generateCourtNames = (quantity: number, method: string, customNames: string[], prefix: string) => {
    switch (method) {
      case 'numeric':
        return Array(quantity).fill(null)
          .map((_, i) => `${prefix} ${String(i + 1).padStart(2, '0')}`);
      case 'alphabet':
        return Array(quantity).fill(null)
          .map((_, i) => `${prefix} ${String.fromCharCode(65 + i)}`);
      case 'custom':
        return customNames.length === quantity 
          ? customNames 
          : Array(quantity).fill(null).map((_, i) => customNames[i] || `${prefix} ${i + 1}`);
      default:
        return Array(quantity).fill(null)
          .map((_, i) => `${prefix} ${String(i + 1).padStart(2, '0')}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isMultiSport = formData.selectedSportTypes.length > 1;
    const groupName = isMultiSport ? 'Sân tổng hợp' : sportType.name;
    
    const courtNames = generateCourtNames(
      formData.quantity,
      formData.namingMethod,
      formData.customNames,
      groupName
    );

    const courts: Court[] = Array(formData.quantity).fill(null).map((_, index) => ({
      id: initialData?.courts[index]?.id || `${Date.now()}-${index}`,
      sportTypeIds: formData.selectedSportTypes,
      name: courtNames[index],
      quantity: 1,
      size: formData.size,
      surface: formData.surface,
      basePrice: formData.basePrice,
      peakHourPricing: formData.peakHourPricing,
      status: 'active'
    }));

    const courtGroup: CourtGroup = {
      id: initialData?.id || `group-${Date.now()}`,
      sportTypeIds: formData.selectedSportTypes,
      name: groupName,
      courts,
      isMultiSport
    };

    onSave(courtGroup);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">

         {/* Chọn loại hình thể thao (cho sân tổng hợp) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Loại hình thể thao
        </label>
        <div className="space-y-2">
          {allSportTypes.map(sport => (
            <label key={sport.id} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.selectedSportTypes.includes(sport.id)}
                onChange={(e) => {
                  const newSelected = e.target.checked
                    ? [...formData.selectedSportTypes, sport.id]
                    : formData.selectedSportTypes.filter(id => id !== sport.id);
                  setFormData({
                    ...formData,
                    selectedSportTypes: newSelected
                  });
                }}
                className="mr-2"
              />
              {sport.name}
            </label>
          ))}
        </div>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Số lượng sân
        </label>
        <input
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kích thước sân
        </label>
        <select
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          className="w-full p-2 border rounded"
        >
          {sportType.standardSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Loại mặt sân
        </label>
        <select
          value={formData.surface}
          onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
          className="w-full p-2 border rounded"
        >
          {sportType.surfaceTypes.map(surface => (
            <option key={surface} value={surface}>{surface}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Giá thuê (đ/giờ)
        </label>
        <input
          type="number"
          min="0"
          step="1000"
          value={formData.basePrice}
          onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>

          {/* Phương thức đặt tên */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phương thức đặt tên
        </label>
        <select
          value={formData.namingMethod}
          onChange={(e) => setFormData({
            ...formData,
            namingMethod: e.target.value as typeof formData.namingMethod
          })}
          className="w-full p-2 border rounded"
        >
          <option value="numeric">Theo số (01, 02,...)</option>
          <option value="alphabet">Theo chữ cái (A, B,...)</option>
          <option value="custom">Tùy chỉnh</option>
        </select>
      </div>

      {/* Tên tùy chỉnh */}
      {formData.namingMethod === 'custom' && (
        <div className="space-y-2">
          {Array(formData.quantity).fill(null).map((_, i) => (
            <input
              key={i}
              value={formData.customNames[i] || ''}
              onChange={(e) => {
                const newNames = [...formData.customNames];
                newNames[i] = e.target.value;
                setFormData({
                  ...formData,
                  customNames: newNames
                });
              }}
              placeholder={`Tên sân ${i + 1}`}
              className="w-full p-2 border rounded"
            />
          ))}
        </div>
      )}

      {/* Giá giờ cao điểm */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Số tiền được tăng thêm trong giờ cao điểm
        </label>
        {formData.peakHourPricing.map((pricing, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <input
              type="time"
              value={pricing.startTime}
              onChange={(e) => handlePeakHourChange(index, 'startTime', e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="time"
              value={pricing.endTime}
              onChange={(e) => handlePeakHourChange(index, 'endTime', e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="number"
              value={pricing.priceIncrease}
              onChange={(e) => handlePeakHourChange(index, 'priceIncrease', Number(e.target.value))}
              placeholder="Giá tăng thêm"
              className="p-2 border rounded"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Lưu
        </button>
      </div>

      
    </form>
  );
}; 