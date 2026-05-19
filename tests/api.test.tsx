import { it, expect, describe, vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {
  searchBooks,
  searchSelectedBook,
  searchSelectedBookDescription,
  searchBookCover,
} from '../src/api';

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
    expect(result).toEqual({
      books: [
        {
          author: 'Unknown',
          bookId: 'id',
          editionCount: 1,
          publishYear: 1924,
          title: 'Book',
        },
      ],
      booksFoundTotal: 1,
    });
  });

  it('should change query to "new" if its length < 3', async () => {
    mockFetchFn();

    const result = await searchBooks('a', 1, 10);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://openlibrary.org/search.json?q=new&page=1&limit=10`
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      books: [
        {
          author: 'Unknown',
          bookId: 'id',
          editionCount: 1,
          publishYear: 1924,
          title: 'Book',
        },
      ],
      booksFoundTotal: 1,
    });
  });

  it('should throw error when searchBooks response is not ok', async () => {
    mockFetchFn();
    mockFetch.mockResolvedValue({ ok: false });

    await expect(searchBooks('harry', 1, 10)).rejects.toThrow(
      'Search failed. Please try again later'
    );
  });

  it('should return cover URL for searchBookCover', () => {
    expect(searchBookCover(42)).toBe(
      'https://covers.openlibrary.org/b/id/42-L.jpg'
    );
  });

  it('should call fetch with correct URL and return selected book data', async () => {
    mockFetchFn();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        docs: [
          {
            title: 'Selected Book',
            author_name: ['Author One'],
            first_publish_year: 1999,
            language: ['eng', 'fre'],
            cover_i: 55,
            key: '/works/OL123W',
          },
        ],
      }),
    });

    const result = await searchSelectedBook('OL123W');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://openlibrary.org/search.json?q=/works/OL123W'
    );
    expect(result).toEqual({
      title: 'Selected Book',
      author: 'Author One',
      publishYear: 1999,
      language: 'eng, fre',
      coverId: 55,
    });
  });

  it('should return fallback values when selected book has optional fields missing', async () => {
    mockFetchFn();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        docs: [
          {
            title: 'Minimal Book',
            key: '/works/OL123W',
          },
        ],
      }),
    });

    const result = await searchSelectedBook('OL123W');

    expect(result).toEqual({
      title: 'Minimal Book',
      author: 'Unknown',
      publishYear: 'Unknown',
      language: "0 or we don't have such information",
      coverId: null,
    });
  });

  it('should throw error when searchSelectedBook response is not ok', async () => {
    mockFetchFn();
    mockFetch.mockResolvedValue({ ok: false });

    await expect(searchSelectedBook('OL123W')).rejects.toThrow(
      'Search failed. Please try again later'
    );
  });

  it('should throw error when searchSelectedBook cannot find book in docs', async () => {
    mockFetchFn();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ docs: [{ key: '/works/OTHER', title: 'Other' }] }),
    });

    await expect(searchSelectedBook('OL123W')).rejects.toThrow(
      'Search failed. Please try again later'
    );
  });

  it('should return string description from searchSelectedBookDescription', async () => {
    mockFetchFn();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ description: 'Plain description' }),
    });

    const result = await searchSelectedBookDescription('OL123W');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://openlibrary.org/works/OL123W.json'
    );
    expect(result).toBe('Plain description');
  });

  it('should return description value when description is an object', async () => {
    mockFetchFn();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ description: { value: 'Object description' } }),
    });

    const result = await searchSelectedBookDescription('OL123W');

    expect(result).toBe('Object description');
  });

  it('should return fallback text when description is missing', async () => {
    mockFetchFn();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const result = await searchSelectedBookDescription('OL123W');

    expect(result).toBe('Sorry, no description available 😔');
  });

  it('should throw error when searchSelectedBookDescription response is not ok', async () => {
    mockFetchFn();
    mockFetch.mockResolvedValue({ ok: false });

    await expect(searchSelectedBookDescription('OL123W')).rejects.toThrow(
      'Search failed. Please try again later'
    );
  });
});
