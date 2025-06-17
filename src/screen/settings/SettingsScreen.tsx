import React from 'react';
import {View, Text, Switch} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '../../hooks/useTheme';
import {changeThemeMode} from '../../redux/slice/settingsSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {settingsStyles} from './settings.style';
import {SafeAreaView} from 'react-native-safe-area-context';

type Mode = 'light' | 'dark';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {colors} = useTheme();
  const themeMode = useSelector(
    (state: RootState) => state.settings.themeMode,
  ) as Mode;

  const onToggle = (value: boolean) => {
    dispatch(changeThemeMode(value ? 'dark' : 'light'));
  };

  return (
    <SafeAreaView
      style={[settingsStyles.container, {backgroundColor: colors.background}]}>
      <View style={settingsStyles.row}>
        <Text style={[settingsStyles.label, {color: colors.textPrimary}]}>
          Dark Mode
        </Text>
        <Switch
          value={themeMode === 'dark'}
          onValueChange={onToggle}
          trackColor={{true: colors.primary, false: colors.border}}
          thumbColor={colors.surface}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
