import { Dimensions } from 'react-native';

export const APP_BOTTOM_TABS_SCREENS = {
  WATCHLIST: 'WatchlistScreen',
  AUTH: 'AuthScreen',
  MARKET_GRAPHS: 'MarketGraphsScreen',
  ALERTS: 'AlertsScreen',
};

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const FINNHUB_SOCKET_SERVICE_URL = 'wss://ws.finnhub.io';
export const FINNHUB_API_KEY = '';
