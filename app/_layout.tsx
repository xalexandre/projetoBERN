import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Slot } from 'expo-router';
import UserProvider from '@/store/UserStore';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Comfortaa': require('../assets/fonts/Comfortaa-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider>
          <UserProvider>
            <Slot />
          </UserProvider>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}
