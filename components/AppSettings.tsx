import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { List, Switch, useTheme, Divider } from 'react-native-paper';
import { toggleTheme } from '@/store/slices/themeSlice';
import { clearNotifications } from '@/store/slices/notificationsSlice';

export function AppSettings() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const notificationsCount = useSelector((state: RootState) => state.notifications.notifications.length);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <List.Section>
                <List.Subheader>Aparência</List.Subheader>
                <List.Item
                    title="Tema Escuro"
                    left={props => <List.Icon {...props} icon="theme-light-dark" />}
                    right={props => (
                        <Switch
                            value={isDark}
                            onValueChange={() => {
                                dispatch(toggleTheme(!isDark));
                            }}
                        />
                    )}
                />
                <Divider />
                <List.Subheader>Notificações</List.Subheader>
                <List.Item
                    title="Limpar Notificações"
                    description={`${notificationsCount} notificações`}
                    left={props => <List.Icon {...props} icon="bell-remove" />}
                    onPress={() => dispatch(clearNotifications())}
                    disabled={notificationsCount === 0}
                />
            </List.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
}); 