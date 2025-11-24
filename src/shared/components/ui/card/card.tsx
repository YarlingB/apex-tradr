import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { cardStyles } from './styles';

interface ICardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card = ({ children, style, ...props }: ICardProps) => {
  return (
    <View style={[cardStyles.card, style]} {...props}>
      {children}
    </View>
  );
};
