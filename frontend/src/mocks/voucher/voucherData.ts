import { Voucher } from '@/types/voucher.type';

// Mock voucher data
export const mockVouchers: Voucher[] = [
  {
    id: 1,
    name: 'Chào mừng thành viên mới',
    code: 'WELCOME2023',
    startDate: '2025-03-30',
    endDate: '2025-04-30',
    voucherType: 'percent',
    discount: 10,
    minPrice: 100000,
    maxDiscount: 50000,
    amount: 100,
    remain: 78,
    createdAt: '2025-03-30T10:00:00Z',
    updatedAt: '2025-03-30T10:00:00Z'
  },
  {
    id: 2,
    name: 'Giảm giá cuối tuần',
    code: 'WEEKEND30',
    startDate: '2025-03-30',
    endDate: '2025-04-30',
    voucherType: 'percent',
    discount: 30,
    minPrice: 500000,
    maxDiscount: 200000,
    amount: 50,
    remain: 42,
    createdAt: '2023-10-28T14:00:00Z',
    updatedAt: '2023-10-28T14:00:00Z'
  },
  {
    id: 3,
    name: 'Ưu đãi đặt sân ngày lễ',
    code: 'HOLIDAY100K',
    startDate: '2025-04-05',
    endDate: '2025-04-10',
    voucherType: 'cash',
    discount: 100000,
    minPrice: 300000,
    maxDiscount: 100000,
    amount: 30,
    remain: 30,
    createdAt: '2023-11-01T08:30:00Z',
    updatedAt: '2023-11-01T08:30:00Z'
  },
  {
    id: 4,
    name: 'Flash Sale - Đặt sân sớm',
    code: 'EARLY15',
    startDate: '2023-10-15',
    endDate: '2023-10-31',
    voucherType: 'percent',
    discount: 15,
    minPrice: 200000,
    maxDiscount: 100000,
    amount: 40,
    remain: 5,
    createdAt: '2023-10-10T09:15:00Z',
    updatedAt: '2023-10-10T09:15:00Z'
  },
  {
    id: 5,
    name: 'Khuyến mãi đặc biệt',
    code: 'SPECIAL50K',
    startDate: '2024-01-01',
    endDate: '2024-02-29',
    voucherType: 'cash',
    discount: 50000,
    minPrice: 150000,
    maxDiscount: 50000,
    amount: 60,
    remain: 60,
    createdAt: '2023-11-05T11:45:00Z',
    updatedAt: '2023-11-05T11:45:00Z'
  },
  {
    id: 6,
    name: 'Ưu đãi thành viên VIP',
    code: 'VIP2023',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    voucherType: 'percent',
    discount: 20,
    minPrice: 300000,
    maxDiscount: 150000,
    amount: 25,
    remain: 10,
    createdAt: '2023-09-25T10:30:00Z',
    updatedAt: '2023-09-25T10:30:00Z'
  }
];

// Mock facilities data for dropdown
export const mockFacilitiesDropdown = [
  { id: '1', name: 'Sân bóng đá Thống Nhất' },
  { id: '2', name: 'Sân Tennis Phú Nhuận' },
  { id: '3', name: 'Sân bóng rổ Tân Bình' }
];
