import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, Pressable, FlatList } from 'react-native';
import Cidade from "@/models/Cidade";
import CitiesList from '@/components/CitiesList';
import CityInfo from '@/components/CityInfo';
import { router } from 'expo-router';
import { CitiesContext, CitiesContextState } from '@/context/CitiesContext';
import { useSQLiteContext } from 'expo-sqlite';
import { SELECT_ALL_CITIES } from '@/database/AppDatabase';
import { UserContext } from '@/store/UserStore';
import env from '@/constants/env';
import { ActivityIndicator, FAB, Text, useTheme } from 'react-native-paper';
import CityCard from '@/components/CityCard';
import { scheduleTripsReminders } from '@/services/NotificationService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '@/store/slices/citiesSlice';
import type { RootState, AppDispatch } from '@/store/store';

export default function PrivateScreen() {
    const theme = useTheme();
    const { width, height } = useWindowDimensions();
    const isPortrait = width < height;

    const dispatch = useDispatch<AppDispatch>();
    const { cities, loading, error } = useSelector((state: RootState) => state.cities);

    useEffect(() => {
        dispatch(fetchCities());
    }, [dispatch]);

    const [cidade, setCidade] = useState<Cidade | null>(null);

    const exemplo = {
        query: `
            query: { 
                city(id: '4', nome: 'null') { nome  pais } 
                pointsOfCity(cityId: '4') { 
                    id nome preco 
                } 
            }`
    };

    const selecionarCidade = (cidade: Cidade) => {
        if (isPortrait)
            router.push(`/cidades/${cidade.id}`);
        else
            setCidade(cidade);
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={isPortrait ? styles.containerListPortaint : styles.containerListLandscape}>
                <Text variant='displaySmall'>Cidades</Text>

                {loading && <ActivityIndicator size={100} color={theme.colors.primary} />}
                {error && <Text variant='titleSmall' style={{ color: theme.colors.error }}>{error}</Text>}

                {!loading && cities &&
                    <FlatList
                        data={cities}
                        renderItem={({ item }) => <CityCard city={item} />}
                        keyExtractor={(item: Cidade, index: number) => item.id ?? index.toString()}
                        style={[styles.list, { backgroundColor: theme.colors.background }]}
                    />
                }

                <FAB style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                    icon="plus"
                    onPress={() => {
                        router.push('/(private)/formCity');
                    }}
                    color={theme.colors.onPrimary}
                />
                <FAB style={{ width: 50, position: 'absolute', bottom: 16, right: 16, 
                backgroundColor: '#80ed99' }} icon="map-marker" onPress={() => {
                    router.push('/(private)/location');
                }} />
            </View>
            {!isPortrait && cidade && <CityInfo cidade={cidade} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    list: {
        flex: 1,
    },
    containerListPortaint: {
        width: "100%",
    },
    containerListLandscape: {
        width: "30%",
    },
    fabToLocation: {
        position: 'absolute',
        right: 10,
        bottom: 20,
        backgroundColor: "#7cb518",
        padding: 10,
        borderRadius: 50,
    },
    fabToForm: {
        position: 'absolute',
        right: 10,
        bottom: 80,
        backgroundColor: "#023047",
        padding: 10,
        borderRadius: 50,
    },
    fabToLocationLabel: {
        fontSize: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 80,
        bottom: 0,
    },
});