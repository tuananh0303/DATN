import React, { useState, useEffect } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { FieldGroupData, SportType } from '@/pages/Owner/FacilityManager/CreateFacility/interfaces/facility';
import { SURFACE_TYPES, DIMENSIONS, DEFAULT_PRICING } from '@/pages/Owner/FacilityManager/CreateFacility/constants/sportTypes';

interface FieldGroupFormProps {
  sport: SportType;
  allSports: SportType[];
  onSave: (fieldGroup: FieldGroupData) => void;
  onCancel: () => void;
  initialData?: FieldGroupData;
}

export const FieldGroupForm: React.FC<FieldGroupFormProps> = ({
  sport,
  allSports,
  onSave,
  onCancel,
  initialData
}) => {
  // Get the sport key for accessing mock data
  const sportKey = sport.name.toLowerCase().replace(/\s+/g, '') as keyof typeof SURFACE_TYPES || 'default';
  
  // Get surface types and dimensions from mock data
  const surfaceTypes = SURFACE_TYPES[sportKey] || SURFACE_TYPES.default;
  const dimensions = DIMENSIONS[sportKey] || DIMENSIONS.default;
  const defaultPrice = DEFAULT_PRICING[sportKey] || DEFAULT_PRICING.default;

  // State
  const [name, setName] = useState(initialData?.name || '');
  const [dimension, setDimension] = useState(initialData?.dimension || dimensions[0]);
  const [surface, setSurface] = useState(initialData?.surface || surfaceTypes[0]);
  const [basePrice, setBasePrice] = useState(initialData?.basePrice || defaultPrice);
  const [peakStartTime, setPeakStartTime] = useState(initialData?.peakStartTime || '00:00');
  const [peakEndTime, setPeakEndTime] = useState(initialData?.peakEndTime || '23:00');
  const [priceIncrease, setPriceIncrease] = useState(initialData?.priceIncrease || 0);
  const [fieldCount, setFieldCount] = useState(initialData?.fieldsData?.length || 1);
  const [namingMethod, setNamingMethod] = useState('auto');
  const [fieldPrefix, setFieldPrefix] = useState('Sân');
  const [customNames, setCustomNames] = useState<string[]>(
    initialData?.fieldsData?.map(field => field.name) || Array(fieldCount).fill('')
  );
  const [isMultiSport, setIsMultiSport] = useState(false);
  const [selectedSportIds, setSelectedSportIds] = useState<number[]>(
    initialData?.sportIds || [sport.id]
  );

  // Update field names when count or prefix changes
  useEffect(() => {
    if (namingMethod === 'auto') {
      const newNames = Array(fieldCount).fill('').map((_, i) => `${fieldPrefix} ${i + 1}`);
      setCustomNames(newNames);
    }
  }, [fieldCount, namingMethod, fieldPrefix]);

  // Generate field names based on naming method
  const generateFieldNames = (quantity: number, method: string, customNames: string[], prefix: string) => {
    if (method === 'custom') {
      return customNames.slice(0, quantity);
    } else {
      return Array(quantity).fill('').map((_, i) => `${prefix} ${i + 1}`);
    }
  };

  // Handle custom name change
  const handleCustomNameChange = (index: number, value: string) => {
    const newNames = [...customNames];
    newNames[index] = value;
    setCustomNames(newNames);
  };

  // Handle sport selection
  const handleSportSelect = (id: number) => {
    setSelectedSportIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(sportId => sportId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fieldNames = generateFieldNames(fieldCount, namingMethod, customNames, fieldPrefix);
    
    const newFieldGroup: FieldGroupData = {
      name,
      dimension,
      surface,
      basePrice: Number(basePrice),
      peakStartTime,
      peakEndTime,
      priceIncrease: Number(priceIncrease),
      sportIds: isMultiSport ? selectedSportIds : [sport.id],
      fieldsData: fieldNames.map(name => ({ name }))
    };
    
    console.log('Saving field group:', newFieldGroup);
    onSave(newFieldGroup);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Chỉnh sửa nhóm sân' : 'Thêm nhóm sân mới'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Thông tin cơ bản</h3>

            <label className=" mt-2 block ">Tên nhóm sân</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded mb-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            <div className="grid grid-cols-2 gap-4">
              <div>
                
                <label className="block mb-1">Kích thước sân</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={dimension}
                  onChange={(e) => setDimension(e.target.value)}
                >
                  {dimensions.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                  <option value="custom">Kích thước khác</option>
                </select>
                {dimension === 'custom' && (
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Nhập kích thước (vd: 15m x 7m)"
                    value={dimension === 'custom' ? '' : dimension}
                    onChange={(e) => setDimension(e.target.value)}
                  />
                )}
              </div>
              
              <div>
                <label className="block mb-1">Bề mặt sân</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                >
                  {surfaceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                  <option value="custom">Loại khác</option>
                </select>
                {surface === 'custom' && (
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Nhập loại bề mặt"
                    value={surface === 'custom' ? '' : surface}
                    onChange={(e) => setSurface(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
          
          {/* Base Price */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Giá cơ bản</h3>
            <div className="flex items-center">
              <input 
                type="number" 
                className="w-full p-2 border rounded"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                min="0"
                step="10000"
              />
              <span className="ml-2">VNĐ/giờ</span>
            </div>
          </div>
          
          {/* Peak Hours */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Giờ cao điểm</h3>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <div>
                <label className="block mb-1">Từ</label>
                <TimePicker
                  className="w-full"
                  format="HH:mm"
                  value={dayjs(peakStartTime, 'HH:mm')}
                  onChange={(time) => setPeakStartTime(time ? time.format('HH:mm') : '00:00')}
                />
              </div>
              <div>
                <label className="block mb-1">Đến</label>
                <TimePicker
                  className="w-full"
                  format="HH:mm"
                  value={dayjs(peakEndTime, 'HH:mm')}
                  onChange={(time) => setPeakEndTime(time ? time.format('HH:mm') : '00:00')}
                />
              </div>
              <div>
                <label className="block mb-1">Tăng giá</label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    className="w-full p-2 border rounded"
                    value={priceIncrease}
                    onChange={(e) => setPriceIncrease(Number(e.target.value))}
                    min="0"
                    step="10000"
                  />
                  <span className="ml-2">VNĐ</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sport Types */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Loại hình thể thao</h3>
            <div className="mb-2">
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={isMultiSport}
                  onChange={() => setIsMultiSport(!isMultiSport)}
                  className="mr-2"
                />
                Sân đa năng (nhiều môn thể thao)
              </label>
            </div>
            
            {isMultiSport && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {allSports.map(sport => (
                  <label key={sport.id} className="inline-flex items-center p-2 border rounded">
                    <input 
                      type="checkbox"
                      checked={selectedSportIds.includes(sport.id)}
                      onChange={() => handleSportSelect(sport.id)}
                      className="mr-2"
                    />
                    {sport.name}
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Field Count and Names */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Số lượng và tên sân</h3>
            <div className="mb-4">
              <label className="block mb-1">Số lượng sân</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded"
                value={fieldCount}
                onChange={(e) => setFieldCount(Number(e.target.value))}
                min="1"
                max="20"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Phương thức đặt tên</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="namingMethod"
                    value="auto"
                    checked={namingMethod === 'auto'}
                    onChange={() => setNamingMethod('auto')}
                    className="mr-2"
                  />
                  Tự động
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="namingMethod"
                    value="custom"
                    checked={namingMethod === 'custom'}
                    onChange={() => setNamingMethod('custom')}
                    className="mr-2"
                  />
                  Tùy chỉnh
                </label>
              </div>
            </div>
            
            {namingMethod === 'auto' && (
              <div className="mb-4">
                <label className="block mb-1">Tiền tố</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded"
                  value={fieldPrefix}
                  onChange={(e) => setFieldPrefix(e.target.value)}
                  placeholder="Ví dụ: Sân, Field, ..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Tên sân sẽ được đặt theo mẫu: {fieldPrefix} 1, {fieldPrefix} 2, ...
                </p>
              </div>
            )}
            
            {namingMethod === 'custom' && (
              <div>
                <label className="block mb-1">Tên tùy chỉnh</label>
                <div className="grid grid-cols-2 gap-2">
                  {Array(fieldCount).fill(0).map((_, index) => (
                    <input 
                      key={index}
                      type="text" 
                      className="p-2 border rounded mb-2"
                      value={customNames[index] || ''}
                      onChange={(e) => handleCustomNameChange(index, e.target.value)}
                      placeholder={`Tên sân ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button 
              type="button"
              className="px-4 py-2 border rounded"
              onClick={onCancel}
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};