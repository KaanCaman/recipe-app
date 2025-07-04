import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import DynamicStatusBar from './src/components/DynamicStatusBar/DynamicStatusBar';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DynamicStatusBar />
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
