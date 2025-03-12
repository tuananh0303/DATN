import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit';
import { facilityService } from '@/services/facility.service';
import { FacilityFormData, FieldGroupData } from '@/pages/Owner/FacilityManager/CreateFacility/interfaces/facility';
import { INITIAL_FORM_DATA } from '@/pages/Owner/FacilityManager/CreateFacility/constants/sportTypes';


// Keep the Facility interface as is
interface Facility {
  id: string;
  name: string;
  description: string;
  openTime: string;
  closeTime: string;
  location: string;
  status: string;
  avgRating: number;
  quantityRating: number;
  imageUrl: string[];
}

// Update the FacilityState to remove coverImage and use images array
interface FacilityState {
  facility: Facility | null;
  loading: boolean;
  error: string | null;
  currentStep: number;
  formData: FacilityFormData;
  selectedSports: number[];
  fieldGroups: { [key: string]: FieldGroupData[] };
  // Instead of storing File objects, store file metadata
  imageMetadata: { name: string; size: number; type: string }[];
  imagesPreview: string[];
  createdFacilityId: string | null;
}

// Initial state
const initialState: FacilityState = {
  facility: null,
  loading: false,
  error: null,
  currentStep: 1,
  formData: INITIAL_FORM_DATA,
  selectedSports: [],
  fieldGroups: {},
  imageMetadata: [], // Store metadata instead of File objects
  imagesPreview: [],
  createdFacilityId: null
};

// // Update the prepareFieldGroupsData function to match the API requirements

// const prepareFieldGroupsData = (fieldGroups: { [key: string]: FieldGroupData[] }) => {
//   const fieldGroupsData = [];
  
//   for (const sportId in fieldGroups) {
//     for (const group of fieldGroups[sportId]) {
//       fieldGroupsData.push({
//         name: group.name,
//         dimension: group.dimension,
//         surface: group.surface,
//         basePrice: Number(group.basePrice),
//         peakStartTime: group.peakStartTime,
//         peakEndTime: group.peakEndTime,
//         priceIncrease: Number(group.priceIncrease),
//         sportIds: [Number(sportId)],
//         fieldsData: group.fieldsData.map(field => ({ name: field.name }))
//       });
//     }
//   }
  
//   return fieldGroupsData;
// };

// Update the addImage action

export const addImageMetadata = createAction<{ 
  name: string; 
  size: number; 
  type: string;
  preview: string 
}>('facility/addImageMetadata');

// Update the createFacility thunk to accept the FormData directly
export const createFacility = createAsyncThunk(
  'facility/createFacility',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await facilityService.createFacility(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create facility');
    }
  }
);

// Slice definition
const facilitySlice = createSlice({
  name: 'facility',
  initialState,
  reducers: {
    addImageMetadata: (state, action: PayloadAction<{ name: string; size: number; type: string; preview: string }>) => {
      state.imageMetadata.push({
        name: action.payload.name,
        size: action.payload.size,
        type: action.payload.type
      });
      state.imagesPreview.push(action.payload.preview);
    },
    removeImageMetadata: (state, action: PayloadAction<number>) => {
      state.imageMetadata = state.imageMetadata.filter((_, index) => index !== action.payload);
      state.imagesPreview = state.imagesPreview.filter((_, index) => index !== action.payload);
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<FacilityFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateFacilityInfo: (state, action: PayloadAction<any>) => {
      state.formData.facilityInfo = { ...state.formData.facilityInfo, ...action.payload };
    },
    setSelectedSports: (state, action: PayloadAction<number[]>) => {
      state.selectedSports = action.payload;
    },
    updateFieldGroups: (state, action: PayloadAction<{ [key: string]: FieldGroupData[] }>) => {
      state.fieldGroups = action.payload;
    },
    addFieldGroup: (state, action: PayloadAction<{ sportId: string, fieldGroup: FieldGroupData }>) => {
      const { sportId, fieldGroup } = action.payload;
      if (!state.fieldGroups[sportId]) {
        state.fieldGroups[sportId] = [];
      }
      state.fieldGroups[sportId].push(fieldGroup);
    },
    updateFieldGroup: (state, action: PayloadAction<{ sportId: string, index: number, fieldGroup: FieldGroupData }>) => {
      const { sportId, index, fieldGroup } = action.payload;
      if (state.fieldGroups[sportId] && state.fieldGroups[sportId][index]) {
        state.fieldGroups[sportId][index] = fieldGroup;
      }
    },
    resetFacilityForm: (state) => {
      state.currentStep = 1;
      state.formData = INITIAL_FORM_DATA;
      state.selectedSports = [];
      state.fieldGroups = {};
      state.imageMetadata = [];
      state.imagesPreview = [];
      state.createdFacilityId = null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createFacility.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createFacility.fulfilled, (state, action) => {
      state.loading = false;
      state.createdFacilityId = action.payload.id;
      // Reset form after successful creation
      state.currentStep = 1;
      state.formData = INITIAL_FORM_DATA;
      state.selectedSports = [];
      state.fieldGroups = {};
      state.imageMetadata = [];
      state.imagesPreview = [];
    })
    .addCase(createFacility.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { 
  setCurrentStep, 
  updateFormData, 
  updateFacilityInfo, 
  removeImageMetadata,
  setSelectedSports, 
  updateFieldGroups,
  addFieldGroup,
  updateFieldGroup,
  resetFacilityForm
} = facilitySlice.actions;

export default facilitySlice.reducer;