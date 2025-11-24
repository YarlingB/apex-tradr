import { IWatchlist } from '../data-types/interfaces/watchlist';
import useWatchlistStore from '../store/watchlist';

/**
 * @description Custom hook to manage the watchlist items
 * Important: This hook is used to manage the watchlist items in the app: add, remove, update items
 */
export const useWatchlist = () => {
  const { watchlist, setWatchlist } = useWatchlistStore();

  const addToWatchlist = (stock: IWatchlist) => {
    setWatchlist([...watchlist, stock]);
  };
  const removeFromWatchlist = (stock: IWatchlist) => {
    setWatchlist(watchlist.filter(item => item.symbol !== stock.symbol));
  };

  const actions = {
    addToWatchlist,
    removeFromWatchlist,
  };
  return { watchlist, actions };
};
