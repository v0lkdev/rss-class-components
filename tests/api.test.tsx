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
      num_found: 1,
      docs: [
        {
          title: 'Book',
          author_name: [],
          first_publish_year: 1924,
          edition_count: 1,
          key: 'id',
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

    const result = await searchBooks('harry', 1, 10);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://openlibrary.org/search.json?q=harry&page=1&limit=10`
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(
      {
        "books": [
          {
            "author": "Unknown",
            "bookId": "id",
            "editionCount": 1,
            "publishYear": 1924,
            "title": "Book",
          },
        ],
        "booksFoundTotal": 1,
      },
    );
  });

  it('should change query to "new" if its length < 3', async () => {
    mockFetchFn();

    const result = await searchBooks('a', 1, 10);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://openlibrary.org/search.json?q=new&page=1&limit=10`
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(
      {
        "books": [
          {
            "author": "Unknown",
            "bookId": "id",
            "editionCount": 1,
            "publishYear": 1924,
            "title": "Book",
          },
        ],
        "booksFoundTotal": 1,
      },
    );
  });
});
