import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screen/details/DetailsScreen';
import TabNavigator from './TabNavigator';
import {Provider} from 'react-redux';
import {store} from '../redux/store';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen name="Back" component={TabNavigator} />
        <Stack.Screen name="Profile" component={DetailsScreen} />
      </Stack.Navigator>
    </Provider>
  );
}

export default AppNavigator;
