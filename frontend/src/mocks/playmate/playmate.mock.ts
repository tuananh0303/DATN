import { PlaymateSearch, PlaymateApplication } from "@/types/playmate.type";

export const mockPlaymateApplications: PlaymateApplication[] = [
  {
    id: 1,
    searchId: 1,
    userId: "user123",
    userInfo: {
      name: "Nguyễn Văn A",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      gender: "male",
      phoneNumber: "0987654321"
    },
    message: "Tôi muốn tham gia để cải thiện kỹ năng đá bóng của mình.",
    status: "PENDING",
    createdAt: "2023-10-25T08:30:00Z"
  },
  {
    id: 2,
    searchId: 1,
    userId: "user456",
    userInfo: {
      name: "Trần Thị B",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      gender: "female",
      phoneNumber: "0987654322"
    },
    message: "Tôi đã chơi bóng đá 5 năm và muốn tìm đối tác mới.",
    status: "ACCEPTED",
    createdAt: "2023-10-25T09:15:00Z"
  },
  {
    id: 3,
    searchId: 1,
    userId: "user789",
    userInfo: {
      name: "Lê Văn C",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      gender: "male",
      phoneNumber: "0987654323"
    },
    message: "Tôi là người mới, muốn học hỏi từ các bạn.",
    status: "REJECTED",
    createdAt: "2023-10-25T10:00:00Z"
  }
];

