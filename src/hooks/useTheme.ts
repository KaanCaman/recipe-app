// Hook to select current theme mode and return the corresponding colors
import {useSelector} from 'react-redux';
import {theme, ThemeColors, ThemeMode} from '../theme/theme';
import {RootState} from '../redux/store';

export const useTheme = (): {colors: ThemeColors} => {
  const mode = useSelector<RootState, ThemeMode>(
    state => state.settings.themeMode,
  );
  return {colors: theme[mode].colors};
};
