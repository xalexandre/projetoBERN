import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import Cidade from '@/models/Cidade';
import { useState } from 'react';

interface CityCardProps {
  city: Cidade;
  onPress?: () => void;
}

export default function CityCard({ city, onPress }: CityCardProps) {
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={onPress || (() => router.push(`/cidades/${city.id}`))}
    >
      <Card.Cover 
        source={imageError ? require('@/assets/images/default-city.jpg') : { 
          uri: `https://picsum.photos/seed/${city.id}/400/200`,
          headers: {
            Accept: 'image/jpeg',
            'Cache-Control': 'no-cache'
          },
          cache: 'reload'
        }}
        style={styles.cardImage}
        onError={() => {
          setImageError(true);
        }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <ActivityIndicator 
          style={StyleSheet.absoluteFill} 
          color={theme.colors.primary}
        />
      )}
      <Card.Content style={styles.content}>
        <Text variant="titleLarge">{city.nome}</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          {city.pais}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 4,
  },
  cardImage: {
    height: 120,
  },
  content: {
    padding: 8,
  },
}); 