export const mockPlaymateSearches: PlaymateSearch[] = [
  {
    id: 1,
    userId: "user999",
    userInfo: {
      name: "Trần Minh D",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      gender: "male",
      age: 28,
      phoneNumber: "0987654324"
    },
    sportId: 1,
    sportName: "Bóng đá",
    title: "Tìm đối tác chơi bóng đá 5v5",
    description: "Đang tìm thêm người để chơi bóng đá 5v5 vào cuối tuần. Mình có sân và cần thêm 3 người nữa.",
    facilityId: "facility123",
    facilityName: "Sân bóng đá Mini HCMC",
    location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    date: "2023-11-05",
    timeStart: "18:00",
    timeEnd: "20:00",
    searchType: "GROUP",
    skillLevel: "INTERMEDIATE",
    participants: {
      required: 5,
      current: 2
    },
    genderPreference: "ANY",
    status: "ACTIVE",
    price: 50000,
    createdAt: "2023-10-24T15:30:00Z",
    updatedAt: "2023-10-24T15:30:00Z",
    applications: mockPlaymateApplications
  },
  {
    id: 2,
    userId: "user888",
    userInfo: {
      name: "Phạm Thị E",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      gender: "female",
      age: 24,
      phoneNumber: "0987654325"
    },
    sportId: 2,
    sportName: "Tennis",
    title: "Tìm người chơi tennis cuối tuần",
    description: "Mình mới bắt đầu chơi tennis được vài tháng, đang tìm bạn cùng luyện tập vào sáng thứ 7 hoặc chủ nhật.",
    facilityId: "facility456",
    facilityName: "Sân Tennis Phú Nhuận",
    location: "456 Phan Xích Long, Phú Nhuận, TP.HCM",
    date: "2023-11-11",
    timeStart: "08:00",
    timeEnd: "10:00",
    searchType: "INDIVIDUAL",
    skillLevel: "BEGINNER",
    participants: {
      required: 1,
      current: 0
    },
    genderPreference: "ANY",
    status: "ACTIVE",
    price: 100000,
    createdAt: "2023-10-26T10:15:00Z",
    updatedAt: "2023-10-26T10:15:00Z"
  },
  {
    id: 3,
    userId: "user777",
    userInfo: {
      name: "Hoàng Văn F",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      gender: "male",
      age: 32,
      phoneNumber: "0987654326"
    },
    sportId: 3,
    sportName: "Cầu lông",
    title: "Tìm đối thủ cầu lông trình độ nâng cao",
    description: "Mình đã chơi cầu lông 10 năm, đang tìm đối thủ cùng trình độ để thi đấu giao lưu vào tối thứ 4 hàng tuần.",
    facilityId: "facility789",
    facilityName: "Nhà thi đấu Tân Bình",
    location: "789 Cộng Hòa, Tân Bình, TP.HCM",
    date: "2023-11-15",
    timeStart: "19:00",
    timeEnd: "21:00",
    searchType: "INDIVIDUAL",
    skillLevel: "ADVANCED",
    participants: {
      required: 1,
      current: 0
    },
    genderPreference: "ANY",
    status: "ACTIVE",
    price: 80000,
    createdAt: "2023-10-27T14:45:00Z",
    updatedAt: "2023-10-27T14:45:00Z"
  },
  {
    id: 4,
    userId: "user666",
    userInfo: {
      name: "Ngô Thị G",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      gender: "female",
      age: 27,
      phoneNumber: "0987654327"
    },
    sportId: 4,
    sportName: "Bơi lội",
    title: "Tìm bạn cùng tập bơi buổi sáng",
    description: "Mình muốn tìm bạn cùng tập bơi vào buổi sáng để động viên nhau. Bạn không cần giỏi, chỉ cần đều đặn.",
    facilityId: "facility101",
    facilityName: "Hồ bơi Đầm Sen",
    location: "101 Hòa Bình, Quận 11, TP.HCM",
    date: "2023-11-20",
    timeStart: "06:00",
    timeEnd: "07:30",
    searchType: "INDIVIDUAL",
    skillLevel: "INTERMEDIATE",
    participants: {
      required: 1,
      current: 0
    },
    genderPreference: "FEMALE",
    status: "ACTIVE",
    price: 60000,
    createdAt: "2023-10-28T08:20:00Z",
    updatedAt: "2023-10-28T08:20:00Z"
  },
  {
    id: 5,
    userId: "user555",
    userInfo: {
      name: "Đỗ Văn H",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      gender: "male",
      age: 35,
      phoneNumber: "0987654328"
    },
    sportId: 1,
    sportName: "Bóng đá",
    title: "Tuyển người chơi cho đội bóng phong trào",
    description: "Đội bóng phong trào khu vực quận 7 đang tuyển thêm thành viên tham gia thi đấu giao lưu hàng tuần.",
    facilityId: "facility202",
    facilityName: "Sân bóng đá Phú Mỹ Hưng",
    location: "202 Nguyễn Lương Bằng, Quận 7, TP.HCM",
    date: "2023-11-25",
    timeStart: "17:30",
    timeEnd: "19:30",
    searchType: "GROUP",
    skillLevel: "INTERMEDIATE",
    participants: {
      required: 3,
      current: 1
    },
    genderPreference: "MALE",
    status: "ACTIVE",
    price: 70000,
    createdAt: "2023-10-29T16:10:00Z",
    updatedAt: "2023-10-29T16:10:00Z"
  },
  {
    id: 6,
    userId: "user444",
    userInfo: {
      name: "Lý Thị I",
      avatar: "https://randomuser.me/api/portraits/women/9.jpg",
      gender: "female",
      age: 29,
      phoneNumber: "0987654329"
    },
    sportId: 5,
    sportName: "Yoga",
    title: "Tìm nhóm tập Yoga cùng nhau",
    description: "Mình đang tìm 3-4 bạn cùng tập Yoga vào buổi sáng sớm tại công viên hoặc phòng tập.",
    facilityId: "facility303",
    facilityName: "Phòng tập Yoga Zen",
    location: "303 Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM",
    date: "2023-11-30",
    timeStart: "05:30",
    timeEnd: "07:00",
    searchType: "GROUP",
    skillLevel: "BEGINNER",
    participants: {
      required: 4,
      current: 1
    },
    genderPreference: "FEMALE",
    status: "ACTIVE",
    price: 50000,
    createdAt: "2023-10-30T07:45:00Z",
    updatedAt: "2023-10-30T07:45:00Z"
  },
  {
    id: 7,
    userId: "user333",
    userInfo: {
      name: "Vũ Văn K",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      gender: "male",
      age: 40,
      phoneNumber: "0987654330"
    },
    sportId: 6,
    sportName: "Golf",
    title: "Tìm đối tác chơi golf cuối tuần",
    description: "Đang tìm đối tác chơi golf vào cuối tuần tại các sân golf quanh TP.HCM. Bạn nên có kinh nghiệm khoảng 2-3 năm.",
    facilityId: "facility404",
    facilityName: "Sân Golf Thủ Đức",
    location: "404 Linh Đông, Thủ Đức, TP.HCM",
    date: "2023-12-02",
    timeStart: "14:00",
    timeEnd: "17:00",
    searchType: "INDIVIDUAL",
    skillLevel: "PROFESSIONAL",
    participants: {
      required: 1,
      current: 0
    },
    genderPreference: "ANY",
    status: "ACTIVE",
    price: 500000,
    createdAt: "2023-10-31T11:30:00Z",
    updatedAt: "2023-10-31T11:30:00Z"
  },
  {
    id: 8,
    userId: "user222",
    userInfo: {
      name: "Đinh Thị L",
      avatar: "https://randomuser.me/api/portraits/women/11.jpg",
      gender: "female",
      age: 26,
      phoneNumber: "0987654331"
    },
    sportId: 7,
    sportName: "Bóng rổ",
    title: "Tìm đội bóng rổ nữ để tham gia",
    description: "Mình cao 1m68, đã chơi bóng rổ 5 năm và đang tìm một đội bóng rổ nữ để tham gia tập luyện thường xuyên.",
    facilityId: "facility505",
    facilityName: "Sân bóng rổ Quận 5",
    location: "505 An Dương Vương, Quận 5, TP.HCM",
    date: "2023-12-05",
    timeStart: "18:30",
    timeEnd: "20:30",
    searchType: "GROUP",
    skillLevel: "ADVANCED",
    participants: {
      required: 1,
      current: 0
    },
    genderPreference: "FEMALE",
    status: "ACTIVE",
    price: 40000,
    createdAt: "2023-11-01T13:15:00Z",
    updatedAt: "2023-11-01T13:15:00Z"
  }
];

