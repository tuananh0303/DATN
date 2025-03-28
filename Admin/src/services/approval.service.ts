import { apiClient } from './api.service';
import { ApprovalFilter } from '@/types/approval.types';

export const approvalService = {
  async getApprovals(filter: ApprovalFilter = {}) {
    const response = await apiClient.get('/admin/approvals', { params: filter });
    return response.data;
  },
  
  async approveRequest(approvalId: string) {
    const response = await apiClient.post(`/admin/approvals/${approvalId}/approve`);
    return response.data;
  },
  
  async rejectRequest(approvalId: string, reason?: string) {
    const response = await apiClient.post(`/admin/approvals/${approvalId}/reject`, { reason });
    return response.data;
  },
  
  async getApprovalById(approvalId: string) {
    const response = await apiClient.get(`/admin/approvals/${approvalId}`);
    return response.data;
  }
};