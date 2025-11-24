import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WatchlistScreen } from '../../../features/watchlist/screens';
import { AuthScreen } from '@features/auth/screens/index';
import { MarketGraphsScreen } from '../../../features/market-graphs/screens';
import { AlertsScreen } from '../../../features/alerts/screens';
import { APP_BOTTOM_TABS_SCREENS } from '../../../shared/constants/app';

const Tab = createBottomTabNavigator();

const AppBottomTabsNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={APP_BOTTOM_TABS_SCREENS.WATCHLIST}
        component={WatchlistScreen}
      />
      <Tab.Screen
        name={APP_BOTTOM_TABS_SCREENS.AUTH}
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={APP_BOTTOM_TABS_SCREENS.MARKET_GRAPHS}
        component={MarketGraphsScreen}
      />
      <Tab.Screen
        name={APP_BOTTOM_TABS_SCREENS.ALERTS}
        component={AlertsScreen}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTabsNavigator;
