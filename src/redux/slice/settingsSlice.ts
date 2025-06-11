import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from '../../utils/constants';
import {ThemeMode} from '../../theme/theme';

// Load stored theme or default to 'light'
export const initializeTheme = createAsyncThunk<ThemeMode>(
  'settings/initializeTheme',
  async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
    return stored === 'dark' || stored === 'light'
      ? (stored as ThemeMode)
      : 'light';
  },
);

// Change theme mode and persist it
export const changeThemeMode = createAsyncThunk<ThemeMode, ThemeMode>(
  'settings/changeThemeMode',
  async mode => {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
    return mode;
  },
);

interface SettingsState {
  themeMode: ThemeMode;
}

const initialState: SettingsState = {
  themeMode: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initializeTheme.fulfilled, (state, action) => {
      state.themeMode = action.payload;
    });
    builder.addCase(changeThemeMode.fulfilled, (state, action) => {
      state.themeMode = action.payload;
    });
  },
});

export default settingsSlice.reducer;
