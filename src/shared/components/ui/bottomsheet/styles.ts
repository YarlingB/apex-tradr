import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHT } from '@shared/constants/app';
import { COLORS } from '@app/theme/app-theme';

export const bottomsheetStyles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.slateColors.slate950,
  },
  keyboardView: {
    width: '100%',

    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.background,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 2,
    borderTopColor: COLORS.zincColors.zinc100,
    paddingBottom: 40,
    maxHeight: SCREEN_HEIGHT * 0.9,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.zincColors.zinc800,
    borderRadius: 4,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.zincColors.zinc50,
  },
  description: {
    fontSize: 14,
    color: COLORS.zincColors.zinc400,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 24,
  },
  footer: {
    paddingHorizontal: 24,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
