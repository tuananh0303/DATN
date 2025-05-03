import { PlaymateSearch, PlaymateApplication, PlaymateFormData } from "@/types/playmate.type";
import { mockPlaymateSearches, mockPlaymateApplications } from "@/mocks/playmate/playmate.mock";
import api from "./api";
// Flag để chuyển đổi giữa mock data và API thực tế
const USE_MOCK = true;

// ----- PLAYMATE SEARCH SERVICES -----

// API Endpoints
const playmateService = {
/**
 * Lấy danh sách tất cả các bài đăng tìm bạn chơi
 */
async getAllPlaymateSearches(): Promise<PlaymateSearch[]> {
  if (USE_MOCK) {
    // Sử dụng mock data
    return Promise.resolve(mockPlaymateSearches);
  } else {
    // Sử dụng API thực tế
    try {
      const response = await api.get('/playmate');
      return response.data;
    } catch (error) {
      console.error('Error fetching playmate searches:', error);
      throw error;
    }
  }
},

/**
 * Lấy chi tiết của một bài đăng tìm bạn chơi theo ID
 */
async getPlaymateSearchById(id: number): Promise<PlaymateSearch | undefined> {
  if (USE_MOCK) {
    // Sử dụng mock data
    const search = mockPlaymateSearches.find(search => search.id === id);
    return Promise.resolve(search);
  } else {
    // Sử dụng API thực tế
    try {
      const response = await api.get(`/playmate/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching playmate search with id ${id}:`, error);
      throw error;
    }
  }
},      

/**
 * Lấy danh sách các bài đăng của người dùng hiện tại
 */
async getUserPlaymateSearches(userId: string): Promise<PlaymateSearch[]> {
  if (USE_MOCK) {
    // Sử dụng mock data
    const userSearches = mockPlaymateSearches.filter(search => search.userId === userId);
    return Promise.resolve(userSearches);
  } else {
    // Sử dụng API thực tế
    try {
      const response = await fetch(`/api/playmate/searches/user/${userId}`);
      if (!response.ok) throw new Error(`Failed to fetch playmate searches for user ${userId}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching playmate searches for user ${userId}:`, error);
      throw error;
    }
  }
},

/**
 * Tạo bài đăng tìm bạn chơi mới
 */
async createPlaymateSearch(formData: PlaymateFormData): Promise<PlaymateSearch> {
  if (USE_MOCK) {
    // Sử dụng mock data - chỉ giả lập
    const newSearch: PlaymateSearch = {
      id: Math.max(...mockPlaymateSearches.map(s => s.id)) + 1,
      userId: 'current-user-id', // Giả định ID người dùng hiện tại
      userInfo: {
        name: 'Người dùng hiện tại', // Giả định tên người dùng hiện tại
      },
      sportId: formData.sportId,
      sportName: 'Mock Sport', // Giả định tên môn thể thao
      title: formData.title,
      description: formData.description,
      image: formData.image ? ['https://example.com/image.jpg'] : undefined,
      requiredSkillLevel: formData.requiredSkillLevel.includes('ANY') ? 'ANY' : formData.requiredSkillLevel[0],
      facilityId: formData.facilityId,
      facilityName: 'Mock Facility', // Giả định tên cơ sở
      location: formData.location,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      applicationDeadline: formData.applicationDeadline,
      communicationDescription: formData.communicationDescription,
      playmateSearchType: formData.searchType, // Chuyển đổi từ searchType
      requiredParticipants: formData.requiredParticipants,
      maximumParticipants: formData.maximumParticipants,
      currentParticipants: 1, // Mặc định là 1 (người tạo)
      genderPreference: formData.genderPreference,
      price: formData.price,
      costType: formData.costType,
      costMale: formData.costMale,
      costFemale: formData.costFemale,
      costDetails: formData.costDetails,
      status: 'ACTIVE', // Mặc định là ACTIVE
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applications: []
    };
    return Promise.resolve(newSearch);
  } else {
    // Sử dụng API thực tế
    try {
      // Chuyển đổi từ FormData sang định dạng API cần
      const apiData = {
        ...formData,
        requiredSkillLevel: formData.requiredSkillLevel.includes('ANY') ? 'ANY' : formData.requiredSkillLevel[0],
        playmateSearchType: formData.searchType
      };
      
      const response = await api.post('/playmate', apiData);
      return response.data;
    } catch (error) {
      console.error('Error creating playmate search:', error);
      throw error;
    }
  }
},

/**
 * Cập nhật thông tin bài đăng tìm bạn chơi
 */
async updatePlaymateSearch(id: number, playmateSearch: Partial<PlaymateSearch>): Promise<PlaymateSearch> {
  if (USE_MOCK) {
    // Sử dụng mock data - chỉ giả lập
    const searchIndex = mockPlaymateSearches.findIndex(search => search.id === id);
    if (searchIndex === -1) {
      throw new Error(`Playmate search with id ${id} not found`);
    }
    
    const updatedSearch: PlaymateSearch = {
      ...mockPlaymateSearches[searchIndex],
      ...playmateSearch,
      updatedAt: new Date().toISOString()
    };
    
    return Promise.resolve(updatedSearch);
  } else {
    // Sử dụng API thực tế
    const apiData = {
      ...playmateSearch,
      id: id
    };
    try {
      const response = await api.put(`/playmate/update`, apiData);
      return response.data;
    } catch (error) {
      console.error(`Error updating playmate search with id ${id}:`, error);
      throw error;
    }
  }
},

/**
 * Xóa bài đăng tìm bạn chơi
 */

/**
 * Lọc bài đăng theo môn thể thao
 */

/**
 * Lọc bài đăng theo trình độ kỹ năng
 */


/**
 * Lọc bài đăng theo loại tìm kiếm (cá nhân/nhóm)
 */


/**
 * Lọc bài đăng theo trạng thái
 */


// ----- PLAYMATE APPLICATION SERVICES -----

/**
 * Lấy danh sách đơn đăng ký của người dùng hiện tại
 */
async getUserApplications(userId: string): Promise<PlaymateApplication[]> {
  if (USE_MOCK) {
    // Sử dụng mock data
    const userApplications = mockPlaymateApplications.filter(app => app.userId === userId);
    
    // Kết hợp với thông tin bài đăng cho frontend
    const extendedApplications = userApplications.map(app => {
      const relatedSearch = mockPlaymateSearches.find(search => search.id === app.playmateSearchId);
      return {
        ...app,
        search: relatedSearch
      };
    });
    
    return Promise.resolve(extendedApplications as unknown as PlaymateApplication[]);
  } else {
    // Sử dụng API thực tế
    try {
      const response = await fetch(`/api/playmate/applications/user/${userId}`);
      if (!response.ok) throw new Error(`Failed to fetch applications for user ${userId}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching applications for user ${userId}:`, error);
      throw error;
    }
  }
},

/**
 * Lấy danh sách đơn đăng ký cho một bài đăng cụ thể
 */
async getApplicationsForSearch(searchId: number): Promise<PlaymateApplication[]> {
  if (USE_MOCK) {
    // Sử dụng mock data
    const applications = mockPlaymateApplications.filter(app => app.playmateSearchId === searchId);
    return Promise.resolve(applications);
  } else {
    // Sử dụng API thực tế
    try {
      const response = await fetch(`/api/playmate/searches/${searchId}/applications`);
      if (!response.ok) throw new Error(`Failed to fetch applications for search ${searchId}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching applications for search ${searchId}:`, error);
      throw error;
    }
  }
},

/**
 * Tạo đơn đăng ký mới
 */
async createApplication(applicationData: PlaymateApplication): Promise<PlaymateApplication> {
  if (USE_MOCK) {
    // Sử dụng mock data - chỉ giả lập
    const newApplication: PlaymateApplication = {
      ...applicationData, 
      id: Math.max(...mockPlaymateApplications.map(app => app.id)) + 1,
      createdAt: new Date().toISOString(),
    };
    return Promise.resolve(newApplication);
  } else {  
    // Sử dụng API thực tế  
    try {
      const response = await api.post('/playmate/application', applicationData);
      return response.data;
    } catch (error) {
      console.error('Error creating playmate application:', error);
      throw error;
    }
  }
},

/**
 * Chấp nhận đơn đăng ký
 */
async acceptApplication(applicationId: number): Promise<boolean> {
  if (USE_MOCK) {
    // Sử dụng mock data - chỉ giả lập
    console.log(`Accepting application with ID: ${applicationId}`);
    return Promise.resolve(true);
  } else {
    // Sử dụng API thực tế
    try {
      const response = await fetch(`/api/playmate/applications/${applicationId}/accept`, {
        method: 'PUT'
      });
      if (!response.ok) throw new Error(`Failed to accept application with id ${applicationId}`);
      return true;
    } catch (error) {
      console.error(`Error accepting application with id ${applicationId}:`, error);
      throw error;
    }
  }
},

/**
 * Từ chối đơn đăng ký
 */
async rejectApplication(applicationId: number, reason: string): Promise<boolean> {
  if (USE_MOCK) {
    // Sử dụng mock data - chỉ giả lập
    console.log(`Rejecting application with ID: ${applicationId}, reason: ${reason}`);
    return Promise.resolve(true);
  } else {
    // Sử dụng API thực tế
    try {
      const response = await fetch(`/api/playmate/applications/${applicationId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) throw new Error(`Failed to reject application with id ${applicationId}`);
      return true;
    } catch (error) {
      console.error(`Error rejecting application with id ${applicationId}:`, error);
      throw error;
    }
  }
},

/**
 * Hủy đơn đăng ký (người đăng ký tự hủy)
 */
async cancelApplication(applicationId: number): Promise<boolean> {
  if (USE_MOCK) {
    // Sử dụng mock data - chỉ giả lập
    console.log(`Cancelling application with ID: ${applicationId}`);
    return Promise.resolve(true);
  } else {
    // Sử dụng API thực tế
    try {
      const response = await fetch(`/api/playmate/applications/${applicationId}/cancel`, {
        method: 'PUT'
      });
      if (!response.ok) throw new Error(`Failed to cancel application with id ${applicationId}`);
      return true;
    } catch (error) {
      console.error(`Error cancelling application with id ${applicationId}:`, error);
      throw error;
    }
  }
}

}

export default playmateService;
