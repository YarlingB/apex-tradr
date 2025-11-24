import { IWatchlist } from '../data-types/interfaces/watchlist';
import { getStockQuoteService } from '../services/stock-markets/stock-quote';
import useWatchlistStore from '../store/watchlist';

/**
 * @description Custom hook to manage the watchlist items
 * Important: This hook is used to manage the watchlist items in the app: add, remove, update items
 */
export const useWatchlist = () => {
  const { watchlist, setWatchlist } = useWatchlistStore();

  const addToWatchlist = async (stock: IWatchlist) => {
    const retrievedQuote = await getSymbolQuote(stock.symbol);
    const payload = { ...stock };
    if (retrievedQuote) {
      payload.quote = retrievedQuote;
    }
    setWatchlist([...watchlist, payload]);
  };

  const getSymbolQuote = async (symbol: string) => {
    const quote = await getStockQuoteService(symbol);
    return quote.success ? quote.data : null;
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
