import { getSymbolsService } from '@shared/services/stock-markets/get-symbols';
import useStockSymbolsStore from '@/shared/store/stock-symbols';

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
