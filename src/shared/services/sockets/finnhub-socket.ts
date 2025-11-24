import {
  FINNHUB_API_KEY,
  FINNHUB_SOCKET_SERVICE_URL,
} from '../../constants/app';
import {
  IFinnhubMarketData,
  PriceMapType,
} from '../../data-types/interfaces/market-data';

let socket: WebSocket | null = null;
let throttleInterval: ReturnType<typeof setTimeout> | null = null;

const subscriptions = new Set<string>();
const listeners = new Set<(prices: PriceMapType) => void>();
let pendingUpdates: PriceMapType = {};

const notifyListeners = () => {};

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

const handleMessage = (event: WebSocketMessageEvent) => {
  try {
    const message: IFinnhubMarketData = JSON.parse(
      event.data,
    ) as IFinnhubMarketData;
    if (message.type === 'trade') {
      message.data.forEach(trade => {
        pendingUpdates[trade.s] = trade.p;
      });
    }
  } catch (error) {
    console.error('Error parsing message:', error);
  }
};

const restoreSubscription = () => {
  if (socket !== null && socket.readyState === WebSocket.OPEN) {
    subscriptions.forEach(symbol => {
      socket!.send(JSON.stringify({ type: 'subscribe', symbol }));
    });
  }
};

export const connect = () => {
  // validate if socket is already connected
  if (socket !== null && socket.readyState === WebSocket.OPEN) return;

  // create new socket
  socket = new WebSocket(
    `${FINNHUB_SOCKET_SERVICE_URL}?token=${FINNHUB_API_KEY}`,
  );

  // restore subscriptions and start throttling when socket is opened
  socket.onopen = () => {
    console.log('Connected to Finnhub WebSocket');
    restoreSubscription();
    startThrottling();
  };

  socket.onmessage = handleMessage;

  socket.onclose = () => {
    console.log('💥 Disconnected from Finnhub WebSocket');
    stopThrottling();
    socket = null;
    console.log('🔄 Retrying connection to Finnhub WebSocket...');
    setTimeout(connect, 4000); // retry connection after 4 seconds
    console.log('🔄 Connection retried');
  };

  socket.onerror = error => {
    console.error('💥 Error connecting to Finnhub WebSocket:', error);
  };
};

export const disconnect = () => {
  stopThrottling();
  socket?.close();
  socket = null;
  console.log('Disconnected from Finnhub WebSocket');
};

export const subscribe = (symbol: string) => {
  subscriptions.add(symbol);
  if (socket !== null && socket.readyState === WebSocket.OPEN) {
    socket!.send(JSON.stringify({ type: 'subscribe', symbol }));
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
