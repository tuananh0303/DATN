import { createSlice } from '@reduxjs/toolkit';
import { 
  FacilityState,
} from '@/types/facility.type';


const initialState: FacilityState = {
  facility: null,
  isLoading: false,
  error: null,
}


// Slice definition
const facilitySlice = createSlice({
  name: 'facility',
  initialState,
  reducers: {      
    
  },
  extraReducers: () => {      
  }
});

const { 
  setFacility,
  setLoading,
  setError
} = facilitySlice.actions;


export default facilitySlice.reducer;