// Hàm lọc theo môn thể thao
export const filterBySport = (sportId: number | null) => {
  if (!sportId) return mockPlaymateSearches;
  return mockPlaymateSearches.filter(search => search.sportId === sportId);
};

// Hàm lọc theo trình độ kỹ năng
export const filterBySkillLevel = (skillLevel: string | null) => {
  if (!skillLevel) return mockPlaymateSearches;
  return mockPlaymateSearches.filter(search => search.skillLevel === skillLevel);
};

// Hàm lọc theo loại tìm kiếm (cá nhân/nhóm)
export const filterBySearchType = (searchType: string | null) => {
  if (!searchType) return mockPlaymateSearches;
  return mockPlaymateSearches.filter(search => search.searchType === searchType);
};

// Hàm lọc theo trạng thái
export const filterByStatus = (status: string | null) => {
  if (!status) return mockPlaymateSearches;
  return mockPlaymateSearches.filter(search => search.status === status);
};

// Hàm lấy chi tiết tìm kiếm theo ID
export const getSearchById = (id: number) => {
  return mockPlaymateSearches.find(search => search.id === id);
};

// Hàm tạo application mới
export const createApplication = (
  searchId: number, 
  userId: string, 
  userInfo: {
    name: string;
    avatar?: string;
    gender?: string;
    phoneNumber?: string;
  }, 
  message: string
) => {
  const newApplication: PlaymateApplication = {
    id: Math.floor(Math.random() * 1000),
    searchId,
    userId,
    userInfo,
    message,
    status: "PENDING",
    createdAt: new Date().toISOString()
  };
  
  return newApplication;
}; 