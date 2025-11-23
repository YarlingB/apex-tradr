import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { typographyStyles } from './styles';
import { TypographyVariantType } from './common';

interface TypographyProps extends TextProps {
  variant?: TypographyVariantType;
  style?: StyleProp<TextStyle>;
}
const Typography = ({
  variant = 'md',
  style,
  children,
  ...props
}: TypographyProps) => {
  const textStyle = typographyStyles[variant];
  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export default Typography;
