import { IBaseServiceResponse } from '../../data-types/interfaces/services';
import { IStockSymbol } from '../../data-types/interfaces/stock-symbols';

export const DEFAULT_SYMBOLS: IStockSymbol[] = [
  {
    currency: 'USD',
    description: 'Apple Inc.',
    symbol: 'AAPL',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'Alphabet Inc.',
    symbol: 'GOOG',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'Microsoft Corporation',
    symbol: 'MSFT',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'Amazon.com Inc.',
    symbol: 'AMZN',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'Tesla Inc.',
    symbol: 'TSLA',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'Netflix Inc.',
    symbol: 'NFLX',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'NVIDIA Corporation',
    symbol: 'NVDA',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'Meta Platforms PLATFORMS INC-CLASS A',
    symbol: 'META',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'Intel Corporation',
    symbol: 'INTC',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'STARBUCKS ',
    symbol: 'SBUX',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'Walmart Inc.',
    symbol: 'WMT',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'Johnson & Johnson',
    symbol: 'JNJ',
    mic: 'XNAS',
  },
  {
    currency: 'USD',
    description: 'Harvard Bioscience Inc.',
    symbol: 'HBIO',
    mic: 'XNAS',
  },
];

export const getSymbolsService = async (): Promise<
  IBaseServiceResponse<IStockSymbol[]>
> => {
  try {
    return {
      data: DEFAULT_SYMBOLS,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Oops! Something went wrong while fetching symbols',
    };
  }
};
