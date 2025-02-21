import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './ui-slice'

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer
  }
})

export type RootState = {
  ui: {
    isExpand: boolean
  }
}

export default store