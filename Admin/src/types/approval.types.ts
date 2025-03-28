export interface Approval {
    id: string;
    name: string;
    type: 'facility' | 'owner' | 'event' | 'other';
    requestedBy: {
      id: string;
      name: string;
      email: string;
    };
    createdAt: string;
    status: 'pending' | 'approved' | 'rejected';
    details: string;
  }
  
  export interface ApprovalFilter {
    status?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }
  
  export interface ApprovalState {
    approvals: Approval[];
    selectedApproval: Approval | null;
    loading: boolean;
    error: string | null;
    totalApprovals: number;
  }