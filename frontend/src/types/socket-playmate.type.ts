// Interface định nghĩa cấu trúc dữ liệu playmate từ socket
export interface SocketPlaymate {
  id: string;
  title: string;
  imagesUrl: string[];
  bookingSlot: {
    id: number;
    date: string;
    status: string;
    field: {
      id: number;
      name: string;
      status: string;
      fieldGroup: {
        id: string;
        name: string;
        dimension: string;
        surface: string;
        basePrice: number;
        facility: {
          id: string;
          name: string;
          description: string;
          location: string;
          status: string;
          imagesUrl: string[];
        }
      }
    };
    booking: {
      id: string;
      startTime: string;
      endTime: string;
      createdAt: string;
      updatedAt: string;
      status: string;
      player: {
        id: string;
        name: string;
        email: string;
        phoneNumber?: string;
        avatarUrl?: string;
      };
      sport: {
        id: number;
        name: string;
      };
    };
  };
  description?: string;
  additionalInfo?: string;
  costType: string;
  totalCost?: number;
  maleCost?: number;
  femaleCost?: number;
  detailOfCost?: string;
  isTeam: boolean;
  numberOfParticipants: number;
  positions: string[];
  genderPreference: string;
  skillLevel: string;
  createdAt: string;
  participants?: Array<{
    playmateId: string;
    playerId: string;
    status: string;
    player: {
      id: string;
      name: string;
      email: string;
    };
  }>;
} 