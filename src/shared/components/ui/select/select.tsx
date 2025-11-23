import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  ISelectChildAndStyleProps,
  ISelectContext,
  ISelectItemProps,
  ISelectProps,
  ISelectValueProps,
  ITriggerLayout,
} from './interface';
import { selectStyles } from './styles';
import { createContext, useContext, useRef, useState } from 'react';
import { Typography } from '../typography';

const initialTriggerLayout: ITriggerLayout = {
  pageX: 0,
  pageY: 0,
  width: 0,
  height: 0,
};
const SelectContext = createContext<ISelectContext>({
  value: null,
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
  triggerLayout: initialTriggerLayout,
  setTriggerLayout: () => {},
});

export const Select = ({ value, onValueChange, children }: ISelectProps) => {
  const [open, setOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState(initialTriggerLayout);

  const handleTriggerLayout = (layout: ITriggerLayout) => {
    setTriggerLayout(layout);
  };

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange,
        open,
        setOpen,
        triggerLayout,
        setTriggerLayout: handleTriggerLayout,
      }}
    >
      <View style={selectStyles.root}>{children}</View>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = ({
  children,
  style,
}: ISelectChildAndStyleProps) => {
  const { setOpen, open, setTriggerLayout } = useContext(SelectContext);
  const triggerRef = useRef<View>(null);

  const handleOnTriggerLayout = () => {
    if (open) {
      setOpen(false);
      return;
    }

    if (triggerRef.current) {
      triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setTriggerLayout({ pageX, pageY, width, height });
        setOpen(true);
      });
    }
  };

  return (
    <TouchableOpacity
      ref={triggerRef}
      style={[selectStyles.trigger, style]}
      onPress={handleOnTriggerLayout}
      activeOpacity={0.7}
    >
      {children}
      {/* Icono de Chevron estilo shadcn */}
      <Text style={selectStyles.chevron}>{open ? '▲' : '▼'}</Text>
    </TouchableOpacity>
  );
};

export const SelectContent = ({
  children,
  style,
}: ISelectChildAndStyleProps) => {
  const { open, setOpen, triggerLayout } = useContext(SelectContext);

  if (!open) return null;

  const dropdownStyle = {
    top: triggerLayout.pageY,
    left: triggerLayout.pageX,
    width: triggerLayout.width,
  };

  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View style={selectStyles.overlay}>
          <View style={[selectStyles.content, dropdownStyle, style]}>
            <TouchableWithoutFeedback>
              <View>{children}</View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const SelectLabel = ({ children, style }: ISelectChildAndStyleProps) => {
  return (
    <Typography style={[selectStyles.label, style]}>{children}</Typography>
  );
};

export const SelectValue = ({ placeholder, style }: ISelectValueProps) => {
  const { value } = useContext(SelectContext);
  return (
    <Typography style={[selectStyles.valueText, style]}>
      {value ? value.label : placeholder}
    </Typography>
  );
};

export const SelectItem = ({
  label,
  value,
  children,
  style,
  onSelectItem,
}: ISelectItemProps) => {
  const {
    onValueChange,
    setOpen,
    value: selectedValue,
  } = useContext(SelectContext);
  const isSelected = selectedValue?.value === value;

  const handlePress = () => {
    if (onSelectItem) {
      onSelectItem();
    } else {
      // Si pasamos un objeto completo, lo devolvemos, si no, el value raw
      onValueChange(label ? { label, value } : { label, value });
    }
    setOpen(false);
  };
  return (
    <TouchableOpacity
      style={[
        selectStyles.item,
        isSelected && selectStyles.itemSelected,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.6}
    >
      <View style={selectStyles.checkContainer}>
        {isSelected && <Text style={selectStyles.checkIcon}>✓</Text>}
      </View>
      <View style={selectStyles.itemContent}>
        {children ? (
          children
        ) : (
          <Typography
            style={[
              selectStyles.itemText,
              isSelected && selectStyles.itemTextSelected,
            ]}
          >
            {label || value}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
};
