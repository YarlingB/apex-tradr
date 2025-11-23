import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../app/theme/app-theme';

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.zincColors.zinc200,
    elevation: 2,
    shadowColor: COLORS.zincColors.zinc900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
