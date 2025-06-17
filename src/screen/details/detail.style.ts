import {StyleSheet} from 'react-native';
import {utilityStyles} from '../../styles/utilityStyles';

export const detailStyles = StyleSheet.create({
  container: {
    ...utilityStyles.flex,
  },

  // FlatList Container
  flatListContainer: {
    flexGrow: 1,
  },

  // Loading & Error States
  loadingContainer: {
    ...utilityStyles.flex,
    ...utilityStyles.justifyCenter,
    ...utilityStyles.itemsCenter,
  },

  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },

  errorContainer: {
    ...utilityStyles.flex,
    ...utilityStyles.justifyCenter,
    ...utilityStyles.itemsCenter,
    ...utilityStyles.p4,
  },

  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },

  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    ...utilityStyles.roundedMd,
  },

  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Header
  header: {
    ...utilityStyles.flexRow,
    ...utilityStyles.justifyBetween,
    ...utilityStyles.itemsCenter,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...utilityStyles.shadowSm,
  },

  backButton: {
    padding: 8,
    ...utilityStyles.roundedFull,
  },

  favoriteButton: {
    padding: 12,
    ...utilityStyles.roundedFull,
    ...utilityStyles.shadowSm,
  },

  // Hero Image
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },

  // Content
  content: {
    ...utilityStyles.p3,
  },

  // Title
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 34,
  },

  // Tags
  tagsContainer: {
    ...utilityStyles.flexRow,
    marginBottom: 20,
    gap: 8,
  },

  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    ...utilityStyles.roundedFull,
  },

  tagText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },

  // Meta Info
  metaContainer: {
    ...utilityStyles.flexRow,
    marginBottom: 24,
    gap: 24,
  },

  metaItem: {
    ...utilityStyles.flexRow,
    ...utilityStyles.itemsCenter,
    gap: 8,
  },

  metaText: {
    fontSize: 16,
    fontWeight: '500',
  },

  // Sections
  section: {
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  // Ingredients
  ingredientItem: {
    ...utilityStyles.flexRow,
    ...utilityStyles.itemsCenter,
    marginBottom: 12,
    gap: 12,
    paddingHorizontal: 16,
  },

  bullet: {
    width: 8,
    height: 8,
    ...utilityStyles.roundedFull,
  },

  ingredientText: {
    fontSize: 16,
    lineHeight: 24,
    ...utilityStyles.flex,
  },

  // Instructions
  instructionItem: {
    ...utilityStyles.flexRow,
    marginBottom: 16,
    gap: 12,
    paddingHorizontal: 16,
  },

  stepNumber: {
    width: 32,
    height: 32,
    ...utilityStyles.roundedFull,
    ...utilityStyles.justifyCenter,
    ...utilityStyles.itemsCenter,
    marginTop: 2,
  },

  stepNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  instructionText: {
    fontSize: 16,
    lineHeight: 24,
    ...utilityStyles.flex,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 32,
  },
  instructionHeader: {
    paddingTop: 0,
  },
});
