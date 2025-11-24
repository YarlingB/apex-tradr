import { useCallback, useEffect, useRef } from 'react';

interface IUseDebounceProps {
  callback: () => void;
  delay: number;
}

const useDebounce = ({ callback, delay }: IUseDebounceProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      clearTimeout(
        timeoutRef.current as unknown as ReturnType<typeof setTimeout>,
      );
      timeoutRef.current = setTimeout(
        () => callback(...(args as Parameters<typeof callback>)),
        delay,
      );
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      clearTimeout(
        timeoutRef.current as unknown as ReturnType<typeof setTimeout>,
      );
    };
  }, []);

  return debouncedCallback;
};

export default useDebounce;
