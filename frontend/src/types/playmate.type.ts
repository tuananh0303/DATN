// Loại tìm kiếm (Cá nhân/Nhóm)
export type PlaymateSearchType = 'INDIVIDUAL' | 'GROUP';

// Mức độ kỹ năng
export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL' | 'ANY';

// Trạng thái tìm kiếm
export type PlaymateStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';

// Giới tính ưu tiên
export type GenderPreference = 'MALE' | 'FEMALE' | 'ANY';

// Giao diện chính cho tìm kiếm người chơi cùng
export interface PlaymateSearch {
  id: number;
  userId: string;
  userInfo: {
    name: string;
    avatar?: string;
    gender?: string;
    age?: number;
    phoneNumber?: string;
  };
  sportId: number;
  sportName: string;
  title: string;
  description?: string;
  facilityId?: string;
  facilityName?: string;
  location?: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  searchType: PlaymateSearchType;
  skillLevel: SkillLevel;
  participants: {
    required: number;
    current: number;
  };
  genderPreference: GenderPreference;
  status: PlaymateStatus;
  price?: number; // Chi phí chia sẻ nếu có
  createdAt: string;
  updatedAt: string;
  applications?: PlaymateApplication[];
}

// Đơn đăng ký tham gia
export interface PlaymateApplication {
  id: number;
  searchId: number;
  userId: string;
  userInfo: {
    name: string;
    avatar?: string;
    gender?: string;
    phoneNumber?: string;
  };
  message?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
} 