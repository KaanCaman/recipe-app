import {StyleSheet} from 'react-native';
import {utilityStyles} from '../../styles/utilityStyles';

export const settingsStyles = StyleSheet.create({
  container: {
    ...utilityStyles.flex,
  },
  row: {
    ...utilityStyles.flexRow,
    ...utilityStyles.itemsCenter,
    ...utilityStyles.justifyBetween,
    ...utilityStyles.p3,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});
