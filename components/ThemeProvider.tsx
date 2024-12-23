import { Provider as PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { RootState } from '@/store/store';

// Customização dos temas
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#006d77',
    secondary: '#83c5be',
    // Adicione mais cores customizadas aqui
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#83c5be',
    secondary: '#006d77',
    // Adicione mais cores customizadas aqui
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
} 