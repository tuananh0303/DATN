// constants/mockData.ts
import { Facility, CourtGroup } from '../interfaces/fields';

export const MOCK_FACILITIES: Facility[] = [
  { id: 'facility-1', name: 'Sân Thể Thao ABC' },
  { id: 'facility-2', name: 'Trung Tâm Thể Thao XYZ' }
];

export const MOCK_COURT_GROUPS: CourtGroup[] = [
  {
    id: 'group-1',
    facilityId: 'facility-1',
    sportTypeId: 'badminton',
    sportTypeName: 'Cầu lông',
    size: '13.4m x 6.1m',
    surface: 'Thảm cao su',
    basePrice: 150000,
    peakHourPricing: [
      { startTime: '17:00', endTime: '22:00', priceIncrease: 50000 }
    ],
    courts: [
      { id: 'court-1', name: 'Sân 01', status: 'active' },
      { id: 'court-2', name: 'Sân 02', status: 'active' },
      { id: 'court-3', name: 'Sân 03', status: 'maintenance' }
    ]
  },
  {
    id: 'group-2',
    facilityId: 'facility-1',
    sportTypeId: 'badminton',
    sportTypeName: 'Cầu lông',
    size: '15m x 7m',
    surface: 'Thảm cao su',
    basePrice: 180000,
    peakHourPricing: [
      { startTime: '17:00', endTime: '22:00', priceIncrease: 50000 }
    ],
    courts: [
      { id: 'court-4', name: 'Sân 04', status: 'active' },
      { id: 'court-5', name: 'Sân 05', status: 'active' }
    ]
  }
];