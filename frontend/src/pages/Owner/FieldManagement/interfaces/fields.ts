// interfaces/field.ts
export interface Facility {
    id: string;
    name: string;
  }
  
  export interface PeakHourPricing {
    startTime: string;
    endTime: string;
    priceIncrease: number;
  }
  
  export interface Court {
    id: string;
    name: string;
    status: 'active' | 'maintenance' | 'inactive';
  }
  
  export interface CourtGroup {
    id: string;
    facilityId: string;
    sportTypeId: string;
    sportTypeName: string;
    size: string;
    surface: string;
    basePrice: number;
    peakHourPricing: PeakHourPricing;
    courts: Court[];
  }