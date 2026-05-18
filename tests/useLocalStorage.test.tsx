import { it, expect, describe, afterEach } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { useLocalStorage } from '../src/components/useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('should return empty string when key is not in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('currentSearchValue'));

    expect(result.current[0]).toBe('');
  });

  it('should return stored value and update localStorage on setter call', () => {
    localStorage.setItem('currentSearchValue', 'books');

    const { result } = renderHook(() => useLocalStorage('currentSearchValue'));

    act(() => {
      result.current[1]('new books');
    });

    expect(result.current[0]).toBe('new books');
    expect(localStorage.getItem('currentSearchValue')).toBe('new books');
  });

  it('should read value from localStorage when key prop changes', () => {
    localStorage.setItem('key-a', 'value-a');
    localStorage.setItem('key-b', 'value-b');

    const { result, rerender } = renderHook(
      ({ storageKey }) => useLocalStorage(storageKey),
      { initialProps: { storageKey: 'key-a' } }
    );

    expect(result.current[0]).toBe('value-a');

    rerender({ storageKey: 'key-b' });

    expect(result.current[0]).toBe('value-b');
  });
});
