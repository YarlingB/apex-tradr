import { getSymbolsService } from '@shared/services/stock-markets/get-symbols';
import useStockSymbolsStore from '../store/stock-symbols';

/**
 * @description Custom hook to manage the stock symbols list
 * Important: This hook is used to manage the stock symbols list in the app: get stock symbols list from API, set stock symbols list to store.
 */
const useStockSymbols = () => {
  const { stockSymbols, setStockSymbols } = useStockSymbolsStore();

  const getStockSymbols = async () => {
    const response = await getSymbolsService();
    if (response.success) {
      setStockSymbols(response.data || []);
    }
  };
  const actions = {
    getStockSymbols,
  };
  return { stockSymbols, actions };
};

export default useStockSymbols;
