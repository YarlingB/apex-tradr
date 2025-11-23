import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ButtonVariantType } from '../data-types';
import { touchableOpacityStyles } from './styles';

interface ICustomTouchableOpacityProps extends TouchableOpacityProps {
  variant?: ButtonVariantType;
}

export const CustomTouchableOpacity = ({
  children,
  onPress,
  variant = 'primary',
  style,
  ...props
}: ICustomTouchableOpacityProps) => {
  const variantStyle = touchableOpacityStyles[variant];
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[touchableOpacityStyles.container, variantStyle, style]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};
