"use client";

import { useState, Dispatch, SetStateAction } from "react"; // 👈 'useEffect' ko import se remove kar diya

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  // 1. Directly initialize state from LocalStorage on mount
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        try {
          return JSON.parse(storedValue);
        } catch (error) {
          console.error("Localstorage parsing error: ", error);
        }
      }
    }
    return initialValue;
  });

  // 2. Custom Setter function standardly handles updates
  const setPersistedValue: Dispatch<SetStateAction<T>> = (valueOrFn) => {
    setValue((prev) => {
      const nextValue = valueOrFn instanceof Function ? valueOrFn(prev) : valueOrFn;
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(nextValue));
      }
      return nextValue;
    });
  };

  return [value, setPersistedValue];
};