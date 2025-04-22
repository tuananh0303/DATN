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

// /**
//  * Chuyển đổi dữ liệu từ EventFormData sang Event
//  * @param formData Dữ liệu từ form tạo/chỉnh sửa sự kiện
//  * @returns Đối tượng Event
//  */
// export function convertFormToEventData(formData: EventFormData): Event {
//   // Tạo đối tượng cơ bản từ các trường chung
//   const { name, description, startDate, endDate, eventType, facilityId } = formData;
  
//   // Khởi tạo đối tượng event với các trường cơ bản
//   const event: Event = {
//     name,
//     description,
//     startDate,
//     endDate,
//     eventType,
//     facilityId,
//     // Đặt image là một mảng rỗng làm placeholder
//     // Trong thực tế, file sẽ được upload và trả về URL từ server
//     image: []
//   };

//   // Thêm các thuộc tính dành riêng cho giải đấu nếu là type TOURNAMENT
//   if (formData.eventType === 'TOURNAMENT') {
//     const { 
//       sportIds, fieldIds, maxParticipants, minParticipants, registrationType,
//       registrationEndDate, registrationFee, ageLimit, tournamentFormat,
//       tournamentFormatDescription, totalPrize, prizeDescription, prizes,
//       rulesAndRegulations, isFreeRegistration, paymentInstructions, paymentMethod,
//       paymentDeadline, paymentAccountInfo, paymentQrImage, registrationProcess
//     } = formData;

//     if (sportIds) event.sportIds = sportIds;
//     if (fieldIds) event.fieldIds = fieldIds;
//     if (maxParticipants) event.maxParticipants = maxParticipants;
//     if (minParticipants) event.minParticipants = minParticipants;
//     if (registrationType) event.registrationType = registrationType;
//     if (registrationEndDate) event.registrationEndDate = registrationEndDate;
//     if (registrationFee !== undefined) event.registrationFee = registrationFee;
//     if (ageLimit) event.ageLimit = ageLimit;
//     if (tournamentFormat) event.tournamentFormat = tournamentFormat;
//     if (tournamentFormatDescription) event.tournamentFormatDescription = tournamentFormatDescription;
//     if (totalPrize) event.totalPrize = totalPrize;
//     if (prizeDescription) event.prizeDescription = prizeDescription;
//     if (prizes) event.prizes = prizes;
//     if (rulesAndRegulations) event.rulesAndRegulations = rulesAndRegulations;
//     if (isFreeRegistration !== undefined) event.isFreeRegistration = isFreeRegistration;
//     if (paymentInstructions) event.paymentInstructions = paymentInstructions;
//     if (paymentMethod) event.paymentMethod = paymentMethod;
//     if (paymentDeadline) event.paymentDeadline = paymentDeadline;
//     if (paymentAccountInfo) event.paymentAccountInfo = paymentAccountInfo;
//     if (paymentQrImage) event.paymentQrImage = paymentQrImage;
//     if (registrationProcess) event.registrationProcess = registrationProcess;
//   }

//   // Thêm các thuộc tính dành riêng cho khuyến mãi nếu là type DISCOUNT
//   if (formData.eventType === 'DISCOUNT') {
//     const {
//       discountType, discountPercent, discountAmount, freeSlots,
//       minBookingValue, targetUserType, maxUsageCount, descriptionOfDiscount
//     } = formData;

//     if (discountType) event.discountType = discountType;
//     if (discountPercent !== undefined) event.discountPercent = discountPercent;
//     if (discountAmount !== undefined) event.discountAmount = discountAmount;
//     if (freeSlots !== undefined) event.freeSlots = freeSlots;
//     if (minBookingValue !== undefined) event.minBookingValue = minBookingValue;
//     if (targetUserType) event.targetUserType = targetUserType;
//     if (maxUsageCount !== undefined) event.maxUsageCount = maxUsageCount;
//     if (descriptionOfDiscount) event.descriptionOfDiscount = descriptionOfDiscount;
//   }

//   return event;
// }

