// src/redux/slices/pokemonSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PokemonState {
  allPokemons: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  allPokemons: [],
  loading: false,
  error: null,
};

export const fetchAllPokemons = createAsyncThunk(
  'pokemon/fetchAll',
  async (page: number = 1) => {
    const limit = 50;
    const offset = (page - 1) * limit;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return response.data.results;
  }
);


const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.allPokemons = action.payload;
      })
      .addCase(fetchAllPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pokemons';
      });
  },
});

export default pokemonSlice.reducer;
