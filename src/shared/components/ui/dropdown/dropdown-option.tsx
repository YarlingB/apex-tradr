import { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { dropdownStyles } from './styles';

export const DropdownOption = ({
  onSelect,
  children,
}: {
  onSelect: () => void;
  children: ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={dropdownStyles.menuOption}>
      {children}
    </TouchableOpacity>
  );
};
