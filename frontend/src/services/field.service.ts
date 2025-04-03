import api from './api';
import { FieldGroup, FieldGroupFormData } from '@/types/field.type';

// API Endpoints for Field and Field Group management
export const fieldService = { 
  // Get field groups by facility ID
  async getFieldGroupsByFacilityId(facilityId: string): Promise<FieldGroup[]> {
    try {
      const response = await api.get(`/field-group/${facilityId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching field groups:', error);
      throw error;
    }
  },

  // Create multiple field groups
  async createFieldGroups(facilityId: string, fieldGroups: FieldGroupFormData[]): Promise<{ message: string }> {
    try {
      const response = await api.put(`/field-group/${facilityId}`, { fieldGroups });
      return response.data;
    } catch (error) {
      console.error('Error creating field groups:', error);
      throw error;
    }
  },

  // Update field group
  async updateFieldGroup(fieldGroupId: string, fieldGroupData: Partial<FieldGroupFormData>): Promise<{ message: string }> {
    try {
      const response = await api.patch(`/field-group/${fieldGroupId}`, fieldGroupData);
      return response.data;
    } catch (error) {
      console.error('Error updating field group:', error);
      throw error;
    }
  },

  // Delete field group
  async deleteFieldGroup(fieldGroupId: string): Promise<{ message: string }> {
    try {
      const response = await api.delete(`/field-group/${fieldGroupId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting field group:', error);
      throw error;
    }
  },

  // Delete field
  async deleteField(fieldId: number): Promise<{ message: string }> {
    try {
      const response = await api.delete(`/field/${fieldId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting field:', error);
      throw error;
    }
  },

  // Create multiple fields for a field group
  async createFields(fieldGroupId: string, fields: { name: string }[]): Promise<{ message: string }> {
    try {
      const response = await api.put(`/field/${fieldGroupId}`, { fields });
      return response.data;
    } catch (error) {
      console.error('Error creating fields:', error);
      throw error;
    }
  }
};

export default api;