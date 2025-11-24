import { create } from 'zustand';
import {
  IWatchlist,
  IWatchlistStore,
} from '../data-types/interfaces/watchlist';

/**
 * @description Store to manage the watchlist items
 * Important: This store is used to only handle the watchlist items in the app: add, remove, update stocks
 */
const useWatchlistStore = create<IWatchlistStore>(set => ({
  watchlist: [],
  setWatchlist: (watchlist: IWatchlist[]) => set({ watchlist }),
}));

export default useWatchlistStore;
