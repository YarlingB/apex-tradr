import { StyleSheet } from 'react-native';
import { COLORS } from '@app/theme/app-theme';

export const touchableOpacityStyles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
  },
  primary: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primaryColors.primary600,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.secondaryColors.secondary600,
  },
  outline: {
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});
