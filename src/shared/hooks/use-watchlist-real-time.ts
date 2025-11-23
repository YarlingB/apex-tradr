import useWatchlistRealTimeStore from '../store/watchlist-real-time';
import * as finnhubSocketService from '../services/sockets/finnhub-socket';
import { ITradeMarketData } from '../data-types/interfaces/market-data';

/**
 * @description Custom hook to manage the watchlist items in real time
 * Important: This hook is used to manage the watchlist items in real time: sync socket with watchlist, update stsock data
 */
export const useWatchlistInRealTime = () => {
  const { stockData, setStockData } = useWatchlistRealTimeStore();

  const updateStockData = (symbol: string, data: ITradeMarketData) => {
    const existingData = stockData[symbol] || [];
    const updatedData = [...existingData, data].slice(-20);
    setStockData({ ...stockData, [symbol]: updatedData });
  };

  const syncSocketWithWatchlist = () => {
    const symbols = Object.keys(stockData);
    symbols.forEach(symbol => {
      finnhubSocketService.subscribe(symbol);
    });
  };

  const actions = {
    syncSocketWithWatchlist,
    updateStockData,
  };

  return { stockData, actions };
};
