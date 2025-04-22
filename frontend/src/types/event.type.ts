// Các giá trị có thể có của trạng thái sự kiện
export type EventStatus = 'active' | 'upcoming' | 'expired';

// Các loại sự kiện
export type EventType = 'TOURNAMENT' | 'DISCOUNT';

// Các loại khuyến mãi
export type DiscountType = 'PERCENT' | 'AMOUNT' | 'FREE_SLOT';

// Các đối tượng áp dụng khuyến mãi
export type TargetUserType = 'ALL' | 'NEW' | 'LOYALTY' | 'CASUAL';

// Trạng thái đăng ký giải đấu
export type RegistrationStatus = 'registration' | 'inProgress' | 'completed';

// Loại đăng ký giải đấu
export type RegistrationType = 'individual' | 'team' | 'both';

// Interface cho giải thưởng trong các sự kiện giải đấu
export interface EventPrize {
  position: number;
  prize: string;
}

// Interface cho nhà tổ chức sự kiện
export interface Organizer {
  id: string;
  name: string;
  logo: string;
}

// Interface cho thông tin liên hệ
export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

// Interface cho sự kiện - bao gồm tất cả các thuộc tính có thể có
export interface Event {
  // Thuộc tính cơ bản
  id?: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status?: EventStatus;
  eventType: EventType;
  facilityId: string;
  image: string[]; // URL của ảnh
  bannerImage?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
  organizer?: Organizer;
  facilityName?: string;
  facilityAddress?: string;
  sportName?: string;

  // Thuộc tính cho giải đấu
  sportIds?: number[];  
  fieldIds?: number[];  
  maxParticipants?: number;
  minParticipants?: number;
  currentParticipants?: number;
  registrationType?: RegistrationType;
  registrationEndDate?: string; 
  registrationFee?: number;
  ageLimit?: string;
  tournamentFormat?: string[] | string;
  tournamentFormatDescription?: string;
  totalPrize?: string;
  prizeDescription?: string;
  prizes?: EventPrize[];
  currentStatus?: RegistrationStatus;
  rulesAndRegulations?: string;
  isFreeRegistration?: boolean;
  paymentInstructions?: string;
  paymentMethod?: string[] | string;
  paymentDeadline?: string;
  paymentAccountInfo?: string;
  paymentQrImage?: string;
  registrationProcess?: string;

  // Thuộc tính cho khuyến mãi
  discountType?: DiscountType;
  discountPercent?: number;
  discountAmount?: number;
  freeSlots?: number;
  minBookingValue?: number;
  targetUserType?: TargetUserType;
  maxUsageCount?: number;
  descriptionOfDiscount?: string;
  contact?: ContactInfo;
}

// Type guard để kiểm tra nếu một sự kiện là giải đấu
export function isTournamentEvent(event: Event): event is Event & { eventType: 'TOURNAMENT' } {
  return event.eventType === 'TOURNAMENT';
}

// Type guard để kiểm tra nếu một sự kiện là khuyến mãi
export function isDiscountEvent(event: Event): event is Event & { eventType: 'DISCOUNT' } {
  return event.eventType === 'DISCOUNT';
}

// Interface cho form tạo/chỉnh sửa sự kiện - thiết kế riêng cho form
export interface EventFormData {
  // Thuộc tính cơ bản
  name: string;
  description: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  eventType: EventType;
  facilityId: string;
  
  // Ảnh và file
  imageFiles: File[]; // File ảnh để upload
  
  // Thuộc tính cho giải đấu
  sportIds?: number[];  
  fieldIds?: number[];  
  maxParticipants?: number;
  minParticipants?: number;
  registrationType?: RegistrationType;
  registrationEndDate?: string; 
  registrationFee?: number;
  ageLimit?: string;
  tournamentFormat?: string[] | string;
  tournamentFormatDescription?: string;
  totalPrize?: string;
  prizeDescription?: string;
  prizes?: EventPrize[];
  rulesAndRegulations?: string;
  isFreeRegistration?: boolean;
  paymentInstructions?: string;
  paymentMethod?: string[] | string;
  paymentDeadline?: string;
  paymentAccountInfo?: string;
  paymentQrImage?: string;
  registrationProcess?: string;

  // Thuộc tính cho khuyến mãi
  discountType?: DiscountType;
  discountPercent?: number;
  discountAmount?: number;
  freeSlots?: number;
  minBookingValue?: number;
  targetUserType?: TargetUserType;
  maxUsageCount?: number;
  descriptionOfDiscount?: string;
}


// Interface cho trạng thái sự kiện trong store
export interface EventState {
  events: Event[];
  eventDetails: Record<number, Event>;
  isLoading: boolean;
  error: string | null;
  selectedFacilityId: string | null;
}

// Interface mở rộng cho hiển thị Event trong danh sách
export interface DisplayEvent extends Omit<Event, 'discountType' | 'targetUserType'> {
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
  targetUserType?: string;
  minBookingValue?: number;
  maxUsageCount?: number;
  registrationFee?: number;
  isFreeRegistration?: boolean;
  tournamentFormat?: string[] | string;
  totalPrize?: string;
  sportIds?: number[];
  fieldIds?: number[];
  descriptionOfDiscount?: string;
  prizes?: EventPrize[];
}

// Trạng thái phê duyệt đăng ký
export type RegistrationApprovalStatus = 'pending' | 'approved' | 'rejected';

// Trạng thái thanh toán
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

// Interface cho đăng ký tham gia sự kiện
export interface EventRegistration {
  id: string;
  eventId: number;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  registrationDate: string;
  status: RegistrationApprovalStatus;
  paymentStatus?: PaymentStatus;
  paymentProof?: string; // URL của ảnh chứng từ thanh toán
  paymentMethod?: string;
  paymentDate?: string;
  approvedBy?: string; // ID của admin/owner phê duyệt
  approvedDate?: string;
  rejectionReason?: string;
  teamName?: string; // Tên đội (cho đăng ký theo đội)
  teamMembers?: Array<{name: string; email?: string; phone?: string}>; // Thành viên đội
  notes?: string; // Ghi chú đăng ký
}

