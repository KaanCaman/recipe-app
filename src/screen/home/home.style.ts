import {StyleSheet} from 'react-native';
import {utilityStyles} from '../../styles/utilityStyles';

export const homeStyles = StyleSheet.create({
  container: {
    ...utilityStyles.flex,
  },

  // Alphabet Filter Styles
  alphabetList: {
    flexGrow: 0,
    maxHeight: 50,
  },

  alphabetContainer: {
    gap: 4,
  },

  letterButton: {
    ...utilityStyles.m1,
    ...utilityStyles.roundedLg,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  letterText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Meals List Styles
  mealsList: {
    ...utilityStyles.flex,
  },

  mealsContainer: {
    ...utilityStyles.p2,
    paddingBottom: 16,
    gap: 8,
  },

  // Loading Styles
  loadingContainer: {
    ...utilityStyles.flex,
    ...utilityStyles.justifyCenter,
    ...utilityStyles.itemsCenter,
  },
});
