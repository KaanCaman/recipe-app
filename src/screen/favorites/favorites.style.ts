import {StyleSheet} from 'react-native';
import {utilityStyles} from '../../styles/utilityStyles';

export const favoritesStyles = StyleSheet.create({
  container: {
    ...utilityStyles.flex,
  },

  // List Container
  listContainer: {
    flexGrow: 1,
    ...utilityStyles.p2,
  },

  // Header
  header: {
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 16,
  },

  // Card Container
  cardContainer: {
    position: 'relative',
  },

  // Remove Button
  removeButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    ...utilityStyles.roundedMd,
    ...utilityStyles.shadowSm,
    ...utilityStyles.flexRow,
    ...utilityStyles.itemsCenter,
    gap: 4,
    zIndex: 1,
  },

  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Center States
  centerContainer: {
    ...utilityStyles.flex,
    ...utilityStyles.justifyCenter,
    ...utilityStyles.itemsCenter,
    ...utilityStyles.p4,
    gap: 16,
  },

  centerText: {
    fontSize: 16,
    textAlign: 'center',
  },

  // Error State
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },

  retryButton: {
    ...utilityStyles.flexRow,
    ...utilityStyles.itemsCenter,
    paddingHorizontal: 20,
    paddingVertical: 12,
    ...utilityStyles.roundedMd,
    gap: 8,
  },

  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Empty State
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },

  // Separator
  separator: {
    height: 16,
  },
});
