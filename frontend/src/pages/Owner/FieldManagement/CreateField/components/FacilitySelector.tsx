import React, { useState, useEffect } from 'react';
import { Facility } from '../interfaces/field';
import axios from 'axios';

interface FacilitySelectorProps {
  selectedFacility: string;
  onSelect: (facilityId: string) => void;
}

// Mock data cho facilities
const MOCK_FACILITIES: Facility[] = [
  {
    id: 'facility-1',
    name: 'Sân Thể Thao ABC',
    address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    openTime: '06:00',
    closeTime: '22:00'
  },
  {
    id: 'facility-2',
    name: 'Trung Tâm Thể Thao XYZ',
    address: '456 Lê Văn B, Quận 2, TP.HCM',
    openTime: '05:30',
    closeTime: '23:00'
  },
  {
    id: 'facility-3',
    name: 'Sân Vận Động 123',
    address: '789 Trần Văn C, Quận 3, TP.HCM',
    openTime: '07:00',
    closeTime: '21:00'
  },
  {
    id: 'facility-4',
    name: 'Khu Thể Thao Đa Năng',
    address: '321 Phạm Văn D, Quận 4, TP.HCM',
    openTime: '06:30',
    closeTime: '22:30'
  }
];

export const FacilitySelector: React.FC<FacilitySelectorProps> = ({
  selectedFacility,
  onSelect
}) => {
  // const [facilities, setFacilities] = useState<Facility[]>([]);
  // const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   const fetchFacilities = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get('/api/facilities'); // Thay đổi URL API thực tế
  //       setFacilities(response.data);
  //     } catch (error) {
  //       console.error('Error fetching facilities:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFacilities();
  // }, []);

  const filteredFacilities = MOCK_FACILITIES.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Chọn cơ sở</h2>
      
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* {loading ? (
        <div className="text-center py-4">Đang tải...</div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredFacilities.map(facility => (
            <div
              key={facility.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedFacility === facility.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => onSelect(facility.id)}
            >
              <h3 className="font-semibold">{facility.name}</h3>
              <p className="text-sm text-gray-600">{facility.address}</p>
              <p className="text-sm text-gray-600">
                Giờ hoạt động: {facility.openTime} - {facility.closeTime}
              </p>
            </div>
          ))}
          
          {filteredFacilities.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              Không tìm thấy cơ sở phù hợp
            </div>
          )}
        </div>
      )} */}

      {/* Facilities List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map(facility => (
            <div
              key={facility.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedFacility === facility.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => onSelect(facility.id)}
            >
              <h3 className="font-semibold">{facility.name}</h3>
              <p className="text-sm text-gray-600">{facility.address}</p>
              <p className="text-sm text-gray-600">
                Giờ hoạt động: {facility.openTime} - {facility.closeTime}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            {searchTerm 
              ? 'Không tìm thấy cơ sở phù hợp' 
              : 'Chưa có cơ sở nào được thêm'}
          </div>
        )}
      </div>
    </div>
  );
};