import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/store/slices/themeSlice';
import { RootState } from '@/store/store';

export function ThemeToggle() {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <IconButton
      icon={isDark ? 'weather-sunny' : 'weather-night'}
      onPress={() => dispatch(toggleTheme(!isDark))}
    />
  );
} 