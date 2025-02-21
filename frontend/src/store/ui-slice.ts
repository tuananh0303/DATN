import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isExpand: false
  },
  reducers: {
    expandSearchBar(state) {
      state.isExpand = true
    },
    shrinkSearchBar(state) {
      state.isExpand = false
    }
  }
})

export const uiAction = uiSlice.actions

export default uiSlice