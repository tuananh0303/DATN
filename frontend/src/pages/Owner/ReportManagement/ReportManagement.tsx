import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import { ICONS } from '@/constants/owner/Content/content';
import { Payment, Facility, PaymentStats, PaymentFilter } from '@/services/paymentService';

const ITEMS_PER_PAGE = 5;

const ReportManagement: React.FC = () => {
  // States
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [paymentStats, setPaymentStats] = useState<PaymentStats>({
    totalRevenue: 0,
    totalTransactions: 0,
    pendingAmount: 0,
    pendingTransactions: 0,
    weeklyRevenue: { amount: 0, transactions: 0 },
    monthlyRevenue: { amount: 0, transactions: 0 }
  });
  
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<Payment['status'] | 'all'>('all');
  const [playerNameFilter, setPlayerNameFilter] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    if (selectedFacility) {
      fetchPaymentStats();
      fetchPayments();
    }
  }, [selectedFacility, statusFilter, playerNameFilter, dateRange, currentPage]);

  const fetchFacilities = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await paymentService.getFacilities();
      // setFacilities(response.data);
      setFacilities([
        { id: '1', name: 'Sân cầu lông Phạm Kha' }
      ]);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const fetchPaymentStats = async () => {
    try {
      // TODO: Replace with actual API call
      // const stats = await paymentService.getPaymentStats(selectedFacility);
      // setPaymentStats(stats);
      setPaymentStats({
        totalRevenue: 10000000,
        totalTransactions: 100,
        pendingAmount: 1000000,
        pendingTransactions: 10,
        weeklyRevenue: { amount: 2000000, transactions: 20 },
        monthlyRevenue: { amount: 8000000, transactions: 80 }
      });
    } catch (error) {
      console.error('Error fetching payment stats:', error);
    }
  };

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const filters: PaymentFilter = {
        facilityId: selectedFacility,
        status: statusFilter === 'all' ? undefined : statusFilter,
        playerName: playerNameFilter || undefined,
        dateRange: dateRange[0] && dateRange[1] ? {
          start: dateRange[0],
          end: dateRange[1]
        } : undefined,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      };

      // TODO: Replace with actual API call
      // const response = await paymentService.getPayments(filters);
      // setPayments(response.data);
      // setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE));

      // Mock data
      setPayments([/* your mock payment data */]);
      setTotalPages(3);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async () => {
    try {
      const filters: PaymentFilter = {
        facilityId: selectedFacility,
        status: statusFilter === 'all' ? undefined : statusFilter,
        playerName: playerNameFilter || undefined,
        dateRange: dateRange[0] && dateRange[1] ? {
          start: dateRange[0],
          end: dateRange[1]
        } : undefined
      };

      const blob = await paymentService.exportPaymentReport(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'payment-report.xlsx';
      a.click();
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Facility Selection */}
      <div className="mb-6">
        <select
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          className="w-full md:w-64 p-2 border rounded-lg"
        >
          <option value="">Chọn cơ sở</option>
          {facilities.map((facility) => (
            <option key={facility.id} value={facility.id}>
              {facility.name}
            </option>
          ))}
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Tổng doanh thu"
          value={`${paymentStats.totalRevenue.toLocaleString()}đ`}
          description={`${paymentStats.totalTransactions} giao dịch`}
        />
        <StatCard
          title="Chờ thanh toán"
          value={`${paymentStats.pendingAmount.toLocaleString()}đ`}
          description={`${paymentStats.pendingTransactions} giao dịch`}
          isWarning
        />
        <StatCard
          title="Doanh thu tuần này"
          value={`${paymentStats.weeklyRevenue.amount.toLocaleString()}đ`}
          description={`${paymentStats.weeklyRevenue.transactions} giao dịch`}
        />
        <StatCard
          title="Doanh thu tháng này"
          value={`${paymentStats.monthlyRevenue.amount.toLocaleString()}đ`}
          description={`${paymentStats.monthlyRevenue.transactions} giao dịch`}
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Payment['status'] | 'all')}
              className="w-full p-2 border rounded-lg"
            >
              <option value="all">Tất cả</option>
              <option value="pending">Chờ thanh toán</option>
              <option value="completed">Đã thanh toán</option>
              <option value="failed">Thất bại</option>
              <option value="refunded">Đã hoàn tiền</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tên người chơi</label>
            <input
              type="text"
              value={playerNameFilter}
              onChange={(e) => setPlayerNameFilter(e.target.value)}
              placeholder="Nhập tên người chơi"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Thời gian</label>
            <DatePicker
              selectsRange
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(update) => setDateRange(update)}
              className="w-full p-2 border rounded-lg"
              placeholderText="Chọn khoảng thời gian"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleExportReport}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Xuất báo cáo
          </button>
          <button
            onClick={() => {
              setStatusFilter('all');
              setPlayerNameFilter('');
              setDateRange([null, null]);
            }}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Đặt lại
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Mã giao dịch</th>
              <th className="p-4 text-left">Người thanh toán</th>
              <th className="p-4 text-left">Số tiền</th>
              <th className="p-4 text-left">Phương thức</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              payments.map((payment) => (
                <PaymentRow key={payment.id} payment={payment} />
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center p-4 border-t">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 px-4 py-2 rounded transition-colors
                  ${currentPage === i + 1 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Components
const StatCard: React.FC<{
  title: string;
  value: string;
  description: string;
  isWarning?: boolean;
}> = ({ title, value, description, isWarning }) => (
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-gray-600 mb-2">{title}</h3>
    <div className={`text-2xl font-bold ${isWarning ? 'text-yellow-500' : 'text-gray-900'}`}>
      {value}
    </div>
    <p className="text-gray-500">{description}</p>
  </div>
);

const PaymentRow: React.FC<{ payment: Payment }> = ({ payment }) => {
  const getStatusColor = (status: Payment['status']) => {
    const colors = {
      pending: 'text-yellow-500',
      completed: 'text-green-500',
      failed: 'text-red-500',
      refunded: 'text-gray-500'
    };
    return colors[status];
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4">{payment.id}</td>
      <td className="p-4">{payment.userName}</td>
      <td className="p-4">{payment.amount.toLocaleString()}đ</td>
      <td className="p-4">{payment.paymentMethod}</td>
      <td className="p-4">
        <span className={`font-medium ${getStatusColor(payment.status)}`}>
          {payment.status}
        </span>
      </td>
      <td className="p-4">{new Date(payment.createdAt).toLocaleString()}</td>
    </tr>
  );
};

export default ReportManagement; 