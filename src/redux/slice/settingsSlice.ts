// Redux slice to manage application settings, including theme mode
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeMode} from '../../theme/theme';

interface SettingsState {
  themeMode: ThemeMode;
}

const initialState: SettingsState = {
  themeMode: 'light',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
  },
});

export const {setThemeMode} = settingsSlice.actions;
export default settingsSlice.reducer;
