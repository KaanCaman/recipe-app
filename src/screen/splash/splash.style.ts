import {StyleSheet} from 'react-native';
import {utilityStyles} from '../../styles/utilityStyles';

export const splashStyles = StyleSheet.create({
  container: {
    ...utilityStyles.flex,
    ...utilityStyles.itemsCenter,
    ...utilityStyles.justifyCenter,
    backgroundColor: '#E55722',
  },
  logo: {
    resizeMode: 'contain',
    width: 280,
    height: 280,
  },
  splashText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
});
