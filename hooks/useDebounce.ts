import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, delay ?? 1000);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return currentValue;
};
