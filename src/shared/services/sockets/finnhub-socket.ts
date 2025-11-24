import {
  FINNHUB_API_KEY,
  FINNHUB_SOCKET_SERVICE_URL,
} from '../../constants/app';
import {
  IFinnhubMarketData,
  ITradeMarketData,
  PriceMapType,
} from '../../data-types/interfaces/market-data';

let socket: WebSocket | null = null;
let throttleInterval: ReturnType<typeof setTimeout> | null = null;
let retryTimeout: ReturnType<typeof setTimeout> | null = null;
let retryCount = 0;
const MAX_RETRY_DELAY = 30000; // 30 seconds max
const INITIAL_RETRY_DELAY = 4000; // 4 seconds initial

const subscriptions = new Set<string>();
const listeners = new Set<(prices: PriceMapType) => void>();
const tradeDataListeners = new Set<(trade: ITradeMarketData) => void>();
let pendingUpdates: PriceMapType = {};

const notifyListeners = () => {
  if (Object.keys(pendingUpdates).length === 0) return;

  // notify listeners with the pending updates
  listeners.forEach(listener => listener(pendingUpdates));
  pendingUpdates = {};
};

const startThrottling = () => {
  if (throttleInterval) return;
  throttleInterval = setInterval(notifyListeners, 1000);
};

const stopThrottling = () => {
  if (throttleInterval) {
    clearInterval(throttleInterval);
    throttleInterval = null;
  }
};

const getRetryDelay = (isRateLimit: boolean): number => {
  if (isRateLimit) {
    // Exponential backoff for rate limits:  10s...
    retryCount++;
    const delay = Math.min(10000 * retryCount, MAX_RETRY_DELAY);
    return delay;
  } else {
    // Reset retry count for non-rate-limit errors
    retryCount = 0;
    return INITIAL_RETRY_DELAY;
  }
};

const generateDummyTradeData = (): ITradeMarketData[] => {
  const baseTimestamp = Date.now();

  return [
    {
      p: 271.52,
      s: 'AAPL',
      t: baseTimestamp - 4000,
      v: 15234,
    },
    {
      p: 271.45,
      s: 'AAPL',
      t: baseTimestamp - 3000,
      v: 28901,
    },
    {
      p: 271.58,
      s: 'AAPL',
      t: baseTimestamp - 2000,
      v: 12456,
    },
    {
      p: 271.41,
      s: 'AAPL',
      t: baseTimestamp - 1000,
      v: 34567,
    },
    {
      p: 271.49,
      s: 'AAPL',
      t: baseTimestamp,
      v: 19823,
    },
  ];
};

const emitDummyTradeData = () => {
  //  * Only emits if there are listeners and subscriptions
  if (tradeDataListeners.size === 0 || !subscriptions.has('AAPL')) {
    return;
  }

  const dummyTrades = generateDummyTradeData();

  dummyTrades.forEach(trade => {
    // Update pending price updates
    pendingUpdates[trade.s] = trade.p;

    // Emit to trade data listeners
    tradeDataListeners.forEach(listener => listener(trade));
  });
};

const handleMessage = (event: WebSocketMessageEvent) => {
  console.log('[finnhub-socket] RAW message received:', event.data);
  console.log('[finnhub-socket] Message type:', typeof event.data);

  try {
    // Handle ping messages (keep-alive from Finnhub)
    if (event.data === '{"type":"ping"}') {
      console.log('[finnhub-socket] 📍 Ping received, responding with pong');
      console.log('[finnhub-socket] Ping Data:', event.data);
      if (socket !== null && socket.readyState === WebSocket.OPEN) {
        socket.send('{"type":"pong"}');
        console.log('[finnhub-socket] Sent pong response');
      }
      return;
    } else {
      console.log('[finnhub-socket] Not a ping message');
    }

    const message: IFinnhubMarketData = JSON.parse(
      event.data,
    ) as IFinnhubMarketData;
    console.log('[finnhub-socket] 📨 Message received, type:', message.type);
    console.log(
      '[finnhub-socket] Full message:',
      JSON.stringify(message, null, 2),
    );

    if (message.type === 'trade') {
      console.log(
        '[finnhub-socket] ✅ Trade data received, count:',
        message.data?.length || 0,
      );
      if (!message.data || message.data.length === 0) {
        console.log('[finnhub-socket] ⚠️ Trade message has no data array');
        return;
      }
      message.data.forEach(trade => {
        console.log(
          '[finnhub-socket] Processing trade:',
          trade.s,
          'price:',
          trade.p,
        );
        // Update pending price updates (for price listeners)
        pendingUpdates[trade.s] = trade.p;

        console.log(
          '[finnhub-socket] Emitting to',
          tradeDataListeners.size,
          'trade data listeners',
        );
        tradeDataListeners.forEach(listener => listener(trade));
      });
    }
    if (message.type === 'ping') {
      // Handle ping as JSON object
      console.log(
        '[finnhub-socket] 📍 Ping received (JSON), responding with pong',
      );
      if (socket !== null && socket.readyState === WebSocket.OPEN) {
        socket.send('{"type":"pong"}');
      }
    }
  } catch (error) {
    console.error('[finnhub-socket] ❌ Error parsing message:', error);
    console.error('[finnhub-socket] Raw message:', event.data);
  }
};

