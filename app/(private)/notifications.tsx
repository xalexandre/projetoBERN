import { View } from 'react-native';
import { NotificationsList } from '@/components/NotificationsList';

export default function NotificationsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <NotificationsList />
    </View>
  );
} 