import { typographyStyles } from './styles';

export const TYPOGRAPHY_VARIANTS = Object.keys(
  typographyStyles,
) as (keyof typeof typographyStyles)[];

export type TypographyVariantType = (typeof TYPOGRAPHY_VARIANTS)[number];
