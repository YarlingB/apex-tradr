/**
 * @description Interface to represent the market data for a stock
 * @property {number} p - The price of the stock
 * @property {string} s - The symbol of the stock
 * @property {number} t - The timestamp of the data - UNIX milliseconds
 * @property {number} v - The volume of the stock
 */
export interface ITradeMarketData {
  p: number;
  s: string;
  t: number;
  v: number;
}

export interface IFinnhubMarketData {
  data: ITradeMarketData[];
  type: string;
}

export type PriceMapType = Record<string, number>;

export interface ISocketServiceMarketData {
  connect(): void;
  disconnect(): void;
  subscribeToMarketData(symbol: string): void;
  unsubscribeFromMarketData(symbol: string): void;
  onPriceUpdate(callback: (prices: PriceMapType) => void): void;
}
