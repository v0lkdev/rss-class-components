import { it, expect, describe, vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { searchBooks } from '../src/api';

const mockFetch = vi.fn();
function mockFetchFn() {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      docs: [
        {
          title: 'Book',
          author_name: [],
          first_publish_year: 1924,
          edition_count: 1,
        },
      ],
    }),
  });
  return mockFetch;
}

describe('API', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should call fetch with correct URL and correct params', async () => {
    mockFetchFn();

    const result = await searchBooks('harry');

    expect(mockFetch).toHaveBeenCalledWith(
      `https://openlibrary.org/search.json?q=harry&page=1&limit=20`
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual([
      {
        title: 'Book',
        author: 'Unknown',
        publishYear: 1924,
        editionCount: 1,
      },
    ]);
  });

  it('should change query to "new" if its length < 3', async () => {
    mockFetchFn();

    const result = await searchBooks('a');

    expect(mockFetch).toHaveBeenCalledWith(
      `https://openlibrary.org/search.json?q=new&page=1&limit=20`
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual([
      {
        title: 'Book',
        author: 'Unknown',
        publishYear: 1924,
        editionCount: 1,
      },
    ]);
  });
});
