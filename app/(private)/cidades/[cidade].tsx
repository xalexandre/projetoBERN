import { ActivityIndicator, StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import Cidade from "../../../models/Cidade";
import CityInfo from '../../../components/CityInfo';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import env from '../../../constants/env';
import { sendImmediateNotification } from '@/services/NotificationService';
import { useDispatch } from 'react-redux';
import { deleteCity } from '@/store/slices/citiesSlice';
import type { AppDispatch } from '@/store/store';

export default function CidadePage() {

    const { cidade: id } = useLocalSearchParams<{ cidade?: string }>();
    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();

    const [cidade, setCidade] = useState<Cidade | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<String | null>(null);
    const [isEditing, setEdiding] = useState(false);
    const apiUrl = env.DB_URL;
    const requestUri = `${apiUrl}/cities/${id}.json`;

    const handleDelete = async () => {
        if (!id) return;
        
        try {
            await dispatch(deleteCity(id)).unwrap();
            await sendImmediateNotification(
                'Cidade Removida 🗑️',
                `${cidade?.nome} foi removida da sua lista de destinos.`
            );
            router.push('/(private)');
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(
                'Erro',
                `Não foi possível excluir a cidade: ${err.message}`
            );
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir esta cidade?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    onPress: handleDelete,
                    style: 'destructive'
                }
            ]
        );
    };

    useEffect(() => {
        navigation.setOptions({
            title: `Cidade`,
            headerRight: () => {
                return (
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable 
                            style={{ marginHorizontal: 10 }} 
                            onPress={confirmDelete}
                        >
                            <Text>Excluir</Text>
                        </Pressable>
                        <Pressable 
                            style={{ marginHorizontal: 10 }} 
                            onPress={() => {
                                router.push(`/(private)/formCity?id=${id}`);
                            }}
                        >
                            <Text>Editar</Text>
                        </Pressable>
                    </View>
                )
            }
        });
    }, [navigation, id]);

    const getCityApi = async () => {
        setLoading(true);
        try {
            const response = await fetch(requestUri);
            const city = await response.json();
            setCidade(city);
        } catch (error) {
            const err = error as { message: string };
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCityApi();
    }, []);

    /* useEffect(() => {
        if (cidade?.nome) {
            navigation.setOptions({ title: `Cidade #${cidade.nome}` });
        }
    }, [cidade]); */

    return (
        <View style={styles.container}>
            {isLoading && <ActivityIndicator size='large' />}
            {!isLoading && message && <Text>{message}</Text>}
            {!isLoading && !isEditing && cidade && <CityInfo cidade={cidade} />}
            {/* {!isLoading && isEditing && cidade && ()} */}
            <View>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 15,
        flexDirection: 'row',
    }
});