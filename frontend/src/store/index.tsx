import { configureStore } from '@reduxjs/toolkit'
import demoSlice from '@/store/demo-slice'

const store = configureStore({
  reducer: {
    'demo': demoSlice.reducer
  }
})


export default store