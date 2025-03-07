export interface FacilityFormData {
  name: string;
  description: string;
  openTime: string;
  closeTime: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
}

export interface ImageUploadData {
  coverImage: File | null;
  additionalImages: File[];
}

export interface FieldManagementData {
  id: string;
  name: string;
  sportTypes: string[];  // Có thể là nhiều loại cho sân tổng hợp
  groupName?: string;    // Tên nhóm sân mà field này thuộc về
  basePrice: number;
  peakHourPrice?: number;
  size: string;
  surface: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface Province {
  code: string;
  name: string;
  districts: District[];
}

export interface District {
  code: string;
  name: string;
  wards: Ward[];
}

export interface Ward {
  code: string;
  name: string;
}

export interface SportType {
  id: string;
  name: string;
  defaultPricing?: number;
  surfaceTypes: string[];
  standardSizes: string[];
}

export interface PeakHourPricing {
  startTime: string;
  endTime: string;
  priceIncrease: number; // Số tiền tăng thêm so với giá mặc định
}

export interface Court {
  id: string;
  sportTypeIds: string[]; // Thay đổi thành mảng để hỗ trợ sân tổng hợp
  name: string;
  quantity: number;
  size: string;
  surface: string;
  basePrice: number; // Đổi tên từ price thành basePrice
  peakHourPricing: PeakHourPricing[];
  status: 'active' | 'maintenance' | 'inactive';
}

export interface CourtGroup {
  id: string;
  sportTypeIds: string[]; // Thay đổi thành mảng
  name: string; // Tên nhóm sân (ví dụ: "Sân tổng hợp 1")
  courts: Court[];
  isMultiSport: boolean; // Flag để đánh dấu sân tổng hợp
}

export interface FormData {
  facilityInfo: FacilityFormData;
  images?: ImageUploadData;
  fields?: FieldManagementData[];
}
