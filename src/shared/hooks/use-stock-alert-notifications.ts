import { useEffect, useMemo } from 'react';
import notifee, { AndroidImportance } from '@notifee/react-native';
import useStockAlertsStore from '../store/stock-alerts';
import { useStockAlerts } from './use-stock-alerts';
import { useWatchlistInRealTime } from './use-watchlist-real-time';
import { isAndroid } from '../utils/platform';
import { PermissionsAndroid, Platform } from 'react-native';

/**
 * Hook to monitor stock alerts and trigger notifications when target prices are reached.
 *
 * Prevents duplicate notifications by using the alertFired flag
 */
export const useStockAlertNotifications = () => {
  const { stockAlerts } = useStockAlertsStore();
  const { actions } = useStockAlerts();
  const { stockData } = useWatchlistInRealTime();

  // Initialize notifee channel (Android)
  useEffect(() => {
    const initializeNotifications = async () => {
      if (isAndroid) {
        if (Number(Platform.Version) >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          console.log(
            '[useStockAlertNotifications] 📱 Notification permission:',
            granted === PermissionsAndroid.RESULTS.GRANTED
              ? 'GRANTED'
              : 'DENIED',
          );
        }
        await notifee.createChannel({
          id: 'stock-alerts',
          name: 'Stock Price Alerts',
          importance: AndroidImportance.HIGH,
          sound: 'default',
          vibration: true,
        });
      }
    };
    initializeNotifications();
  }, []);

  // Get the latest price for each symbol from stockData
  const latestPrices = useMemo(() => {
    const prices: Record<string, number> = {};
    Object.keys(stockData).forEach(symbol => {
      const trades = stockData[symbol];
      if (trades && trades.length > 0) {
        // Get the most recent trade (last item in array)
        const latestTrade = trades[trades.length - 1];
        prices[symbol.toUpperCase()] = latestTrade.p;
      }
    });
    return prices;
  }, [stockData]);

  // Monitor price updates and check alert conditions
  useEffect(() => {
    // Find active alerts (not fired yet) that have price data available
    const activeAlerts = stockAlerts.filter(
      alert => !alert.alertFired && latestPrices[alert.symbol.toUpperCase()],
    );
    console.log('[useStockAlertNotifications] 📝 activeAlerts', activeAlerts);

    activeAlerts.forEach(async alert => {
      const symbol = alert.symbol.toUpperCase();
      const currentPrice = latestPrices[symbol];

      if (!currentPrice) return;

      const conditionMet =
        alert.alertCondition === 'gt'
          ? currentPrice >= alert.targetValue
          : currentPrice <= alert.targetValue;

      if (conditionMet) {
        // Mark alert as fired to prevent duplicate notifications
        actions.updateStockAlert({
          ...alert,
          alertFired: true,
        });
        console.log('[useStockAlertNotifications] 📝 trigger notification');
        const bodyMessage = `The price of ${symbol} has ${
          alert.alertCondition === 'gt' ? 'reached' : 'dropped to'
        } ${currentPrice.toFixed(2)}  (Target: ${alert.targetValue.toFixed(
          2,
        )})`;

        await notifee.displayNotification({
          title: `🚨 Alert: ${symbol}`,
          body: bodyMessage,
          android: {
            channelId: 'stock-alerts',
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'default',
            },
          },
        });
      }
    });
  }, [stockAlerts, latestPrices, actions]);
};
