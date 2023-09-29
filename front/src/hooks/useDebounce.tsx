import { useEffect } from "react";

export default function useDebounce(cb: () => void, value: string, delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => {
      if (value) {
        cb();
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
}
