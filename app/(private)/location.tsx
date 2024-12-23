import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, useTheme, ActivityIndicator, FAB } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import env from '@/constants/env';
import Cidade from '@/models/Cidade';

export default function LocationScreen() {
    const theme = useTheme();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [isLoading, setLoading] = useState(false);

    const getCitiesApi = async () => {
        setLoading(true);
        try {
            const apiGqlUrl = env.API_GQL_URL;
            const response = await fetch(apiGqlUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `query {
                        cities {
                          id
                          nome
                          pais
                          atualizado
                        }
                      }`,
                })
            });
            const { data } = await response.json();
            setCidades(data.cities);
        } catch (error) {
            const err = error as { message: string };
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            getCitiesApi();
        })();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {isLoading && (
                <ActivityIndicator 
                    size="large" 
                    color={theme.colors.primary}
                    style={styles.loading} 
                />
            )}
            
            {errorMsg && (
                <Text 
                    style={[styles.error, { color: theme.colors.error }]}
                >
                    {errorMsg}
                </Text>
            )}

            {location && (
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="Sua localização"
                            pinColor={theme.colors.primary}
                        />
                        {cidades.map((cidade) => (
                            <Marker
                                key={cidade.id}
                                coordinate={{
                                    latitude: -23.5505, // Exemplo - você precisará adicionar coordenadas reais
                                    longitude: -46.6333,
                                }}
                                title={cidade.nome}
                                description={cidade.pais}
                                pinColor={theme.colors.secondary}
                            />
                        ))}
                    </MapView>
                </View>
            )}

            <FAB
                icon="arrow-left"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                onPress={() => router.back()}
                color={theme.colors.onPrimary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        padding: 16,
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
    },
});