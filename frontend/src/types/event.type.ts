// Các giá trị có thể có của trạng thái sự kiện
export type EventStatus = 'active' | 'upcoming' | 'expired';

// Các loại sự kiện
export type EventType = 'TOURNAMENT' | 'DISCOUNT';

// Interface chính cho sự kiện
export interface Event {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  facilityId?: string;
  eventType?: EventType;
  image?: string;
  bannerImage?: string; // Banner image for event details
  registrationLink?: string; // Link for registration form
  minParticipants?: number; // Minimum participants required for event to be valid
  location?: string; // Specific location within the facility
  organizer?: {
    id: string;
    name: string;
    logo: string;
    contact?: string;
  };
  // Fields that will be merged from EventDetail when displaying full event info
}

// Interface cho giải thưởng trong các sự kiện giải đấu
export interface EventPrize {
  position: number;
  prize: string;
}

// Interface cho chi tiết sự kiện dựa trên loại
export interface EventDetail {
  eventType: EventType;
  facilityId: string;
  image: string;
  bannerImage?: string;
  // Tournament specific fields
  targetSportId?: number;
  sportName?: string; // Name of the sport (derived from targetSportId)
  fields?: string[];
  maxParticipants?: number;
  minParticipants?: number; // Minimum participants required
  currentParticipants?: number;
  registrationEndDate?: string;
  registrationLink?: string; // Link to registration form
  registrationFee?: number; // Fee to participate in the tournament
  tournamentFormat?: string; // Format of the tournament (knockout, league, etc.)
  prizes?: EventPrize[];
  rules?: string; // Tournament rules
  // Discount specific fields
  discountPercent?: number;
  conditions?: string;
  minBookingValue?: number;
  discountCode?: string; // Discount code to apply
  // Special offer specific fields
  activities?: string[];
  specialServices?: string[];
  location?: string; // Location within the facility
  contact?: {
    name: string;
    email: string;
    phone: string;
  };
}

// Interface cho form tạo/chỉnh sửa sự kiện
export interface EventFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  facilityId?: string;
  eventType?: EventType;
  image?: string;
  bannerImage?: string;
  registrationLink?: string;
  location?: string;
  
  // Tournament specific fields
  targetSportId?: number;
  fields?: string[];
  maxParticipants?: number;
  minParticipants?: number;
  registrationEndDate?: string;
  registrationFee?: number;
  tournamentFormat?: string;
  prizes?: EventPrize[];
  rules?: string;
  
  // Discount specific fields
  discountPercent?: number;
  conditions?: string;
  minBookingValue?: number;
  discountCode?: string;
  
  // Special offer specific fields
  activities?: string[];
  specialServices?: string[];
  contact?: {
    name: string;
    email: string;
    phone: string;
  };
}

// Interface cho bộ lọc sự kiện
export interface EventFilter {
  facilityId?: string;
  status?: EventStatus;
  eventType?: EventType;
  sportId?: number;
  searchTerm?: string;
}

// Interface cho trạng thái sự kiện trong store
export interface EventState {
  events: Event[];
  eventDetails: Record<number, EventDetail>;
  isLoading: boolean;
  error: string | null;
  selectedFacilityId: string | null;
}

// Interface cho response từ API lấy danh sách sự kiện
export interface EventsResponse {
  success: boolean;
  data: {
    events: Event[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    }
  }
}

// Interface cho response từ API lấy chi tiết sự kiện
export interface EventDetailResponse {
  success: boolean;
  data: Event & EventDetail;
}

// Full Event interface representing combined event and details for display
export interface FullEvent {
  // Event base fields
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  // Shared fields (from EventDetail)
  eventType: EventType;
  facilityId: string;
  image: string;
  bannerImage?: string;
  registrationLink?: string;
  location?: string;
  // Tournament specific fields
  targetSportId?: number;
  sportName?: string;
  fields?: string[];
  maxParticipants?: number;
  minParticipants?: number;
  currentParticipants?: number;
  registrationEndDate?: string;
  registrationFee?: number;
  tournamentFormat?: string;
  prizes?: EventPrize[];
  rules?: string;
  // Discount specific fields
  discountPercent?: number;
  conditions?: string;
  minBookingValue?: number;
  discountCode?: string;
  // Special offer specific fields
  activities?: string[];
  specialServices?: string[];
  contact?: {
    name: string;
    email: string;
    phone: string;
  };
  organizer?: {
    id: string;
    name: string;
    logo: string;
    contact?: string;
  };
}