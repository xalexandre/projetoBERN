import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Surface, useTheme, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearNotifications } from '@/store/slices/notificationsSlice';

export function NotificationsList() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.notifications);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
          Notificações
        </Text>
        {notifications.length > 0 && (
          <IconButton
            icon="delete-sweep"
            onPress={() => dispatch(clearNotifications())}
            iconColor={theme.colors.error}
          />
        )}
      </View>
      
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Surface style={[styles.notification, { backgroundColor: theme.colors.elevation.level2 }]}>
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
              {item.title}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
              {item.body}
            </Text>
            <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>
              {formatTime(item.timestamp)}
            </Text>
          </Surface>
        )}
        ListEmptyComponent={
          <Text 
            style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}
          >
            Nenhuma notificação
          </Text>
        }
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  notification: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
  },
}); 