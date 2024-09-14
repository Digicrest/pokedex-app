// src/redux/slices/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    favorites: string[];
}

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<string>) {
            const index = state.favorites.indexOf(action.payload);
            if (index >= 0) {
                state.favorites.splice(index, 1);
            } else {
                state.favorites.push(action.payload);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
