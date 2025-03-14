import React from 'react';
import { Sport } from '@/store/slices/fieldSlice';
import { DEFAULT_PRICING, SURFACE_TYPES, DIMENSIONS } from '@/pages/Owner/FieldManagement/CreateField/constants/sportTypes';

interface SportTypeCardProps {
  sport: Sport;
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
      onClick={onSelect}
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <h3 className="font-semibold text-lg mb-2">{getSportDisplayName(sport.name)}</h3>
      <p className="text-gray-600 text-sm">Giá tham khảo: {defaultPricing.toLocaleString()}đ/giờ</p>
      <div className="mt-2 text-sm">
        <p>Kích thước chuẩn: {DIMENSIONS[sportKey]?.join(', ')}</p>
        <p>Loại mặt sân: {SURFACE_TYPES[sportKey]?.join(', ')}</p>
      </div>
    </div>
  );
};

