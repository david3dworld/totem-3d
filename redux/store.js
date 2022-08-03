import { configureStore } from '@reduxjs/toolkit'
import auth from './authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}
const authReducer = persistReducer(persistConfig, auth)

const store = configureStore({
  reducer: authReducer,
})
export const persistor = persistStore(store);
export default store