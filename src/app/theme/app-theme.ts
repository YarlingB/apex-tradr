import { StyleSheet } from 'react-native';
import {
  PRIMARY_COLORS,
  RED_COLORS,
  SECONDARY_COLORS,
  ZINC_COLORS,
  GREEN_COLORS,
  SLATE_COLORS,
  NEUTRAL_COLORS,
  GRAY_COLORS,
} from './colors';

export const COLORS = {
  background: '#FFFF',
  primary: PRIMARY_COLORS.primary500,
  secondary: SECONDARY_COLORS.secondary500,
  primaryColors: { ...PRIMARY_COLORS },
  secondaryColors: { ...SECONDARY_COLORS },
  redColors: { ...RED_COLORS },
  zincColors: { ...ZINC_COLORS },
  greenColors: { ...GREEN_COLORS },
  slateColors: { ...SLATE_COLORS },
  neutralColors: { ...NEUTRAL_COLORS },
  grayColors: { ...GRAY_COLORS },
};
export const appTextStyles = StyleSheet.create({
  light: {
    color: COLORS.primaryColors.primary100,
  },
  dark: {
    color: COLORS.primaryColors.primary900,
  },
  alignCenter: {
    textAlign: 'center',
  },
});

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
});

export const bottomTabStyles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: COLORS.background,
  },
});
