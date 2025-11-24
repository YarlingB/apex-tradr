export interface IStockSymbol {
  currency: string;
  description: string;
  symbol: string;
  mic: string;
  quote: IStockQuote | null;
}

export interface IStockSymbolsStore {
  stockSymbols: IStockSymbol[];
  setStockSymbols: (stockSymbols: IStockSymbol[]) => void;
}

export interface ICompanyProfile {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

/**
 * @description Interface to represent the stock quote response from the Finnhub API
 * @property {number} c - The current price of the stock
 * @property {number} d - The change in price of the stock
 * @property {number} dp - The percentage change in price of the stock
 * @property {number} h - The highest price of the stock
 * @property {number} l - The lowest price of the stock
 * @property {number} o - The opening price of the stock
 * @property {number} pc - The previous closing price of the stock
 */
export interface IStockQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}
