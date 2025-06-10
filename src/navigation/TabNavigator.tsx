import React, {useCallback} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useTheme} from '../hooks/useTheme';
import {utilityStyles} from '../styles/utilityStyles';

import {Heart, Home, Search, Settings} from 'lucide-react-native';
import HomeScreen from '../screen/home/HomeScreen';
import SearchScreen from '../screen/search/SearchScreen';
import FavoritesScreen from '../screen/favorites/FavoritesScreen';
import SettingsScreen from '../screen/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {colors} = useTheme();

  const screenOptions = useCallback(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textTertiary,
      tabBarStyle: [
        utilityStyles.shadowSm,
        {backgroundColor: colors.surface, height: 80},
      ],
    }),
    [colors.primary, colors.textTertiary, colors.surface],
  );

  const homeIcon = useCallback(
    ({color, size}: {color: string; size: number}) => (
      <Home size={size} color={color} />
    ),
    [],
  );
  const searchIcon = useCallback(
    ({color, size}: {color: string; size: number}) => (
      <Search size={size} color={color} />
    ),
    [],
  );
  const favoritesIcon = useCallback(
    ({color, size}: {color: string; size: number}) => (
      <Heart size={size} color={color} />
    ),
    [],
  );
  const settingsIcon = useCallback(
    ({color, size}: {color: string; size: number}) => (
      <Settings size={size} color={color} />
    ),
    [],
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: homeIcon,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: searchIcon,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: favoritesIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: settingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
