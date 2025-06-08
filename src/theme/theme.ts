// Define light and dark color palettes and export Theme types
export const theme = {
  light: {
    colors: {
      primary: '#FF6B35',
      primaryLight: '#FF8A65',
      primaryDark: '#E55722',
      secondary: '#4CAF50',
      secondaryLight: '#81C784',
      accent: '#FFC107',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      surfaceVariant: '#F1F3F4',
      textPrimary: '#212121',
      textSecondary: '#757575',
      textTertiary: '#9E9E9E',
      border: '#E0E0E0',
      error: '#F44336',
      success: '#4CAF50',
      warning: '#FF9800',
    },
  },
  dark: {
    colors: {
      primary: '#FF8A65',
      primaryLight: '#FFAB91',
      primaryDark: '#FF6B35',
      secondary: '#81C784',
      secondaryLight: '#A5D6A7',
      accent: '#FFD54F',
      background: '#121212',
      surface: '#1E1E1E',
      surfaceVariant: '#2C2C2C',
      textPrimary: '#FFFFFF',
      textSecondary: '#B3B3B3',
      textTertiary: '#808080',
      border: '#404040',
      error: '#EF5350',
      success: '#66BB6A',
      warning: '#FFA726',
    },
  },
};

// Export TypeScript types for Theme
export type ThemeMode = keyof typeof theme;
export type ThemeColors = typeof theme.light.colors;
export type Theme = typeof theme.light;
