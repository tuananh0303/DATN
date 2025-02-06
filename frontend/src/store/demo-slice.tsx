import { createSlice } from '@reduxjs/toolkit'

const demoSlice = createSlice({
  name: 'demo',
  initialState: {
    counter: 0
  },
  reducers: {
    decrement(state) {
      state.counter--
    },
    increment(state) {
      state.counter++
    }
  }
})

export const demoAction = demoSlice.actions

export default demoSlice