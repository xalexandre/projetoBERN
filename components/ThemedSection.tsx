import { View, StyleSheet } from 'react-native';
import { Text, Surface, useTheme, Divider } from 'react-native-paper';

export function ThemedSection() {
  const theme = useTheme();

  return (
    <Surface 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.outline
        }
      ]}
    >
      <Text 
        variant="headlineMedium" 
        style={{ color: theme.colors.primary }}
      >
        Seção com Tema
      </Text>
      
      <Divider style={{ marginVertical: 8 }} />
      
      <Text 
        variant="bodyLarge"
        style={{ color: theme.colors.onBackground }}
      >
        Este é um exemplo de texto que usa as cores do tema atual.
      </Text>
      
      <View 
        style={[
          styles.highlight, 
          { 
            backgroundColor: theme.colors.primaryContainer,
            borderColor: theme.colors.primary
          }
        ]}
      >
        <Text 
          style={{ color: theme.colors.onPrimaryContainer }}
        >
          Conteúdo em destaque usando cores do tema
        </Text>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  highlight: {
    marginTop: 16,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
}); 