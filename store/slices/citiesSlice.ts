import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import env from '@/constants/env';
import Cidade from '@/models/Cidade';

interface CitiesState {
  cities: Cidade[];
  loading: boolean;
  error: string | null;
}

const initialState: CitiesState = {
  cities: [],
  loading: false,
  error: null,
};

// Buscar todas as cidades
export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async () => {
    const response = await fetch(env.API_GQL_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          {
            cities {
              id
              nome
              pais
              atualizado
            }
          }
        `
      })
    });

    const { data } = await response.json();
    return data.cities;
  }
);

// Deletar cidade
export const deleteCity = createAsyncThunk(
  'cities/deleteCity',
  async (id: string) => {
    await fetch(env.API_GQL_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          mutation($id: String!) {
            deleteCity(id: $id)
          }
        `,
        variables: { id }
      })
    });

    return id; // Retorna o ID para atualizar o estado
  }
);

// Adicionar cidade
export const addCity = createAsyncThunk(
  'cities/addCity',
  async (newCity: { nome: string; pais: string }) => {
    const response = await fetch(env.API_GQL_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          mutation($newCity: addCityInput) {
            addCity(newCity: $newCity) {
              id
              nome
              pais
              atualizado
            }
          }
        `,
        variables: { newCity }
      })
    });

    const { data } = await response.json();
    return data.addCity;
  }
);

// Atualizar cidade
export const updateCity = createAsyncThunk(
  'cities/updateCity',
  async (city: { id: string; nome: string; pais: string }) => {
    const response = await fetch(env.API_GQL_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          mutation($city: updateCityInput) {
            updateCity(city: $city) {
              id
              nome
              pais
              atualizado
            }
          }
        `,
        variables: { city }
      })
    });

    const { data } = await response.json();
    return data.updateCity;
  }
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cities
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
        state.error = null;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar cidades';
      })
      // Delete city
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.cities = state.cities.filter(city => city.id !== action.payload);
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.cities.push(action.payload);
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        const index = state.cities.findIndex(city => city.id === action.payload.id);
        if (index !== -1) {
          state.cities[index] = action.payload;
        }
      });
  },
});

export default citiesSlice.reducer; 