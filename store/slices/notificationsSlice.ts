import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
}

interface NotificationsState {
  token: string | null;
  notifications: Notification[];
  permission: boolean;
}

const initialState: NotificationsState = {
  token: null,
  notifications: [],
  permission: false,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setPermission: (state, action: PayloadAction<boolean>) => {
      state.permission = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { 
  setToken, 
  setPermission, 
  addNotification, 
  clearNotifications 
} = notificationsSlice.actions;

export default notificationsSlice.reducer; 