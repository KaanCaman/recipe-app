import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchCategories = createAsyncThunk<string[]>(
  'meals/fetchCategories',
  async () => {
    const response = await axios.get(`${BASE_URL}/list.php?c=list`);
    return response.data.meals.map((m: any) => m.strCategory);
  },
);

export const fetchAreas = createAsyncThunk<string[]>(
  'meals/fetchAreas',
  async () => {
    const response = await axios.get(`${BASE_URL}/list.php?a=list`);
    return response.data.meals.map((m: any) => m.strArea);
  },
);

export const fetchMealsByCategory = createAsyncThunk<any[], string>(
  'meals/fetchMealsByCategory',
  async category => {
    const response = await axios.get(
      `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
    );
    return response.data.meals;
  },
);

export const fetchMealsByFirstLetter = createAsyncThunk<any[], string>(
  'meals/fetchMealsByFirstLetter',
  async letter => {
    const response = await axios.get(
      `${BASE_URL}/search.php?f=${encodeURIComponent(letter)}`,
    );
    return response.data.meals || [];
  },
);

// Yeni eklenen search thunk
export const fetchMealsByName = createAsyncThunk<any[], string>(
  'meals/fetchMealsByName',
  async query => {
    const response = await axios.get(
      `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
    );
    return response.data.meals || [];
  },
);

interface MealsState {
  categories: string[];
  areas: string[];
  meals: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MealsState = {
  categories: [],
  areas: [],
  meals: [],
  status: 'idle',
  error: null,
};

export const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    clearMeals(state) {
      state.meals = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.status = 'succeeded';
          state.categories = action.payload;
        },
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchAreas.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchAreas.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.areas = action.payload;
        },
      )
      .addCase(fetchAreas.rejected, (state, action) => {
        state.error = action.error.message || null;
      })
      .addCase(fetchMealsByCategory.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchMealsByCategory.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.status = 'succeeded';
          state.meals = action.payload;
        },
      )
      .addCase(fetchMealsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchMealsByFirstLetter.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchMealsByFirstLetter.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.status = 'succeeded';
          state.meals = action.payload;
        },
      )
      .addCase(fetchMealsByFirstLetter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // Yeni eklenen search cases
      .addCase(fetchMealsByName.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchMealsByName.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.status = 'succeeded';
          state.meals = action.payload;
        },
      )
      .addCase(fetchMealsByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const {clearMeals} = mealsSlice.actions;
export default mealsSlice.reducer;
