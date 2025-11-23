import { NavigationContainer } from '@react-navigation/native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppBottomTabsNavigator from './tabs/app-bottom-tabs';

const NavigationWrapper = () => {
  // const safeAreaInsets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <AppBottomTabsNavigator />
    </NavigationContainer>
  );
};

export default NavigationWrapper;
