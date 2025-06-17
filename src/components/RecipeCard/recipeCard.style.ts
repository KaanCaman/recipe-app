import {StyleSheet} from 'react-native';
import {utilityStyles} from '../../styles/utilityStyles';

export const recipeCardStyles = StyleSheet.create({
  card: {
    ...utilityStyles.roundedMd,
    ...utilityStyles.shadowSm,
    ...utilityStyles.m2,
    backgroundColor: '#FFF',
  },
  image: {
    width: '100%',
    height: 150,
    ...utilityStyles.roundedMd,
  },
  content: {
    ...utilityStyles.p2,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  infoRow: {
    ...utilityStyles.flexRow,
    ...utilityStyles.justifyBetween,
  },
  infoText: {
    fontSize: 14,
  },
});
