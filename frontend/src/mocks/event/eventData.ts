import { Event, EventDetail } from '@/types/event.type';

// Mock sports data that will be used in events
export const mockSports = [
  { id: 1, name: 'Bóng đá' },
  { id: 2, name: 'Bóng rổ' },
  { id: 3, name: 'Tennis' },
  { id: 4, name: 'Cầu lông' }
];

// Mock data for events
export const mockEvents: Event[] = [
  {
    id: 1,
    name: 'Giải đấu Tennis mùa hè',
    description: 'Giải đấu tennis dành cho tất cả khách hàng với nhiều phần quà hấp dẫn. Hãy tham gia để trải nghiệm không khí sôi động của các trận đấu gay cấn và cơ hội nhận giải thưởng hấp dẫn!',
    startDate: '2025-07-15T08:00:00Z',
    endDate: '2025-07-20T18:00:00Z',
    status: 'upcoming',
    createdAt: '2024-06-20T10:15:00Z',
    updatedAt: '2024-06-20T10:15:00Z',
    facilityId: '2',
    eventType: 'TOURNAMENT',
    image: 'https://via.placeholder.com/600x400?text=Tennis+Tournament',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Tennis+Tournament+Banner',
    registrationLink: 'https://forms.example.com/tennis-tournament',
    minParticipants: 16,
    location: 'Sân chính - Khu Tennis Bình Chánh'
  },
  {
    id: 2,
    name: 'Khuyến mãi đặt sân sớm',
    description: 'Giảm 20% cho tất cả các đơn đặt sân trước 7 ngày. Chương trình áp dụng cho tất cả các loại sân và khung giờ trong ngày.',
    startDate: '2025-06-01T00:00:00Z',
    endDate: '2025-06-30T23:59:59Z',
    status: 'active',
    createdAt: '2024-05-25T14:30:00Z',
    updatedAt: '2024-05-25T14:30:00Z',
    facilityId: '1',
    eventType: 'DISCOUNT',
    image: 'https://via.placeholder.com/600x400?text=Early+Booking+Discount',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Early+Booking+Discount+Banner'
  },
  {
    id: 3,
    name: 'Cúp Bóng đá Phạm Kha',
    description: 'Giải đấu bóng đá 5v5 dành cho các đội chơi tại sân Phạm Kha. Tham gia để giao lưu và cơ hội giành giải thưởng lớn!',
    startDate: '2025-05-10T09:00:00Z',
    endDate: '2025-05-12T18:00:00Z',
    status: 'expired',
    createdAt: '2024-04-15T11:20:00Z',
    updatedAt: '2024-04-15T11:20:00Z',
    facilityId: '1',
    eventType: 'TOURNAMENT',
    image: 'https://via.placeholder.com/600x400?text=Football+Cup',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Football+Cup+Banner',
    location: 'Sân bóng đá Phạm Kha - Khu A'
  },
  {
    id: 4,
    name: 'Ngày hội thể thao gia đình',
    description: 'Chương trình dành cho các gia đình với nhiều hoạt động thể thao và giải trí. Tham gia để có cơ hội gắn kết gia đình và nhận nhiều quà tặng hấp dẫn.',
    startDate: '2025-07-25T08:00:00Z',
    endDate: '2025-07-25T20:00:00Z',
    status: 'upcoming',
    createdAt: '2024-06-18T09:45:00Z',
    updatedAt: '2024-06-18T09:45:00Z',
    facilityId: '2',
    eventType: 'TOURNAMENT',
    image: 'https://via.placeholder.com/600x400?text=Family+Sports+Day',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Family+Sports+Day+Banner',
    registrationLink: 'https://forms.example.com/family-sports-day',
    location: 'Khu phức hợp thể thao Bình Chánh'
  },
  {
    id: 5,
    name: 'Bạn mới - Ưu đãi lớn',
    description: 'Giảm 30% cho khách hàng đặt sân lần đầu. Áp dụng cho tất cả các loại sân, không giới hạn số lần đặt trong thời gian diễn ra chương trình.',
    startDate: '2025-06-15T00:00:00Z',
    endDate: '2025-08-15T23:59:59Z',
    status: 'active',
    createdAt: '2024-06-10T15:40:00Z',
    updatedAt: '2024-06-10T15:40:00Z',
    facilityId: '3',
    eventType: 'DISCOUNT',
    image: 'https://via.placeholder.com/600x400?text=New+Customer+Discount',
    bannerImage: 'https://via.placeholder.com/1200x400?text=New+Customer+Discount+Banner'
  },
  {
    id: 6,
    name: 'Giải đấu Cầu lông Phạm Kha',
    description: 'Giải đấu cầu lông dành cho mọi lứa tuổi với nhiều hạng mục thi đấu. Hãy tham gia để thử sức và giao lưu cùng cộng đồng yêu thích cầu lông.',
    startDate: '2024-06-05T09:00:00Z',
    endDate: '2024-06-07T18:00:00Z',
    status: 'expired',
    createdAt: '2024-05-20T13:25:00Z',
    updatedAt: '2024-05-20T13:25:00Z',
    facilityId: '4',
    eventType: 'TOURNAMENT',
    image: 'https://via.placeholder.com/600x400?text=Badminton+Tournament',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Badminton+Tournament+Banner',
    location: 'Nhà thi đấu cầu lông Phạm Kha'
  },
  {
    id: 7,
    name: 'Flash Sale Trưa Nóng',
    description: 'Giảm ngay 50.000đ cho mỗi đơn đặt sân trong khung giờ 11h-14h. Áp dụng cho tất cả các loại sân.',
    startDate: '2024-06-15T00:00:00Z',
    endDate: '2024-07-15T23:59:59Z',
    status: 'active',
    createdAt: '2024-06-10T09:30:00Z',
    updatedAt: '2024-06-10T09:30:00Z',
    facilityId: '2',
    eventType: 'DISCOUNT',
    image: 'https://via.placeholder.com/600x400?text=Flash+Sale+Noon',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Flash+Sale+Noon+Banner'
  },
  {
    id: 8,
    name: 'Ưu đãi VIP - Tặng lượt đặt',
    description: 'Tặng 2 lượt đặt sân miễn phí cho khách hàng VIP khi đặt sân 5 lần trong tháng.',
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-07-31T23:59:59Z',
    status: 'active',
    createdAt: '2024-05-20T11:15:00Z',
    updatedAt: '2024-05-20T11:15:00Z',
    facilityId: '1',
    eventType: 'DISCOUNT',
    image: 'https://via.placeholder.com/600x400?text=VIP+Free+Slots',
    bannerImage: 'https://via.placeholder.com/1200x400?text=VIP+Free+Slots+Banner'
  }
];

