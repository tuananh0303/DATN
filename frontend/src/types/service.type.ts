import { Sport } from "./sport.type";

// Type aliases để sử dụng ở nhiều nơi
export type ServiceStatus = 'available' | 'low_stock' | 'out_of_stock' | 'discontinued';
export type ServiceType = 'rental' | 'coaching' | 'equipment' | 'food' | 'other';

export interface Service {
    id: number;
    name: string;
    price: number;
    description: string;
    amount: number;
    sport: Sport;
    status: ServiceStatus;
    unit: string;
    serviceType: ServiceType;
    inUseCount?: number;
    bookedCount?: number;
    lastUpdated?: Date;
    popularityScore?: number;
  }
  
  export interface ServiceFormData {
    name: string;
    price: number;
    description: string;
    amount: number;
    sportId: number;
    unit: string;
    serviceType: ServiceType;
    status: ServiceStatus;
  }
  
  // Interface để định nghĩa kiểu dữ liệu cho giá trị form cập nhật
  export interface UpdatedServiceValues {
    name: string;
    description: string;
    price: number;
    amount: number;
    sportId: number;
    serviceType: ServiceType;
    status: ServiceStatus;
    unit: string;
  }
  
  export interface ServiceState {
    services: Service[];
    isLoading: boolean;
    error: string | null;
    selectedFacilityId: string | null;
  }

//   export interface BookingService {
//     id: number;
//     bookingId: number;
//     serviceId: number;
//     quantity: number;
//     startTime?: Date;
//     endTime?: Date;
//     status: 'pending' | 'active' | 'completed' | 'cancelled';
//     notes?: string;
//   }