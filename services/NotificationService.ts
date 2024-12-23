import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Cidade from '@/models/Cidade';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  try {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync({
      projectId: process.env.EXPO_PROJECT_ID
    })).data;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  } catch (error) {
    console.error('Erro ao obter token:', error);
    return null;
  }
}

export async function scheduleTestNotification() {
  const { status } = await Notifications.getPermissionsAsync();
  
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      throw new Error('Permissão para notificações não concedida');
    }
  }

  console.log('Agendando notificação...');
  
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Nova Cidade Adicionada! 🌆",
      body: "Uma nova cidade foi adicionada à sua lista de destinos.",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });

  console.log('Notificação agendada com ID:', id);
  return id;
}

export async function sendImmediateNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { data: 'goes here' },
    },
    trigger: null, // Envia imediatamente
  });
}

export async function scheduleTripsReminders(cities: Cidade[]) {
    const { status } = await Notifications.getPermissionsAsync();
    
    if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
            return;
        }
    }

    // Cancela todos os lembretes anteriores
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Agenda novos lembretes para cada cidade
    for (const city of cities) {
        if (city.data) {
            const tripDate = new Date(city.data);
            const now = new Date();
            
            // Se a data da viagem ainda não passou
            if (tripDate > now) {
                // Lembrete 1 dia antes
                const oneDayBefore = new Date(tripDate);
                oneDayBefore.setDate(tripDate.getDate() - 1);
                
                if (oneDayBefore > now) {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: `Viagem para ${city.nome} Amanhã! 🧳`,
                            body: 'Prepare suas malas! Sua viagem começa amanhã.',
                        },
                        trigger: oneDayBefore,
                    });
                }

                // Lembrete uma semana antes
                const oneWeekBefore = new Date(tripDate);
                oneWeekBefore.setDate(tripDate.getDate() - 7);
                
                if (oneWeekBefore > now) {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: `Viagem para ${city.nome} em 1 Semana! ✈️`,
                            body: 'Comece a se preparar! Sua viagem está chegando.',
                        },
                        trigger: oneWeekBefore,
                    });
                }
            }
        }
    }
} 