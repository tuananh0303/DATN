// Các giá trị có thể có của trạng thái sự kiện
export type EventStatus = 'active' | 'upcoming' | 'expired';

// Các loại sự kiện
export type EventType = 'TOURNAMENT' | 'DISCOUNT';

// Các loại khuyến mãi
export type DiscountType = 'PERCENT' | 'AMOUNT' | 'FREE_SLOT';

// Các đối tượng áp dụng khuyến mãi
export type TargetUserType = 'ALL' | 'NEW' | 'VIP';

// Các sản phẩm áp dụng khuyến mãi
export type TargetProductType = 'ALL' | 'FIELD_FOOTBALL' | 'FIELD_BADMINTON' | 'FIELD_TENNIS' | 'FIELD_BASKETBALL';

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
  // Additional fields for display purposes
  facilityName?: string;
  facilityAddress?: string;
  sportName?: string;
}

// Interface cho giải thưởng trong các sự kiện giải đấu
export interface EventPrize {
  position: number;
  prize: string;
}

// Interface cho chi tiết sự kiện dựa trên loại
export interface EventDetail {
  id: number;
  eventType: EventType;
  facilityId: string;
  image: string;
  bannerImage?: string;
  // Tournament specific fields
  tournamentName?: string;
  sportTypes?: number[];
  targetSportId?: number; // For backward compatibility
  sportName?: string; // Name of the sport (derived from targetSportId)
  fields?: string[];
  venueDetails?: string;
  maxParticipants?: number;
  minParticipants?: number; // Minimum participants required
  currentParticipants?: number;
  registrationType?: 'individual' | 'team' | 'both';
  registrationEndDate?: string;
  registrationLink?: string; // Link to registration form
  registrationFee?: number; // Fee to participate in the tournament
  ageLimit?: string;
  tournamentFormat?: string[] | string;
  tournamentFormatDescription?: string;
  totalPrize?: string;
  prizeDescription?: string;
  prizes?: EventPrize[];
  currentStatus?: 'registration' | 'inProgress' | 'completed';
  rulesAndRegulations?: string;
  rules?: string; // For backward compatibility
  // Discount specific fields
  discountType?: DiscountType;
  discountPercent?: number;
  discountAmount?: number;
  freeSlots?: number;
  conditions?: string;
  minBookingValue?: number;
  discountCode?: string; // Discount code to apply
  targetUserType?: TargetUserType;
  targetProducts?: TargetProductType[];
  maxUsageCount?: number;
  // Special offer specific fields
  activities?: string[];
  specialServices?: string[];
  location?: string; // Location within the facility
  contact?: {
    name: string;
    email: string;
    phone: string;
  };
  isFreeRegistration?: boolean;
  paymentInstructions?: string;
  paymentMethod?: string[] | string;
  paymentDeadline?: string;
  paymentAccountInfo?: string;
  paymentQrImage?: string;
  registrationProcess?: string;
}

// Interface cho form tạo/chỉnh sửa sự kiện
export interface EventFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  facilityId?: string;
  eventType?: EventType;
  image?: string;
  bannerImage?: string;
  registrationLink?: string;
  location?: string;
  
  // Tournament specific fields
  tournamentName?: string;
  sportTypes?: number[];
  targetSportId?: number; // For backward compatibility
  fields?: string[];
  venueDetails?: string;
  maxParticipants?: number;
  minParticipants?: number;
  registrationType?: 'individual' | 'team' | 'both';
  registrationEndDate?: string;
  registrationFee?: number;
  ageLimit?: string;
  tournamentFormat?: string[] | string;
  tournamentFormatDescription?: string;
  totalPrize?: string;
  prizeDescription?: string;
  prizes?: EventPrize[];
  currentStatus?: 'registration' | 'inProgress' | 'completed';
  rulesAndRegulations?: string;
  rules?: string; // For backward compatibility
  
  // Discount specific fields
  discountType?: DiscountType;
  discountPercent?: number;
  discountAmount?: number;
  freeSlots?: number;
  conditions?: string;
  minBookingValue?: number;
  discountCode?: string;
  targetUserType?: TargetUserType;
  targetProducts?: TargetProductType[];
  maxUsageCount?: number;
  
  // Special offer specific fields
  activities?: string[];
  specialServices?: string[];
  contact?: {
    name: string;
    email: string;
    phone: string;
  };
  isFreeRegistration?: boolean;
  paymentInstructions?: string;
  paymentMethod?: string[] | string;
  paymentDeadline?: string;
  paymentAccountInfo?: string;
  paymentQrImage?: string;
  registrationProcess?: string;
}

// Interface cho trạng thái sự kiện trong store
export interface EventState {
  events: Event[];
  eventDetails: Record<number, EventDetail>;
  isLoading: boolean;
  error: string | null;
  selectedFacilityId: string | null;
}

// Interface mở rộng cho hiển thị Event trong danh sách
export interface DisplayEvent extends Event {
  facilityName: string;
  facilityAddress: string;
  sportName?: string;
  currentParticipants?: number;
  maxParticipants?: number;
  registrationEndDate?: string;
  discountPercent?: number;
  discountAmount?: number;
  freeSlots?: number;
  discountType?: string;
  activities?: string[];
  targetUserType?: string;
  minBookingValue?: number;
  maxUsageCount?: number;
  registrationFee?: number;
  isFreeRegistration?: boolean;
  tournamentFormat?: string[] | string;
  totalPrize?: string;
  fields?: string[];
  prizes?: EventPrize[];
}

