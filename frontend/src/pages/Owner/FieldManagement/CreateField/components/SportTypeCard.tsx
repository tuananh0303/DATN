import React from 'react';
import { SportType } from '../interfaces/field';

interface SportTypeCardProps {
  sport: SportType;
  selected: boolean;
  onSelect: () => void;
}

export const SportTypeCard: React.FC<SportTypeCardProps> = ({ sport, selected, onSelect }) => (
  <div
    onClick={onSelect}
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
    }`}
  >
    <h3 className="font-semibold text-lg mb-2">{sport.name}</h3>
    <p className="text-gray-600 text-sm">Giá tham khảo: {sport.defaultPricing?.toLocaleString()}đ/giờ</p>
    <div className="mt-2 text-sm">
      <p>Kích thước chuẩn: {sport.standardSizes.join(', ')}</p>
      <p>Loại mặt sân: {sport.surfaceTypes.join(', ')}</p>
    </div>
  </div>
);
