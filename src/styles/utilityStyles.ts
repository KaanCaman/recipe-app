// Define reusable layout and spacing utilities
import {StyleSheet} from 'react-native';

const {spacing, borderRadius, elevation} = {
  spacing: {xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64},
  borderRadius: {sm: 4, md: 8, lg: 12, xl: 16, xxl: 24, full: 9999},
  elevation: {none: 0, sm: 2, md: 4, lg: 8, xl: 12, xxl: 16},
};

export const utilityStyles = StyleSheet.create({
  roundedSm: {borderRadius: borderRadius.sm},
  roundedMd: {borderRadius: borderRadius.md},
  roundedLg: {borderRadius: borderRadius.lg},
  roundedFull: {borderRadius: borderRadius.full},

  shadowNone: {elevation: elevation.none},
  shadowSm: {elevation: elevation.sm},
  shadowMd: {elevation: elevation.md},

  flex: {flex: 1},
  flexRow: {flexDirection: 'row'},
  itemsCenter: {alignItems: 'center'},
  justifyBetween: {justifyContent: 'space-between'},

  m1: {margin: spacing.xs},
  m2: {margin: spacing.sm},
  m3: {margin: spacing.md},
  m4: {margin: spacing.lg},

  p1: {padding: spacing.xs},
  p2: {padding: spacing.sm},
  p3: {padding: spacing.md},
  p4: {padding: spacing.lg},

  // Add more utilities as needed
});
