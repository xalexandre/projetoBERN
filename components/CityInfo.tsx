import { StyleSheet, View } from 'react-native';
import { Text, Surface, useTheme, Divider } from 'react-native-paper';
import Cidade from '@/models/Cidade';

interface CityInfoProps {
    cidade: Cidade;
}

export default function CityInfo({ cidade }: CityInfoProps) {
    const theme = useTheme();

    return (
        <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <Text 
                variant="headlineMedium" 
                style={{ color: theme.colors.primary }}
            >
                {cidade.nome}
            </Text>
            
            <Divider style={{ marginVertical: 8 }} />
            
            <View style={styles.infoRow}>
                <Text 
                    variant="titleMedium"
                    style={{ color: theme.colors.secondary }}
                >
                    País:
                </Text>
                <Text style={{ color: theme.colors.onSurface }}>
                    {cidade.pais}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text 
                    variant="titleMedium"
                    style={{ color: theme.colors.secondary }}
                >
                    Data:
                </Text>
                <Text style={{ color: theme.colors.onSurface }}>
                    {cidade.data ? new Date(cidade.data).toLocaleDateString() : '-'}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text 
                    variant="titleMedium"
                    style={{ color: theme.colors.secondary }}
                >
                    Passaporte:
                </Text>
                <Text style={{ color: theme.colors.onSurface }}>
                    {cidade.passaporte ? 'Sim' : 'Não'}
                </Text>
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        padding: 16,
        borderRadius: 8,
        elevation: 4,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
});