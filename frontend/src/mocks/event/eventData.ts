import { Event, EventDetail } from '@/types/event.type';

// Mock data for events
export const mockEvents: Event[] = [
  {
    id: 1,
    name: 'Giải đấu Tennis mùa hè',
    description: 'Giải đấu tennis dành cho tất cả khách hàng với nhiều phần quà hấp dẫn. Hãy tham gia để trải nghiệm không khí sôi động của các trận đấu gay cấn và cơ hội nhận giải thưởng hấp dẫn!',
    startDate: '2024-07-15T08:00:00Z',
    endDate: '2024-07-20T18:00:00Z',
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
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-06-30T23:59:59Z',
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
    startDate: '2024-05-10T09:00:00Z',
    endDate: '2024-05-12T18:00:00Z',
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
    startDate: '2024-07-25T08:00:00Z',
    endDate: '2024-07-25T20:00:00Z',
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
    startDate: '2024-06-15T00:00:00Z',
    endDate: '2024-08-15T23:59:59Z',
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
  }
];

// Mock event types
export const mockEventTypes = [
  { id: 'DISCOUNT', name: 'Khuyến mãi' },
  { id: 'TOURNAMENT', name: 'Giải đấu' }
];

// Mock additional event data for expanded event model
export const mockEventDetails: Record<number, EventDetail> = {
  1: {
    eventType: 'TOURNAMENT',
    targetSportId: 3, // Tennis
    facilityId: '2',
    image: 'https://via.placeholder.com/600x400?text=Tennis+Tournament',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Tennis+Tournament+Banner',
    fields: ['Sân 1', 'Sân 2', 'Sân 3'],
    maxParticipants: 32,
    minParticipants: 16,
    currentParticipants: 24,
    registrationEndDate: '2024-07-10T23:59:59Z',
    registrationLink: 'https://forms.example.com/tennis-tournament',
    registrationFee: 500000,
    tournamentFormat: 'Đấu loại trực tiếp',
    prizes: [
      { position: 1, prize: 'Cup + 5.000.000 VNĐ' },
      { position: 2, prize: '3.000.000 VNĐ' },
      { position: 3, prize: '1.000.000 VNĐ' }
    ],
    rules: 'Luật thi đấu áp dụng theo tiêu chuẩn quốc tế. Mỗi trận đấu gồm 3 set, mỗi set 6 game. Người chơi tự mang vợt, ban tổ chức cung cấp bóng thi đấu.',
    location: 'Sân chính - Khu Tennis Bình Chánh',
    contact: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0901234567'
    }
  },
  2: {
    eventType: 'DISCOUNT',
    facilityId: '1',
    discountPercent: 20,
    image: 'https://via.placeholder.com/600x400?text=Early+Booking+Discount',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Early+Booking+Discount+Banner',
    conditions: 'Áp dụng cho đặt sân trước 7 ngày. Không áp dụng đồng thời với các chương trình khuyến mãi khác.',
    minBookingValue: 0,
    discountCode: 'EARLY20'
  },
  3: {
    eventType: 'TOURNAMENT',
    targetSportId: 1, // Bóng đá
    facilityId: '1',
    image: 'https://via.placeholder.com/600x400?text=Football+Cup',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Football+Cup+Banner',
    fields: ['Sân A1', 'Sân A2'],
    maxParticipants: 16,
    minParticipants: 8,
    currentParticipants: 16,
    registrationEndDate: '2024-05-05T23:59:59Z',
    registrationFee: 1000000,
    tournamentFormat: 'Vòng tròn + Đấu loại trực tiếp',
    prizes: [
      { position: 1, prize: 'Cup + 3.000.000 VNĐ' },
      { position: 2, prize: '2.000.000 VNĐ' },
      { position: 3, prize: '1.000.000 VNĐ' }
    ],
    rules: 'Mỗi đội tối đa 8 người, mỗi trận đấu 5v5. Thời gian mỗi trận là 30 phút, chia làm 2 hiệp. Luật bóng đá 5 người được áp dụng.',
    location: 'Sân bóng đá Phạm Kha - Khu A',
    contact: {
      name: 'Trần Văn B',
      email: 'tranvanb@example.com',
      phone: '0912345678'
    }
  },
  4: {
    eventType: 'TOURNAMENT',
    facilityId: '2',
    image: 'https://via.placeholder.com/600x400?text=Family+Sports+Day',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Family+Sports+Day+Banner',
    activities: ['Tennis', 'Bóng đá', 'Bóng rổ', 'Cầu lông'],
    specialServices: ['Đồ ăn miễn phí', 'Huấn luyện viên hướng dẫn', 'Trò chơi cho trẻ em', 'Quà tặng cho gia đình tham gia'],
    location: 'Khu phức hợp thể thao Bình Chánh',
    registrationLink: 'https://forms.example.com/family-sports-day',
    contact: {
      name: 'Lê Thị C',
      email: 'lethic@example.com',
      phone: '0987654321'
    }
  },
  5: {
    eventType: 'DISCOUNT',
    facilityId: '3',
    discountPercent: 30,
    image: 'https://via.placeholder.com/600x400?text=New+Customer+Discount',
    bannerImage: 'https://via.placeholder.com/1200x400?text=New+Customer+Discount+Banner',
    conditions: 'Chỉ áp dụng cho khách hàng mới (chưa từng đặt sân tại cơ sở). Mỗi khách hàng chỉ được sử dụng ưu đãi 1 lần.',
    minBookingValue: 200000,
    discountCode: 'NEWCUSTOMER30'
  },
  6: {
    eventType: 'TOURNAMENT',
    targetSportId: 4, // Cầu lông
    facilityId: '4',
    image: 'https://via.placeholder.com/600x400?text=Badminton+Tournament',
    bannerImage: 'https://via.placeholder.com/1200x400?text=Badminton+Tournament+Banner',
    fields: ['Sân 1', 'Sân 2', 'Sân 3', 'Sân 4'],
    maxParticipants: 48,
    minParticipants: 24,
    currentParticipants: 42,
    registrationEndDate: '2024-06-01T23:59:59Z',
    registrationFee: 300000,
    tournamentFormat: 'Đấu loại kép',
    prizes: [
      { position: 1, prize: 'Cup + 4.000.000 VNĐ' },
      { position: 2, prize: '2.000.000 VNĐ' },
      { position: 3, prize: '1.000.000 VNĐ' }
    ],
    rules: 'Thi đấu theo luật cầu lông quốc tế. Các trận đấu thi đấu 3 set, mỗi set 21 điểm. Ban tổ chức cung cấp cầu thi đấu, người chơi tự mang vợt.',
    location: 'Nhà thi đấu cầu lông Phạm Kha',
    contact: {
      name: 'Phạm Văn D',
      email: 'phamvand@example.com',
      phone: '0923456789'
    }
  }
};