// /**
//  * Chuyển đổi dữ liệu từ Event sang EventFormData
//  * @param event Đối tượng Event lấy từ API
//  * @returns Đối tượng EventFormData để hiển thị trên form
//  */
// export function convertEventToFormData(event: Event): Omit<EventFormData, 'imageFiles'> & { imageFiles?: File[] } {
//   // Tạo đối tượng cơ bản từ các trường chung
//   const { name, description, startDate, endDate, eventType, facilityId } = event;
  
//   // Khởi tạo đối tượng formData với các trường cơ bản
//   const formData: Omit<EventFormData, 'imageFiles'> & { imageFiles?: File[] } = {
//     name,
//     description,
//     startDate,
//     endDate,
//     eventType,
//     facilityId,
//   };

//   // Thêm các thuộc tính dành riêng cho giải đấu nếu là type TOURNAMENT
//   if (event.eventType === 'TOURNAMENT') {
//     const {
//       sportIds, fieldIds, maxParticipants, minParticipants, registrationType,
//       registrationEndDate, registrationFee, ageLimit, tournamentFormat,
//       tournamentFormatDescription, totalPrize, prizeDescription, prizes,
//       rulesAndRegulations, isFreeRegistration, paymentInstructions, paymentMethod,
//       paymentDeadline, paymentAccountInfo, paymentQrImage, registrationProcess
//     } = event;

//     if (sportIds) formData.sportIds = sportIds;
//     if (fieldIds) formData.fieldIds = fieldIds;
//     if (maxParticipants) formData.maxParticipants = maxParticipants;
//     if (minParticipants) formData.minParticipants = minParticipants;
//     if (registrationType) formData.registrationType = registrationType;
//     if (registrationEndDate) formData.registrationEndDate = registrationEndDate;
//     if (registrationFee !== undefined) formData.registrationFee = registrationFee;
//     if (ageLimit) formData.ageLimit = ageLimit;
//     if (tournamentFormat) formData.tournamentFormat = tournamentFormat;
//     if (tournamentFormatDescription) formData.tournamentFormatDescription = tournamentFormatDescription;
//     if (totalPrize) formData.totalPrize = totalPrize;
//     if (prizeDescription) formData.prizeDescription = prizeDescription;
//     if (prizes) formData.prizes = prizes;
//     if (rulesAndRegulations) formData.rulesAndRegulations = rulesAndRegulations;
//     if (isFreeRegistration !== undefined) formData.isFreeRegistration = isFreeRegistration;
//     if (paymentInstructions) formData.paymentInstructions = paymentInstructions;
//     if (paymentMethod) formData.paymentMethod = paymentMethod;
//     if (paymentDeadline) formData.paymentDeadline = paymentDeadline;
//     if (paymentAccountInfo) formData.paymentAccountInfo = paymentAccountInfo;
//     if (paymentQrImage) formData.paymentQrImage = paymentQrImage;
//     if (registrationProcess) formData.registrationProcess = registrationProcess;
//   }

//   // Thêm các thuộc tính dành riêng cho khuyến mãi nếu là type DISCOUNT
//   if (event.eventType === 'DISCOUNT') {
//     const {
//       discountType, discountPercent, discountAmount, freeSlots,
//       minBookingValue, targetUserType, maxUsageCount, descriptionOfDiscount
//     } = event;

//     if (discountType) formData.discountType = discountType;
//     if (discountPercent !== undefined) formData.discountPercent = discountPercent;
//     if (discountAmount !== undefined) formData.discountAmount = discountAmount;
//     if (freeSlots !== undefined) formData.freeSlots = freeSlots;
//     if (minBookingValue !== undefined) formData.minBookingValue = minBookingValue;
//     if (targetUserType) formData.targetUserType = targetUserType;
//     if (maxUsageCount !== undefined) formData.maxUsageCount = maxUsageCount;
//     if (descriptionOfDiscount) formData.descriptionOfDiscount = descriptionOfDiscount;
//   }

//   return formData;
// }

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

