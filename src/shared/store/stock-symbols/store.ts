import { create } from 'zustand';
import { IStockSymbol } from '../../data-types/interfaces/stock-symbols';

interface IStockSymbolsStore {
  stockSymbols: IStockSymbol[];
  setStockSymbols: (stockSymbols: IStockSymbol[]) => void;
}

const useStockSymbolsStore = create<IStockSymbolsStore>(set => ({
  stockSymbols: [],
  setStockSymbols: (stockSymbols: IStockSymbol[]) => set({ stockSymbols }),
}));

export default useStockSymbolsStore;
