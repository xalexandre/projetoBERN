import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Cidade from '@/models/Cidade';
import CityCard from './CityCard';
import { useState, useCallback } from 'react';

interface CitiesListProps {
    cidades: Cidade[];
    onSelected: (cidade: Cidade) => void;
    refreshingAction: () => void;
}

export default function CitiesList({ cidades, onSelected, refreshingAction }: CitiesListProps) {
    const theme = useTheme();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refreshingAction();
        setRefreshing(false);
    }, []);

    return (
        <FlatList
            data={cidades}
            renderItem={({ item }) => (
                <CityCard 
                    city={item} 
                    onPress={() => onSelected(item)}
                />
            )}
            keyExtractor={item => item.id}
            style={[styles.list, { backgroundColor: theme.colors.background }]}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[theme.colors.primary]}
                    tintColor={theme.colors.primary}
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
});