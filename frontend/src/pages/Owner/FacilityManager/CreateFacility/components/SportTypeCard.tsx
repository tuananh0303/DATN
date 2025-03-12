import React from 'react';
import { SportType } from '@/pages/Owner/FacilityManager/CreateFacility/interfaces/facility';
import { DEFAULT_PRICING, SURFACE_TYPES } from '@/pages/Owner/FacilityManager/CreateFacility/constants/sportTypes';

interface SportTypeCardProps {
  sport: SportType;
  selected: boolean;
  onSelect: () => void;
}

// Hàm chuyển đổi tên thể thao sang tiếng Việt
const getSportDisplayName = (sportName: string): string => {
  const sportNameMap: Record<string, string> = {
    'football': 'Bóng đá',
    'volleyball': 'Bóng chuyền',
    'basketball': 'Bóng rổ',
    'badminton': 'Cầu lông',
    'pingpong': 'Bóng bàn',
    // Các loại thể thao giữ nguyên tên tiếng Anh
    'golf': 'Golf',
    'tennis': 'Tennis',
    'pickleball': 'Pickleball'
  };

  // Chuyển tên thể thao thành key (loại bỏ khoảng trắng và chuyển thành chữ thường)
  const sportKey = sportName.toLowerCase().replace(/\s+/g, '');
  
  // Trả về tên tiếng Việt nếu có, nếu không thì giữ nguyên tên gốc
  return sportNameMap[sportKey] || sportName;
};


export const SportTypeCard: React.FC<SportTypeCardProps> = ({ sport, selected, onSelect }) => {
  // Get the sport key for accessing mock data
  const sportKey = sport.name.toLowerCase().replace(/\s+/g, '') as keyof typeof SURFACE_TYPES || 'default';
  
  // Get surface types and dimensions from mock data
  const defaultPricing = DEFAULT_PRICING[sportKey] || DEFAULT_PRICING.default;

  return (
    <div 
      className={`
        border rounded-lg p-3 cursor-pointer transition-all
        ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
      `}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{getSportDisplayName(sport.name)}</h3>
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
          {selected && <span className="text-white text-xs">✓</span>}
        </div>
      </div>
      
      <div className="text-xs text-gray-600">
        <p>Giá tham khảo: {defaultPricing.toLocaleString()} VNĐ/giờ</p>
      </div>
    </div>
  );
};
