import { createContext, useEffect, useState } from 'react';
import { PriceMapType } from '../data-types/interfaces/market-data';
import * as finnhubSocketService from '../services/sockets/finnhub-socket';

interface IMarketDataContext {
  prices: PriceMapType;
  subscribe: (symbol: string) => void;
  unsubscribe: (symbol: string) => void;
}

const MarketDataContext = createContext<IMarketDataContext | undefined>(
  undefined,
);

export const MarketDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [prices, setPrices] = useState<PriceMapType>({});

  useEffect(() => {
    // Step1: Connect to the socket
    finnhubSocketService.connect();

    // Step2: Subscribe to updates
    const unsubscribeListener = finnhubSocketService.onPriceUpdate(
      newPrices => {
        setPrices({ ...prices, ...newPrices });
      },
    );

    // Step3: Cleanup
    return () => {
      unsubscribeListener();
      finnhubSocketService.disconnect();
    };
  }, []);

  return (
    <MarketDataContext.Provider
      value={{
        prices,
        subscribe: finnhubSocketService.subscribe,
        unsubscribe: finnhubSocketService.unsubscribe,
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
};
