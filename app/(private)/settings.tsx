import { View } from 'react-native';
import { AppSettings } from '@/components/AppSettings';
import { useTheme } from '@react-navigation/native';

export default function SettingsScreen() {
    const theme = useTheme();
    
    return (
        <View style={{ flex: 1 }}>
            <AppSettings />
         </View>
    );
} 