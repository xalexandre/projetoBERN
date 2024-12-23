import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/store/slices/notificationsSlice';
import { registerForPushNotificationsAsync } from '@/services/NotificationService';

export function useNotifications() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const dispatch = useDispatch();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        console.log('Push Notification Token:', token);
      }
    }).catch(error => {
      console.warn('Erro ao registrar notificações:', error);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      const { title, body } = notification.request.content;
      dispatch(addNotification({
        id: notification.request.identifier,
        title: title || '',
        body: body || '',
        timestamp: Date.now(),
      }));
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // Aqui você pode lidar com a interação do usuário com a notificação
      console.log('Notification response:', response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
} 