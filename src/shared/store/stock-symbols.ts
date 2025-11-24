import { create } from 'zustand';
import {
  IStockSymbol,
  IStockSymbolsStore,
} from '@shared/data-types/interfaces/stock-symbols';

/**
 * @description Store to manage the stock symbols list
 * Important: This store is used to manage the stock symbols list in the app: get, set stock symbols list
 */
const useStockSymbolsStore = create<IStockSymbolsStore>(set => ({
  stockSymbols: [],
  setStockSymbols: (stockSymbols: IStockSymbol[]) => set({ stockSymbols }),
}));

export default useStockSymbolsStore;
