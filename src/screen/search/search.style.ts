import {StyleSheet} from 'react-native';
import {utilityStyles} from '../../styles/utilityStyles';

export const searchStyles = StyleSheet.create({
  container: {
    ...utilityStyles.flex,
  },

  // Keyboard Avoiding Container
  keyboardContainer: {
    ...utilityStyles.flex,
  },

  // Content Container
  contentContainer: {
    ...utilityStyles.flex,
  },

  // Search Input Styles
  inputContainer: {
    ...utilityStyles.p2,
    ...utilityStyles.flexRow,
    ...utilityStyles.itemsCenter,
    ...utilityStyles.roundedMd,
    ...utilityStyles.m2,
    borderWidth: 1,
  },

  input: {
    ...utilityStyles.flex,
    fontSize: 16,
    paddingVertical: 8,
  },

  // List Styles
  list: {
    ...utilityStyles.flex,
  },

  listContainer: {
    ...utilityStyles.p2,
    paddingBottom: 16,
    gap: 8,
  },

  // Loading & Empty States
  loadingContainer: {
    ...utilityStyles.flex,
    ...utilityStyles.justifyCenter,
    ...utilityStyles.itemsCenter,
  },

  emptyContainer: {
    ...utilityStyles.flex,
    ...utilityStyles.justifyCenter,
    ...utilityStyles.itemsCenter,
    ...utilityStyles.p4,
  },

  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
