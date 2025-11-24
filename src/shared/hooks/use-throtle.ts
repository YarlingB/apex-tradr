import { useRef, useCallback } from 'react';

interface IUseThrottleProps {
  callback: () => void;
  delay: number;
}

const useThrottle = ({ callback, delay }: IUseThrottleProps) => {
  const lastExecutedRef = useRef<number>(0);

  const throttledCallback = useCallback(
    (...args: unknown[]) => {
      const now = Date.now();

      if (now - lastExecutedRef.current >= delay) {
        lastExecutedRef.current = now;
        callback(...(args as Parameters<typeof callback>));
      }
    },
    [callback, delay],
  );

  return throttledCallback;
};

export default useThrottle;
