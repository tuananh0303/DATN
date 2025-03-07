import { SportType } from '../interfaces/field';

// Định nghĩa các loại hình thể thao có sẵn
export const SPORT_TYPES: SportType[] = [
  {
    id: 'badminton',
    name: 'Cầu lông',
    defaultPricing: 150000,
    surfaceTypes: [
      'Thảm cao su',
      'Gỗ công nghiệp', 
      'Nhựa tổng hợp',
      'Mặt sân chuyên dụng'
    ],
    standardSizes: [
      '13.4m x 6.1m',  // Kích thước tiêu chuẩn quốc tế
      '15m x 7m',      // Kích thước phổ biến tại Việt Nam
      '16m x 8m'       // Kích thước có thêm không gian xung quanh
    ]
  },
  {
    id: 'football',
    name: 'Bóng đá',
    defaultPricing: 500000,
    surfaceTypes: [
      'Cỏ nhân tạo 5G',
      'Cỏ nhân tạo 7G',
      'Cỏ tự nhiên',
      'Sân xi măng'
    ],
    standardSizes: [
      '25m x 15m',     // Sân 5 người
      '40m x 20m',     // Sân 7 người
      '50m x 25m',     // Sân 9 người
      '90m x 45m',     // Sân 11 người
      '100m x 50m'     // Sân chuẩn FIFA
    ]
  },
  {
    id: 'basketball',
    name: 'Bóng rổ',
    defaultPricing: 300000,
    surfaceTypes: [
      'Nhựa tổng hợp',
      'Gỗ công nghiệp',
      'Bê tông đánh bóng',
      'Mặt sân cao su EPDM'
    ],
    standardSizes: [
      '28m x 15m',     // Kích thước tiêu chuẩn
      '30m x 18m',     // Kích thước có thêm không gian
      '32m x 19m'      // Kích thước thi đấu quốc tế
    ]
  },
  {
    id: 'volleyball',
    name: 'Bóng chuyền',
    defaultPricing: 200000,
    surfaceTypes: [
      'Nhựa tổng hợp',
      'Gỗ công nghiệp',
      'Cao su tổng hợp',
      'Mặt sân chuyên dụng'
    ],
    standardSizes: [
      '18m x 9m',      // Kích thước tiêu chuẩn
      '20m x 10m',     // Kích thước có thêm không gian
      '22m x 12m'      // Kích thước thi đấu quốc tế
    ]
  },
  {
    id: 'tennis',
    name: 'Tennis',
    defaultPricing: 250000,
    surfaceTypes: [
      'Sân cứng (Hard Court)',
      'Sân đất nện (Clay)',
      'Sân cỏ (Grass)',
      'Sân thảm cao su'
    ],
    standardSizes: [
      '23.77m x 10.97m',  // Kích thước tiêu chuẩn đơn
      '23.77m x 8.23m',   // Kích thước tiêu chuẩn đôi
      '25m x 12m'         // Kích thước có thêm không gian
    ]
  }
];

// Định nghĩa các phương thức đặt tên sân
export const NAMING_METHODS = [
  { 
    value: 'numeric',
    label: 'Theo số (01, 02,...)',
    example: 'Sân 01, Sân 02'
  },
  { 
    value: 'alphabet',
    label: 'Theo chữ cái (A, B,...)',
    example: 'Sân A, Sân B'
  },
  { 
    value: 'custom',
    label: 'Tùy chỉnh',
    example: 'Tự đặt tên cho từng sân'
  }
];

// Định nghĩa giờ cao điểm mặc định
export const DEFAULT_PEAK_HOURS = {
  startTime: '17:00',
  endTime: '22:00',
  priceIncrease: 50000  // Tăng 50,000đ trong giờ cao điểm
};

// Định nghĩa trạng thái sân
export const COURT_STATUS = {
  ACTIVE: 'active',
  MAINTENANCE: 'maintenance',
  INACTIVE: 'inactive'
} as const;

// Định nghĩa các khoảng giờ phổ biến
export const COMMON_TIME_SLOTS = [
  { start: '06:00', end: '17:00', label: 'Giờ thường' },
  { start: '17:00', end: '22:00', label: 'Giờ cao điểm' },
  { start: '22:00', end: '23:59', label: 'Giờ đêm' }
];

// Định nghĩa các mức tăng giá phổ biến
export const COMMON_PRICE_INCREASES = [
  { value: 30000, label: 'Tăng 30,000đ' },
  { value: 50000, label: 'Tăng 50,000đ' },
  { value: 100000, label: 'Tăng 100,000đ' }
];

// Định nghĩa các trạng thái của form
export const FORM_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;
