import { useState } from 'react';

export function useLocalStorage(key: string): [string, (a: string) => void] {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || '';
  });

  const [prevKey, setPrevKey] = useState(key);

  if (key !== prevKey) {
    setPrevKey(key);
    setValue(localStorage.getItem(key) || '');
  }

  function handleSetLocalStorage(localStorageValue: string) {
    localStorage.setItem(key, localStorageValue);
    setValue(localStorageValue);
  }

  return [value, handleSetLocalStorage];
}
