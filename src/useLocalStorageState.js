import { useState, useEffect } from "react";

export const useLocalStorage = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
