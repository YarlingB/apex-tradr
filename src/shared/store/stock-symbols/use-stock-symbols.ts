import { getSymbolsService } from '../../services/stock-markets/get-symbols';
import useStockSymbolsStore from './store';

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
