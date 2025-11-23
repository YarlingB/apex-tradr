/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import NavigationWrapper from './app/navigation/navigation-wrapper';
import { MarketDataProvider } from './shared/context/market-data-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <MarketDataProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationWrapper />
      </MarketDataProvider>
    </>
  );
}

export default App;
