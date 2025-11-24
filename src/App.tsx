/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import NavigationWrapper from './app/navigation/navigation-wrapper';
import { useStockAlertNotifications } from './shared/hooks/use-stock-alert-notifications';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useStockAlertNotifications();
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationWrapper />
    </>
  );
}

export default App;
