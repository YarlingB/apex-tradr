import { create } from 'zustand';
import { ITradeMarketData } from '../data-types/interfaces/market-data';

interface IWatchlistRealTimeStore {
  stockData: Record<string, ITradeMarketData[]>;
  setStockData: (stockData: Record<string, ITradeMarketData[]>) => void;
}

const useWatchlistRealTimeStore = create<IWatchlistRealTimeStore>(set => ({
  stockData: {},
  setStockData: (stockData: Record<string, ITradeMarketData[]>) =>
    set({ stockData }),
}));

export default useWatchlistRealTimeStore;
