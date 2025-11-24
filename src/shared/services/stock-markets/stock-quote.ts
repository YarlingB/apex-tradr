import { FINNHUB_API_KEY, FINNHUB_API_URL } from '../../constants/app';
import { IBaseServiceResponse } from '../../data-types/interfaces/services';
import { IStockQuote } from '../../data-types/interfaces/stock-symbols';

export const getStockQuoteService = async (
  symbol: string,
): Promise<IBaseServiceResponse<IStockQuote>> => {
  try {
    const response = await fetch(
      `${FINNHUB_API_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
    );
    return {
      success: true,
      data: await response.json(),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Oops! Something went wrong while fetching stock quote',
    };
  }
};
