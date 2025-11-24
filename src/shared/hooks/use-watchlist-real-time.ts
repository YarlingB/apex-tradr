import { useEffect, useCallback } from 'react';
import useWatchlistRealTimeStore from '../store/watchlist-real-time';
import useWatchlistStore from '../store/watchlist';
import * as finnhubSocketService from '../services/sockets/finnhub-socket';
import { ITradeMarketData } from '../data-types/interfaces/market-data';

/**
 * @description Custom hook to manage the watchlist items in real time
 * Important: This hook is the single source of truth for real-time stocks data and automatically syncs with the watchlist
 */
export const useWatchlistInRealTime = () => {
  const { stockData, setStockData } = useWatchlistRealTimeStore();
  const { watchlist } = useWatchlistStore();

  console.log('[useWatchlistInRealTime] watchlist:', watchlist);
  console.log('[useWatchlistInRealTime] stockData:', stockData);

  const updateStockData = useCallback(
    (symbol: string, data: ITradeMarketData) => {
      console.log(
        '[useWatchlistInRealTime] updateStockData called:',
        symbol,
        data,
      );
      const existingData = stockData[symbol] || [];
      const updatedData = [...existingData, data].slice(-20);
      console.log(
        '[useWatchlistInRealTime] updating store for',
        symbol,
        'with',
        updatedData.length,
        'items',
      );
      setStockData({ ...stockData, [symbol]: updatedData });
    },
    [stockData, setStockData],
  );

  // Effect 1: Sync watchlist with socket subscriptions
  // Automatically connects socket and subscribes to symbols when items are added to watchlist
  // Unsubscribes from symbols that are no longer in watchlist
  useEffect(() => {
    console.log(
      '[useWatchlistInRealTime] Effect 1: watchlist changed',
      watchlist,
    );

    const currentSymbols = new Set(watchlist.map(stock => stock.symbol));
    console.log(
      '[useWatchlistInRealTime] Current symbols in watchlist:',
      Array.from(currentSymbols),
    );

    // Get symbols that have data in store (previously subscribed)
    const subscribedSymbols = new Set(Object.keys(stockData));
    console.log(
      '[useWatchlistInRealTime] Symbols with data in store:',
      Array.from(subscribedSymbols),
    );

    // Unsubscribe from symbols that are no longer in watchlist
    subscribedSymbols.forEach(symbol => {
      if (!currentSymbols.has(symbol)) {
        console.log('[useWatchlistInRealTime] Unsubscribing from', symbol);
        finnhubSocketService.unsubscribe(symbol);
        const updatedStockData = { ...stockData };
        delete updatedStockData[symbol];
        setStockData(updatedStockData);
      }
    });

    // Connect socket if there are items in watchlist
    if (watchlist.length > 0) {
      console.log(
        '[useWatchlistInRealTime] Watchlist has items, connecting socket...',
      );
      finnhubSocketService.connect();

      // Subscribe to all symbols in watchlist
      watchlist.forEach(stock => {
        console.log(
          '[useWatchlistInRealTime] Subscribing to symbol:',
          stock.symbol,
        );
        finnhubSocketService.subscribe(stock.symbol);
      });
    } else {
      console.log(
        '[useWatchlistInRealTime] Watchlist is empty, skipping socket connection',
      );
    }
  }, [watchlist, stockData]);

  // Effect 2: Receive trade data from socket and update store
  useEffect(() => {
    console.log(
      '[useWatchlistInRealTime] Effect 2: Registering trade data listener',
    );
    const unsubscribe = finnhubSocketService.onTradeData(
      (trade: ITradeMarketData) => {
        console.log('[useWatchlistInRealTime] Trade data received:', trade);
        updateStockData(trade.s, trade);
      },
    );

    console.log('[useWatchlistInRealTime] Trade data listener registered');
    return () => {
      console.log('[useWatchlistInRealTime] Cleaning up trade data listener');
      unsubscribe();
    };
  }, [updateStockData]);

  return { stockData };
};
