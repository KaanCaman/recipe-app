import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

type Mode = 'dark' | 'light';

const DynamicStatusBar = () => {
  const {colors} = useTheme();

  const mode = useSelector(
    (state: RootState) => state.settings.themeMode,
  ) as Mode;

  return (
    <StatusBar
      backgroundColor={colors.background}
      barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
      animated={true}
      translucent={Platform.OS === 'android'}
    />
  );
};

export default DynamicStatusBar;
