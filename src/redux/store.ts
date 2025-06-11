// Configure Redux store with settings slice and others in future
import {configureStore} from '@reduxjs/toolkit';
import * as settingsReducer from './slice/settingsSlice';
import * as mealsReducer from './slice/mealSlice';
export const store = configureStore({
  reducer: {
    settings: settingsReducer.default,
    meals: mealsReducer.default,
    // add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
