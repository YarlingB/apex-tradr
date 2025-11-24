import { StyleSheet } from 'react-native';
import { COLORS } from '@app/theme/app-theme';

export const typographyStyles = StyleSheet.create({
  sm: {
    fontSize: 12,
    color: COLORS.primaryColors.primary900,
    fontWeight: '400',
  },
  md: {
    fontSize: 14,
    color: COLORS.primaryColors.primary900,
    fontWeight: '500',
  },
  lg: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.primaryColors.primary900,
  },
  xl: {
    fontSize: 20,
    color: COLORS.primaryColors.primary900,
    fontWeight: '700',
  },
  '2xl': {
    fontSize: 24,
    color: COLORS.primaryColors.primary900,
    fontWeight: '800',
  },
});