const restoreSubscription = () => {
  if (socket !== null && socket.readyState === WebSocket.OPEN) {
    console.log(
      '[finnhub-socket] 🔄 Restoring',
      subscriptions.size,
      'subscriptions',
    );
    subscriptions.forEach(symbol => {
      // Finnhub expects symbol in uppercase
      const normalizedSymbol = symbol.toUpperCase();
      const message = JSON.stringify({
        type: 'subscribe',
        symbol: normalizedSymbol,
      });

      socket!.send(message);
    });
  } else {
    console.log(
      '[finnhub-socket] ⚠️ Cannot restore subscriptions, socket not ready',
    );
  }
};

export const connect = () => {
  // validate if socket is already connected
  if (socket !== null && socket.readyState === WebSocket.OPEN) {
    console.log('[finnhub-socket] Socket already connected, skipping');
    return;
  }

  console.log('[finnhub-socket] Connecting to WebSocket...');

  // create new socket
  socket = new WebSocket(
    `${FINNHUB_SOCKET_SERVICE_URL}?token=${FINNHUB_API_KEY}`,
  );

  // restore subscriptions and start throttling when socket is opened
  socket.onopen = () => {
    console.log('[finnhub-socket] ✅ Connected to Finnhub WebSocket');

    // Reset retry count on successful connection
    retryCount = 0;
    restoreSubscription();
    startThrottling();

    // Emit dummy trade data for testing
    emitDummyTradeData();
  };

  socket.onmessage = handleMessage;

  socket.onclose = event => {
    console.log('[finnhub-socket] 💥 Disconnected from Finnhub WebSocket');
    console.log(
      '[finnhub-socket] Close code:',
      event.code,
      'Reason:',
      event.reason,
    );
    stopThrottling();
    socket = null;

    const isRateLimit = !!(
      event.reason?.includes('429') ||
      event.reason?.includes('Too Many Requests')
    );

    const retryDelay = getRetryDelay(isRateLimit);
    console.log(
      `[finnhub-socket] 🔄 Retrying connection in ${retryDelay / 1000}s...`,
    );

    // Clear any existing retry timeout
    if (retryTimeout) {
      clearTimeout(retryTimeout);
    }

    retryTimeout = setTimeout(() => {
      retryTimeout = null;
      connect();
    }, retryDelay);
  };

  socket.onerror = () => {
    console.error('[finnhub-socket] 💥 Error connecting to Finnhub WebSocket:');
  };
};

export const disconnect = () => {
  stopThrottling();
  if (retryTimeout) {
    clearTimeout(retryTimeout);
    retryTimeout = null;
  }
  retryCount = 0; // Reset retry count on manual disconnect
  socket?.close();
  socket = null;
  console.log('Disconnected from Finnhub WebSocket');
};

export const subscribe = (symbol: string) => {
  console.log('[finnhub-socket] 📡 Subscribe called for symbol:', symbol);
  console.log(
    '[finnhub-socket] Socket state:',
    socket ? socket.readyState : 'null',
    socket
      ? `(${
          socket.readyState === WebSocket.OPEN
            ? 'OPEN'
            : socket.readyState === WebSocket.CONNECTING
            ? 'CONNECTING'
            : socket.readyState === WebSocket.CLOSING
            ? 'CLOSING'
            : 'CLOSED'
        })`
      : '',
  );
  subscriptions.add(symbol);
  console.log(
    '[finnhub-socket] Total subscriptions:',
    Array.from(subscriptions),
  );

  if (socket !== null && socket.readyState === WebSocket.OPEN) {
    const normalizedSymbol = symbol.toUpperCase();
    const message = JSON.stringify({
      type: 'subscribe',
      symbol: normalizedSymbol,
    });
    console.log('[finnhub-socket] ✅ Sending subscribe message:', message);

    socket.send(message);
  } else {
    console.log(
      '[finnhub-socket] ⚠️ Socket not ready, subscription queued. Will subscribe when socket opens.',
    );
  }
};

export const unsubscribe = (symbol: string) => {
  subscriptions.delete(symbol);
  if (socket !== null && socket.readyState === WebSocket.OPEN) {
    socket!.send(JSON.stringify({ type: 'unsubscribe', symbol }));
  }
};

export const onPriceUpdate = (callback: (prices: PriceMapType) => void) => {
  listeners.add(callback);
  // return a function to unsubscribe from price updates - used to cleanup the listener when the component unmounts
  return () => {
    listeners.delete(callback);
  };
};

export const onTradeData = (callback: (trade: ITradeMarketData) => void) => {
  console.log('[finnhub-socket] 📝 Registering trade data listener');
  tradeDataListeners.add(callback);
  console.log(
    '[finnhub-socket] Total trade data listeners:',
    tradeDataListeners.size,
  );
  // return a function to unsubscribe from trade data updates - used to cleanup the listener when the component unmounts
  return () => {
    console.log('[finnhub-socket] 🗑️ Removing trade data listener');
    tradeDataListeners.delete(callback);
    console.log(
      '[finnhub-socket] Remaining trade data listeners:',
      tradeDataListeners.size,
    );
  };
};
