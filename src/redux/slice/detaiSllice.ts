import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {firebaseService} from '../../service/firebaseService';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Meal detail fetch
export const fetchMealDetail = createAsyncThunk<any, string>(
  'details/fetchMealDetail',
  async mealId => {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${mealId}`);

    if (!response.data.meals || !response.data.meals[0]) {
      throw new Error('Meal not found');
    }

    return response.data.meals[0];
  },
);

// Check favorite status
export const checkFavoriteStatus = createAsyncThunk<boolean, string>(
  'details/checkFavoriteStatus',
  async mealId => {
    return await firebaseService.isFavorite(mealId);
  },
);

// Toggle favorite
export const toggleFavorite = createAsyncThunk<
  {mealId: string; isFavorite: boolean},
  {mealId: string; mealData: any}
>('details/toggleFavorite', async ({mealId, mealData}, {getState}) => {
  const state = getState() as any;
  const currentIsFavorite = state.details.isFavorite;

  if (currentIsFavorite) {
    await firebaseService.removeFromFavorites(mealId);
    return {mealId, isFavorite: false};
  } else {
    await firebaseService.addToFavorites(mealId, mealData);
    return {mealId, isFavorite: true};
  }
});

interface DetailsState {
  meal: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isFavorite: boolean;
  favoriteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: DetailsState = {
  meal: null,
  status: 'idle',
  error: null,
  isFavorite: false,
  favoriteStatus: 'idle',
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    clearDetails(state) {
      state.meal = null;
      state.status = 'idle';
      state.error = null;
      state.isFavorite = false;
      state.favoriteStatus = 'idle';
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch meal detail
      .addCase(fetchMealDetail.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchMealDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = 'succeeded';
          state.meal = action.payload;
        },
      )
      .addCase(fetchMealDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load meal details';
      })

      // Check favorite status
      .addCase(checkFavoriteStatus.pending, state => {
        state.favoriteStatus = 'loading';
      })
      .addCase(
        checkFavoriteStatus.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.favoriteStatus = 'succeeded';
          state.isFavorite = action.payload;
        },
      )
      .addCase(checkFavoriteStatus.rejected, state => {
        state.favoriteStatus = 'failed';
      })

      // Toggle favorite
      .addCase(toggleFavorite.pending, state => {
        state.favoriteStatus = 'loading';
      })
      .addCase(
        toggleFavorite.fulfilled,
        (
          state,
          action: PayloadAction<{mealId: string; isFavorite: boolean}>,
        ) => {
          state.favoriteStatus = 'succeeded';
          state.isFavorite = action.payload.isFavorite;
        },
      )
      .addCase(toggleFavorite.rejected, state => {
        state.favoriteStatus = 'failed';
      });
  },
});

export const {clearDetails, resetError} = detailsSlice.actions;
export default detailsSlice.reducer;