// Mock event types
export const mockEventTypes = [
  { id: 'DISCOUNT', name: 'Khuyến mãi' },
  { id: 'TOURNAMENT', name: 'Giải đấu' }
];

// Mock additional event data for expanded event model
export const mockEventDetails: EventDetail[] = [
   {
    id: 1,
    eventType: 'TOURNAMENT',
    facilityId: '2',
    tournamentName: 'Giải Tennis Mở Rộng Hè 2025',
    sportTypes: [3], // Tennis
    targetSportId: 3, // For backward compatibility
    image: 'https://via.placeholder.com/600x400?text=Tennis+Tournament',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Tennis+Tournament+Banner',
    fields: ['Sân 1', 'Sân 2', 'Sân 3'],
    venueDetails: 'Khu Tennis Bình Chánh',
    maxParticipants: 32,
    minParticipants: 16,
    currentParticipants: 24,
    registrationType: 'individual',
    registrationEndDate: '2025-07-10T23:59:59Z',
    registrationLink: 'https://forms.example.com/tennis-tournament',
    registrationFee: 500000,
    isFreeRegistration: false,
    paymentInstructions: 'Thanh toán phí tham gia trước ngày 10/07/2025. Gửi bằng chứng thanh toán qua Zalo/Email của BTC.',
    paymentMethod: ['bank', 'momo'],
    paymentDeadline: '2025-07-10T23:59:59Z',
    paymentAccountInfo: 'Ngân hàng Vietcombank | STK: 1234567890 | Chủ TK: Nguyễn Văn A | Nội dung CK: Tennis2025-TenNguoiChoi',
    paymentQrImage: 'https://via.placeholder.com/300x300?text=QR+Payment',
    registrationProcess: '1. Đăng ký và nhận email xác nhận\n2. Thanh toán phí tham gia\n3. Gửi bằng chứng thanh toán cho BTC\n4. BTC xác nhận và phê duyệt đăng ký',
    ageLimit: 'U18, hoặc chỉ cho người chơi có > 10 lượt đặt sân',
    tournamentFormat: ['knockout', 'roundRobin'],
    tournamentFormatDescription: 'Chia làm 4 bảng đấu, mỗi bảng 8 người. Vòng bảng thi đấu vòng tròn, chọn 2 người đứng đầu mỗi bảng vào vòng loại trực tiếp.',
    totalPrize: '10.000.000 VNĐ + Cup vô địch',
    prizeDescription: 'Tổng giải thưởng 10 triệu đồng tiền mặt, cup vô địch và các phần quà từ nhà tài trợ. Lễ trao giải sẽ diễn ra ngay sau trận chung kết.',
    prizes: [
      { position: 1, prize: 'Cup + 5.000.000 VNĐ' },
      { position: 2, prize: '3.000.000 VNĐ' },
      { position: 3, prize: '1.000.000 VNĐ' }
    ],
    rulesAndRegulations: 'Luật thi đấu áp dụng theo tiêu chuẩn quốc tế. Mỗi trận đấu gồm 3 set, mỗi set 6 game. Người chơi tự mang vợt, ban tổ chức cung cấp bóng thi đấu.',
    currentStatus: 'registration',
    location: 'Sân chính - Khu Tennis Bình Chánh',
    contact: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0901234567'
    }
  },
  {
    id: 2,
    eventType: 'DISCOUNT',
    facilityId: '1',
    discountType: 'PERCENT',
    discountPercent: 20,
    image: 'https://via.placeholder.com/600x400?text=Early+Booking+Discount',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Early+Booking+Discount+Banner',
    conditions: 'Áp dụng cho đặt sân trước 7 ngày. Không áp dụng đồng thời với các chương trình khuyến mãi khác.',
    minBookingValue: 0,
    discountCode: 'EARLY20',
    targetUserType: 'ALL',
    targetProducts: ['ALL'],
    maxUsageCount: 0, // Không giới hạn
    contact: {
      name: 'Lê Thị B',
      email: 'lethib@example.com',
      phone: '0912345678'
    }
  },
  {
    id: 3,
    eventType: 'TOURNAMENT',
    facilityId: '1',
    tournamentName: 'Cúp Bóng đá Phạm Kha',
    sportTypes: [1], // Bóng đá
    targetSportId: 1, // For backward compatibility
    image: 'https://via.placeholder.com/600x400?text=Football+Cup',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Football+Cup+Banner',
    fields: ['Sân A1', 'Sân A2'],
    venueDetails: 'Sân bóng đá Phạm Kha - Khu A',
    maxParticipants: 16,
    minParticipants: 8,
    currentParticipants: 16,
    registrationType: 'team',
    registrationEndDate: '2025-05-05T23:59:59Z',
    registrationFee: 1000000,
    isFreeRegistration: false,
    paymentInstructions: 'Mỗi đội đóng 1.000.000đ phí tham gia. Thanh toán trước khi bốc thăm chia bảng.',
    paymentMethod: ['bank', 'cash'],
    paymentDeadline: '2025-05-01T23:59:59Z',
    paymentAccountInfo: 'Ngân hàng Techcombank | STK: 9876543210 | Chủ TK: Trần Văn B | Nội dung CK: CupPK-TenDoi',
    registrationProcess: '1. Đội trưởng đăng ký thông tin đội\n2. Nộp danh sách cầu thủ và thanh toán phí tham gia\n3. BTC xác nhận và phê duyệt đăng ký\n4. Tham gia lễ bốc thăm chia bảng',
    ageLimit: '18+',
    tournamentFormat: ['hybrid'],
    tournamentFormatDescription: '4 bảng, mỗi bảng 4 đội. Mỗi đội đấu với tất cả các đội trong bảng. Chọn đội đứng đầu mỗi bảng vào bán kết.',
    totalPrize: '6.000.000 VNĐ + Cup vô địch + Huy chương',
    prizeDescription: 'Đội vô địch nhận cup, huy chương vàng và 3 triệu đồng. Đội á quân nhận huy chương bạc và 2 triệu đồng. Đội hạng 3 nhận huy chương đồng và 1 triệu đồng.',
    prizes: [
      { position: 1, prize: 'Cup + 3.000.000 VNĐ' },
      { position: 2, prize: '2.000.000 VNĐ' },
      { position: 3, prize: '1.000.000 VNĐ' }
    ],
    rulesAndRegulations: 'Mỗi đội tối đa 8 người, mỗi trận đấu 5v5. Thời gian mỗi trận là 30 phút, chia làm 2 hiệp. Luật bóng đá 5 người được áp dụng.',
    currentStatus: 'completed',
    location: 'Sân bóng đá Phạm Kha - Khu A',
    contact: {
      name: 'Trần Văn B',
      email: 'tranvanb@example.com',
      phone: '0912345678'
    }
  },
  {
    id: 4,
    eventType: 'TOURNAMENT',
    facilityId: '2',
    image: 'https://via.placeholder.com/600x400?text=Family+Sports+Day',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Family+Sports+Day+Banner',
    activities: ['Tennis', 'Bóng đá', 'Bóng rổ', 'Cầu lông'],
    specialServices: ['Đồ ăn miễn phí', 'Huấn luyện viên hướng dẫn', 'Trò chơi cho trẻ em', 'Quà tặng cho gia đình tham gia'],
    location: 'Khu phức hợp thể thao Bình Chánh',
    registrationLink: 'https://forms.example.com/family-sports-day',
    isFreeRegistration: true,
    maxParticipants: 100,
    currentParticipants: 45,
    registrationEndDate: '2025-07-20T23:59:59Z',
    registrationProcess: 'Đăng ký trực tuyến qua form đính kèm. Mỗi gia đình điền đầy đủ thông tin các thành viên tham gia.',
    tournamentFormat: ['other'],
    tournamentFormatDescription: 'Các hoạt động thi đấu giao lưu không chuyên, dành cho gia đình có trẻ em. Không áp dụng luật thi đấu chuyên nghiệp.',
    contact: {
      name: 'Lê Thị C',
      email: 'lethic@example.com',
      phone: '0987654321'
    }
  },
  {
    id: 5,
    eventType: 'DISCOUNT',
    facilityId: '3',
    discountType: 'PERCENT',
    discountPercent: 30,
    image: 'https://via.placeholder.com/600x400?text=New+Customer+Discount',
    bannerImage: 'https://via.placeholder.com/1200x400?text=New+Customer+Discount+Banner',
    conditions: 'Chỉ áp dụng cho khách hàng mới (chưa từng đặt sân tại cơ sở). Mỗi khách hàng chỉ được sử dụng ưu đãi 1 lần.',
    minBookingValue: 200000,
    discountCode: 'NEWCUSTOMER30',
    targetUserType: 'NEW',
    targetProducts: ['ALL'],
    maxUsageCount: 100,
    contact: {
      name: 'Nguyễn Thị D',
      email: 'nguyenthid@example.com',
      phone: '0934567890'
    }
  },
  {
    id: 6,
    eventType: 'TOURNAMENT',
    facilityId: '4',
    tournamentName: 'Giải đấu Cầu lông Phạm Kha',
    sportTypes: [4], // Cầu lông
    targetSportId: 4, // For backward compatibility
    image: 'https://via.placeholder.com/600x400?text=Badminton+Tournament',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Badminton+Tournament+Banner',
    fields: ['Sân 1', 'Sân 2', 'Sân 3', 'Sân 4'],
    venueDetails: 'Nhà thi đấu cầu lông Phạm Kha',
    maxParticipants: 48,
    minParticipants: 24,
    currentParticipants: 42,
    registrationType: 'both',
    registrationEndDate: '2024-06-01T23:59:59Z',
    registrationFee: 300000,
    isFreeRegistration: false,
    paymentInstructions: 'Phí tham gia: 300.000đ/người hoặc 500.000đ/đôi. Thanh toán qua MoMo hoặc ZaloPay.',
    paymentMethod: ['momo', 'zalopay'],
    paymentDeadline: '2024-05-25T23:59:59Z',
    paymentQrImage: 'https://via.placeholder.com/300x300?text=QR+Momo+Zalo',
    registrationProcess: '1. Đăng ký online\n2. Thanh toán qua ví điện tử\n3. Nhận xác nhận qua email\n4. Check-in trước giờ thi đấu 30 phút',
    ageLimit: 'Không giới hạn độ tuổi',
    tournamentFormat: ['knockout'],
    tournamentFormatDescription: 'Chia theo trình độ: nghiệp dư và chuyên nghiệp. Đấu loại trực tiếp từ vòng 1.',
    totalPrize: '7.000.000 VNĐ + Cup + Vợt cầu lông cao cấp',
    prizeDescription: 'Giải nhất: Cup, 4 triệu đồng và 1 vợt cầu lông cao cấp. Giải nhì: 2 triệu đồng. Giải ba: 1 triệu đồng.',
    prizes: [
      { position: 1, prize: 'Cup + 4.000.000 VNĐ + Vợt cầu lông' },
      { position: 2, prize: '2.000.000 VNĐ' },
      { position: 3, prize: '1.000.000 VNĐ' }
    ],
    rulesAndRegulations: 'Thi đấu theo luật cầu lông quốc tế. Các trận đấu thi đấu 3 set, mỗi set 21 điểm. Ban tổ chức cung cấp cầu thi đấu, người chơi tự mang vợt.',
    currentStatus: 'inProgress',
    location: 'Nhà thi đấu cầu lông Phạm Kha',
    contact: {
      name: 'Phạm Văn D',
      email: 'phamvand@example.com',
      phone: '0923456789'
    }
  },
  {
    id: 7,
    eventType: 'DISCOUNT',
    facilityId: '2',
    discountType: 'AMOUNT',
    discountAmount: 50000,
    image: 'https://via.placeholder.com/600x400?text=Flash+Sale+Noon',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Flash+Sale+Noon+Banner',
    conditions: 'Áp dụng cho đơn đặt sân trong khung giờ 11h-14h. Mỗi khách hàng được sử dụng tối đa 1 lần/ngày.',
    minBookingValue: 100000,
    discountCode: 'NOON50K',
    targetUserType: 'ALL',
    targetProducts: ['FIELD_FOOTBALL', 'FIELD_BADMINTON'],
    maxUsageCount: 30,
    contact: {
      name: 'Trần Thị E',
      email: 'tranthie@example.com',
      phone: '0945678901'
    }
  },
  {
    id: 8,
    eventType: 'DISCOUNT',
    facilityId: '1',
    discountType: 'FREE_SLOT',
    freeSlots: 2,
    image: 'https://via.placeholder.com/600x400?text=VIP+Free+Slots',
    bannerImage: 'https://via.placeholder.com/1200x400?text=VIP+Free+Slots+Banner',
    conditions: 'Tặng 2 lượt đặt sân miễn phí cho khách hàng VIP khi đặt sân 5 lần trong tháng.',
    minBookingValue: 0,
    discountCode: 'VIPFREE2',
    targetUserType: 'VIP',
    targetProducts: ['ALL'],
    maxUsageCount: 50,
    contact: {
      name: 'Vũ Văn F',
      email: 'vuvanf@example.com',
      phone: '0956789012'
    }
  }
];
