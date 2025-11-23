/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SCREEN_HEIGHT } from '@shared/constants/app';
import { isIOS } from '@shared/utils/platform';
import { bottomsheetStyles } from './styles';

interface IBottomSheetContext {
  closeSheet: () => void;
}

interface IBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}
const BottomSheetContext = createContext<IBottomSheetContext>({
  closeSheet: () => {},
});

/**
 * @description BottomSheet Root component
 */
export const BottomSheet = ({
  open,
  onOpenChange,
  children,
}: IBottomSheetProps) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const resetPosition = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4, // small bounce when opening
    }).start();
  };

  const backdropOpacity = translateY.interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [0.5, 0], // range from 0.5 to 0 opacity
    extrapolate: 'clamp',
  });

  const closeSheet = () => {
    //  Animate down
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start(() => {
      // 2. Once the animation has finished, notify the parent to close (unmount)
      onOpenChange(false);
    });
  };

  useEffect(() => {
    if (open) {
      // Resetear valores antes de mostrar
      translateY.setValue(SCREEN_HEIGHT);
      overlayOpacity.setValue(0);

      // Animar entrada
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 4,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [open]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Solo activar si se arrastra hacia abajo (dy > 0) y con cierta fuerza
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        // Si arrastra hacia abajo, mover el sheet
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // Si soltó el dedo y arrastró más de 150px o con velocidad, cerrar
        if (gestureState.dy > 150 || gestureState.vy > 0.5) {
          closeSheet();
        } else {
          // Si no, regresar a la posición original (rebotar)
          resetPosition();
        }
      },
    }),
  ).current;

  if (!open) return null;

  return (
    <BottomSheetContext.Provider value={{ closeSheet }}>
      <Modal
        transparent
        visible={open}
        onRequestClose={closeSheet} // android: back button
        animationType="none"
      >
        <View style={bottomsheetStyles.overlayContainer}>
          {/* backdrop with dynamic opacity */}
          <TouchableWithoutFeedback onPress={closeSheet}>
            <Animated.View
              style={[bottomsheetStyles.backdrop, { opacity: backdropOpacity }]}
            />
          </TouchableWithoutFeedback>
          {/* swipeable sheet */}
          <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : 'height'}
            style={bottomsheetStyles.keyboardView}
          >
            <Animated.View
              style={[bottomsheetStyles.sheet, { transform: [{ translateY }] }]}
              // add pan handlers
              {...panResponder.panHandlers}
            >
              {/* visual indicator of the swipeable sheet */}
              <View style={bottomsheetStyles.handleContainer}>
                <View style={bottomsheetStyles.handle} />
              </View>
              {children}
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </BottomSheetContext.Provider>
  );
};

export const BottomSheetContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={bottomsheetStyles.content}>{children}</View>
    </TouchableWithoutFeedback>
  );
};
