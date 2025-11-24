import { IStockSymbol } from './stock-symbols';

// Items in the watchlist are the stock symbols
export interface IWatchlist extends IStockSymbol {}

export interface IWatchlistStore {
  watchlist: IWatchlist[];
  setWatchlist: (watchlist: IWatchlist[]) => void;
}
