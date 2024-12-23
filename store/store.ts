import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import notificationsReducer from './slices/notificationsSlice';
import citiesReducer from './slices/citiesSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    notifications: notificationsReducer,
    cities: citiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 