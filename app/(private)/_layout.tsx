import { View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeToggle } from '@/components/ThemeToggle';
import { IconButton } from 'react-native-paper';
import { useNotifications } from '@/hooks/useNotifications';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';

export default function PrivateLayout() {
  const theme = useTheme();
  const router = useRouter();

  useNotifications();

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { color: theme.colors.primary },
        headerTitle: "Minhas Cidades",
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton
              icon="home"
              onPress={() => router.push('/(private)')}
            />
            <IconButton
              icon="bell"
              onPress={() => router.push('/notifications')}
            />
            <IconButton
              icon="cog"
              onPress={() => router.push('/settings')}
            />
            <ThemeToggle />
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Minhas Cidades" }}
      />
      <Stack.Screen
        name="notifications"
        options={{ headerTitle: "Notificações" }}
      />
      <Stack.Screen
        name="settings"
        options={{ headerTitle: "Configurações" }}
      />
      <Stack.Screen
        name="formCity"
        options={({ route }: { route: { params?: { id?: string } } }) => ({ 
          headerTitle: route.params?.id ? "Editar Cidade" : "Nova Cidade"
        })}
      />
    </Stack>
  );
}
