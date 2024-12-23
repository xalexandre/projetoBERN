import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import env from '@/constants/env';

const httpLink = createHttpLink({
  uri: env.API_GQL_URL,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

// Definindo as queries e mutations que serão usadas
export const QUERIES = {
  GET_CITIES: `
    query GetCities {
      cities {
        id
        nome
        pais
        atualizado
      }
    }
  `,
};

export const MUTATIONS = {
  ADD_CITY: `
    mutation($newCity: addCityInput) {
      addCity(newCity: $newCity) {
        id
        nome
        pais
        atualizado
      }
    }
  `,
  UPDATE_CITY: `
    mutation($city: updateCityInput) {
      updateCity(city: $city) {
        id
        nome
        pais
        atualizado
      }
    }
  `,
  DELETE_CITY: `
    mutation($id: String!) {
      deleteCity(id: $id)
    }
  `,
}; 