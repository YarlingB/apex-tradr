import { Dimensions } from 'react-native';
import Config from 'react-native-config';

export const APP_BOTTOM_TABS_SCREENS = {
  WATCHLIST: 'Watchlist',
  AUTH: 'Auth',
  MARKET_GRAPHS: 'MarketGraphs',
  ALERTS: 'Settings',
};

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const FINNHUB_SOCKET_SERVICE_URL = 'wss://ws.finnhub.io';
export const FINNHUB_API_URL = 'https://finnhub.io/api/v1';
export const FINNHUB_API_KEY = Config.FINNHHUB_API_KEY || 'YOUR_API_KEY';
