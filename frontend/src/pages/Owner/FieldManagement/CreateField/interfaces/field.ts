// Định nghĩa các interface cần thiết cho việc tạo sân
export interface Facility {
    id: string;
    name: string;
    address: string;
    openTime: string;
    closeTime: string;
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
    priceIncrease: number;
  }
  
  export interface Court {
    id: string;
    sportTypeIds: string[];
    name: string;
    quantity: number;
    size: string;
    surface: string;
    basePrice: number;
    peakHourPricing: PeakHourPricing;
    status: 'active' | 'maintenance' | 'inactive';
  }
  
  export interface CourtGroup {
    id: string;
    facilityId: string;
    sportTypeIds: string[];
    name: string;
    courts: Court[];
    isMultiSport: boolean;
  }
  
  export interface CreateFieldFormData {
    facilityId: string;
    courtGroups: CourtGroup[];
  }