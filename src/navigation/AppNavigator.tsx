import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import DetailsScreen from '../screen/details/DetailsScreen';
import SplashScreen from '../screen/splash/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Details: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Splash">
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Main" component={TabNavigator} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
