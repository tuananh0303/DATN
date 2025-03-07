import { FormData, SportType } from '../interfaces/facility';

export const SPORT_TYPES: SportType[] = [
  {
    id: 'badminton',
    name: 'Cầu lông',
    defaultPricing: 150000,
    surfaceTypes: ['Thảm cao su', 'Gỗ công nghiệp', 'Nhựa tổng hợp'],
    standardSizes: ['13.4m x 6.1m', '15m x 7m']
  },
  {
    id: 'football',
    name: 'Bóng đá',
    defaultPricing: 500000,
    surfaceTypes: ['Cỏ nhân tạo', 'Cỏ tự nhiên', 'Sân xi măng'],
    standardSizes: ['40m x 20m', '50m x 25m', '90m x 45m']
  },
  {
    id: 'basketball',
    name: 'Bóng rổ',
    defaultPricing: 300000,
    surfaceTypes: ['Nhựa tổng hợp', 'Gỗ công nghiệp', 'Bê tông'],
    standardSizes: ['28m x 15m', '30m x 18m']
  }
];

export const INITIAL_FORM_DATA: FormData = {
  facilityInfo: {
    name: '',
    description: '',
    openTime: '',
    closeTime: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    provinceCode: '',
    districtCode: '',
    wardCode: ''
  },
  images: {
    coverImage: null,
    additionalImages: []
  },
  fields: []
};
