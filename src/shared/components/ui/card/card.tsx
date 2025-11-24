import { StyleProp, View, ViewStyle } from 'react-native';
import { cardStyles } from './styles';

interface ICardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card = ({ children, style }: ICardProps) => {
  return <View style={[cardStyles.card, style]}>{children}</View>;
};
