export interface IStockSymbol {
  currency: string;
  description: string;
  symbol: string;
  mic: string;
}

export interface IStockSymbolsStore {
  stockSymbols: IStockSymbol[];
  setStockSymbols: (stockSymbols: IStockSymbol[]) => void;
}
