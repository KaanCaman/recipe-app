import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {firebaseService} from '../../service/firebaseService';

// Fetch favorites
export const fetchFavorites = createAsyncThunk<any[]>(
  'favorites/fetchFavorites',
  async () => {
    return await firebaseService.getFavorites();
  },
);

// Remove from favorites
export const removeFromFavorites = createAsyncThunk<string, string>(
  'favorites/removeFromFavorites',
  async mealId => {
    await firebaseService.removeFromFavorites(mealId);
    return mealId;
  },
);

interface FavoritesState {
  favorites: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  removeStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: FavoritesState = {
  favorites: [],
  status: 'idle',
  error: null,
  removeStatus: 'idle',
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<any[]>) {
      state.favorites = action.payload;
      state.status = 'succeeded';
    },
    clearFavorites(state) {
      state.favorites = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch favorites
      .addCase(fetchFavorites.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.status = 'succeeded';
          state.favorites = action.payload;
        },
      )
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load favorites';
      })

      // Remove from favorites
      .addCase(removeFromFavorites.pending, state => {
        state.removeStatus = 'loading';
      })
      .addCase(
        removeFromFavorites.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.removeStatus = 'succeeded';
          // Remove from local state immediately for better UX
          state.favorites = state.favorites.filter(
            fav => fav.mealId !== action.payload,
          );
        },
      )
      .addCase(removeFromFavorites.rejected, state => {
        state.removeStatus = 'failed';
      });
  },
});

export const {setFavorites, clearFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;
