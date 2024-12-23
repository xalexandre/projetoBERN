import { router } from "expo-router";
import { Alert, View, StyleSheet } from "react-native";
import { Text, FAB, Surface, useTheme, Divider, Button } from 'react-native-paper';
import env from '@/constants/env';
import { sendImmediateNotification } from '@/services/NotificationService';
import { useDispatch } from 'react-redux';
import { addCity, updateCity } from '@/store/slices/citiesSlice';
import type { AppDispatch } from '@/store/store';

interface ModalCityConfirmProps {
    id?: string;
    nome: string;
    pais: string;
    data: Date;
    passaporte: boolean;
    onDismiss?: () => void;
}

export default function ModalCityConfirm({ id, nome, pais, data, passaporte, onDismiss }: ModalCityConfirmProps) {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();

    const handleSave = async () => {
        try {
            if (id) {
                await dispatch(updateCity({ id, nome, pais })).unwrap();
            } else {
                await dispatch(addCity({ nome, pais })).unwrap();
            }

            await sendImmediateNotification(
                id ? 'Cidade Atualizada! 🌆' : 'Nova Cidade Adicionada! 🌆',
                id ? `${nome} foi atualizada com sucesso!` : `${nome} foi adicionada à sua lista de destinos.`
            );

            onDismiss?.();
            router.push('/(private)');
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(
                'Erro',
                `Não foi possível ${id ? 'atualizar' : 'salvar'} a cidade: ${err.message}`
            );
        }
    };

    return (
        <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <Text 
                variant="headlineMedium" 
                style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: 16 }}
            >
                Confirmar Dados da Cidade
            </Text>
            
            <Divider style={{ marginVertical: 8 }} />

            <View style={styles.content}>
                <View style={styles.infoRow}>
                    <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
                        Nome:
                    </Text>
                    <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
                        {nome}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
                        País:
                    </Text>
                    <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
                        {pais}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
                        Data:
                    </Text>
                    <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
                        {data.toLocaleDateString("pt-BR")}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
                        Passaporte:
                    </Text>
                    <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
                        {passaporte ? 'Sim' : 'Não'}
                    </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    mode="outlined"
                    onPress={onDismiss}
                    style={{ marginRight: 8 }}
                >
                    Cancelar
                </Button>
                <Button
                    mode="contained"
                    onPress={handleSave}
                >
                    Confirmar
                </Button>
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        padding: 16,
        borderRadius: 8,
        elevation: 4,
    },
    content: {
        marginVertical: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
});