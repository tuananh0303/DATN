import { Facility, FacilityStatusChange, VerificationHistoryItem, FacilityFormData, License } from '@/types/facility.type';
import { mockFacilities, mockVerificationHistory } from '@/mocks/facility/mockFacilities';
import api from './api';

// Interface cho response khi gọi API với pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Interface cho response khi kiểm tra tên cơ sở
export interface FacilityNameCheckResponse {
  exists: boolean;
}

// Facility service with real API calls and fallback to mock data
class FacilityService {
  // Get all facilities owned by the user with pagination support
  async getMyFacilities(page: number = 1, pageSize: number = 10, status: string = 'all', query: string = ''): Promise<PaginatedResponse<Facility>> {
    try {
      // Get current user ID from local storage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Call real API
      const response = await api.get(`/facility/owner/${userId}`, {
        params: { page, pageSize, status: status !== 'all' ? status : undefined, query: query || undefined }
      });

      // Format the response to match our expected structure
      const facilities = response.data;
      return {
        data: facilities,
        total: facilities.length,
        page,
        pageSize
      };
    } catch (error) {
      console.error('API call failed, falling back to mock data:', error);
      
      // Fallback to mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          let filteredData = [...mockFacilities];
          
          // Apply filters
          if (status !== 'all') {
            filteredData = filteredData.filter(facility => facility.status === status);
          }
          
          // Apply search
          if (query) {
            const lowerCaseQuery = query.toLowerCase();
            filteredData = filteredData.filter(facility => 
              facility.name.toLowerCase().includes(lowerCaseQuery) || 
              facility.location.toLowerCase().includes(lowerCaseQuery)
            );
          }
          
          // Calculate total before pagination
          const total = filteredData.length;
          
          // Apply pagination
          const startIndex = (page - 1) * pageSize;
          const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
          
          resolve({
            data: paginatedData,
            total,
            page,
            pageSize
          });
        }, 500);
      });
    }
  }

  // Get a facility by ID
  async getFacilityById(id: string): Promise<Facility> {
    try {
      // Call real API
      const response = await api.get(`/facility/${id}`);
      return response.data;
    } catch (error) {
      console.error('API call failed, falling back to mock data:', error);
      
      // Fallback to mock data
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const facility = mockFacilities.find(facility => facility.id === id);
          
          if (facility) {
            resolve(facility);
          } else {
            reject(new Error('Facility not found'));
          }
        }, 500);
      });
    }
  }

  // Create a new facility - updated to accept FormData or FacilityFormData
  async createFacility(data: FormData | FacilityFormData): Promise<Facility> {
    // In a real implementation, would make API call to create facility
    // For mock, we just return the data with an ID
    return new Promise(resolve => {
      setTimeout(() => {
        // Handle different input types
        let facilityInfo;
        let certificate;
        let license: License[];
        
        if (data instanceof FormData) {
          // Extract data from FormData
          const facilityInfoJson = data.get('facilityInfo');
          facilityInfo = facilityInfoJson ? JSON.parse(facilityInfoJson.toString()) : {};
          certificate = { verified: '', temporary: 'temp-url' };
          license = [];
        } else {
          // Use FacilityFormData directly
          facilityInfo = data.facilityInfo;
          // Create certificate and license objects from file objects
          certificate = { 
            verified: '', 
            temporary: data.certificateFile ? URL.createObjectURL(data.certificateFile) : '' 
          };
          license = data.licenseFiles.map(licenseFile => ({
            verified: '',
            temporary: URL.createObjectURL(licenseFile.file),
            sportId: licenseFile.sportId
          }));
        }
        
        // Convert input data to Facility
        const newFacility = {
          id: `new-${Date.now()}`,
          name: facilityInfo.name,
          description: facilityInfo.description,
          location: facilityInfo.location,
          openTime1: facilityInfo.openTime1,
          closeTime1: facilityInfo.closeTime1,
          openTime2: facilityInfo.openTime2 || '',
          closeTime2: facilityInfo.closeTime2 || '',
          openTime3: facilityInfo.openTime3 || '',
          closeTime3: facilityInfo.closeTime3 || '',
          numberOfShifts: facilityInfo.numberOfShifts,
          sports: [], // Would be populated from API
          status: 'pending',
          avgRating: 0,
          numberOfRatings: 0,
          imagesUrl: [], // Would be populated from uploaded images URLs
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          certificate,
          license
        } as Facility;
        
        resolve(newFacility);
      }, 1000);
    });
  }
  
  // Upload facility images
  async uploadFacilityImages(facilityId: string, images: File[]): Promise<string[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Mock URLs for uploaded images
        const imageUrls = images.map((_, index) => 
          `https://example.com/facilities/${facilityId}/images/image${index + 1}.jpg`
        );
        resolve(imageUrls);
      }, 1000);
    });
  }
  
  // Upload certificate document - using the file parameter
  async uploadCertificate(facilityId: string, file: File): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Here we would actually use the file for upload
        console.log(`Uploading certificate file: ${file.name} for facility: ${facilityId}`);
        const url = `https://example.com/facilities/${facilityId}/certificates/cert-${Date.now()}.pdf`;
        resolve(url);
      }, 800);
    });
  }
  
  // Upload license document - using the file parameter
  async uploadLicense(facilityId: string, sportId: number, file: File): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Here we would actually use the file for upload
        console.log(`Uploading license file: ${file.name} for sport: ${sportId} in facility: ${facilityId}`);
        const url = `https://example.com/facilities/${facilityId}/licenses/sport-${sportId}-${Date.now()}.pdf`;
        resolve(url);
      }, 800);
    });
  }

  // Update an existing facility
  async updateFacility(id: string, facilityData: Partial<Facility>): Promise<Facility> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, this would call an API to update the facility
        console.log('Updated facility:', facilityData);
        
        // Mock response by combining with existing facility data
        const existingFacility = mockFacilities.find(f => f.id === id);
        const updatedFacility = {...existingFacility, ...facilityData, id} as Facility;
        
        resolve(updatedFacility);
      }, 500);
    });
  }

  // Delete a facility
  async deleteFacility(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, this would call an API to delete the facility
        console.log(`Deleted facility with ID: ${id}`);
        resolve();
      }, 500);
    });
  }

  // Get verification history for a facility
  async getFacilityVerificationHistory(id: string): Promise<VerificationHistoryItem[]> {
    const verificationData = mockVerificationHistory.find(item => item.facilityId === id);
    return Promise.resolve(verificationData?.history || []);
  }

  // Change status of a facility (active/inactive)
  async changeFacilityStatus(statusChange: FacilityStatusChange): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, this would call an API to change the status
        console.log('Status change request:', statusChange);
        resolve();
      }, 500);
    });
  }

  // Check if a facility name already exists
  async checkFacilityNameExists(name: string): Promise<FacilityNameCheckResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, this would call an API to check if the name exists
        const exists = mockFacilities.some(f => 
          f.name.toLowerCase() === name.toLowerCase());
        resolve({ exists });
      }, 300);
    });
  }
}

// Export instance of the service
export const facilityService = new FacilityService();