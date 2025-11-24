import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ITriggerLayout {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
}

export interface ISelectContext {
  value: ISelectOption | null;
  onValueChange: (value: ISelectOption) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerLayout: ITriggerLayout;
  setTriggerLayout: (layout: ITriggerLayout) => void;
}

export interface ISelectOption {
  label: string;
  value: string;
}

export interface ISelectProps {
  value: ISelectOption | null;
  onValueChange: (value: ISelectOption) => void;

  children: ReactNode;
}

export interface ISelectChildAndStyleProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface ISelectValueProps {
  placeholder: string;
  style?: StyleProp<TextStyle>;
}

export interface ISelectItemProps {
  label: string;
  value: string;
  children: ReactNode;
  onSelectItem: () => void;
  style?: StyleProp<ViewStyle>;
}
