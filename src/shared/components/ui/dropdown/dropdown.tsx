import { useRef, ReactNode } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { dropdownStyles } from './styles';

interface IDropDownProps<T> {
  visible: boolean;
  onSelect: (item: T) => void;
  handleOpen: () => void;
  trigger: ReactNode;
  data: T[];
  dropdownWidth?: number;
}
const DropDown = <T,>({
  visible,
  onSelect,
  handleOpen,
  trigger,
  data,
}: IDropDownProps<T>) => {
  const triggerRef = useRef<View>(null);

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleOpen}>
        <View ref={triggerRef}>{trigger}</View>
      </TouchableWithoutFeedback>
      {visible && (
        <View style={dropdownStyles.dropdown}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={dropdownStyles.option}
                onPress={() => onSelect(item)}
              >
                <Text style={dropdownStyles.optionText}>{item as string}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default DropDown;
