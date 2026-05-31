import { it, expect, describe, vi, afterEach } from 'vitest';
import { booksApi, store } from '../src/store';

function createFetchResponse(data: unknown, ok = true) {
  return new Response(JSON.stringify(data), {
    status: ok ? 200 : 500,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('store', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    store.dispatch(booksApi.util.resetApiState());
  });

  describe('getBooks endpoint', () => {
    it('should transform search response into books list', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(
          createFetchResponse({
            num_found: 1,
            docs: [
              {
                title: 'Little Women',
                author_name: ['Louisa May Alcott'],
                first_publish_year: 1868,
                edition_count: 100,
                key: '/works/OL123W',
              },
            ],
          })
        )
      );

      const result = await store.dispatch(
        booksApi.endpoints.getBooks.initiate({
          query: 'women',
          page: 1,
          limit: 10,
        })
      );

      expect(result.data).toEqual({
        books: [
          {
            title: 'Little Women',
            author: 'Louisa May Alcott',
            publishYear: 1868,
            editionCount: 100,
            bookId: '/works/OL123W',
          },
        ],
        booksFoundTotal: 1,
      });
    });

    it('should use Unknown fallback values when optional book fields are missing', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(
          createFetchResponse({
            num_found: 1,
            docs: [
              {
                title: 'Untitled',
                key: '/works/OL999W',
              },
            ],
          })
        )
      );

      const result = await store.dispatch(
        booksApi.endpoints.getBooks.initiate({
          query: 'untitled',
          page: 1,
          limit: 10,
        })
      );

      expect(result.data?.books[0]).toEqual({
        title: 'Untitled',
        author: 'Unknown',
        publishYear: 'Unknown',
        editionCount: 'Unknown',
        bookId: '/works/OL999W',
      });
    });

    it('should request search with provided query, page and limit params', async () => {
      const fetchMock = vi
        .fn()
        .mockResolvedValue(createFetchResponse({ num_found: 0, docs: [] }));
      vi.stubGlobal('fetch', fetchMock);

      await store.dispatch(
        booksApi.endpoints.getBooks.initiate({
          query: 'react',
          page: 3,
          limit: 10,
        })
      );

      const request = fetchMock.mock.calls[0][0] as Request;

      expect(request.url).toBe(
        'https://openlibrary.org/search.json?q=react&page=3&limit=10'
      );
    });

    it('should return formatted unknown error message when request fails', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(createFetchResponse('Server error', false))
      );

      const result = await store.dispatch(
        booksApi.endpoints.getBooks.initiate({
          query: 'fail',
          page: 1,
          limit: 10,
        })
      );

      expect(result.error).toBe(
        "Oops! Something went wrong. We couldn't load the results. Please try again. Error: Unknown error"
      );
    });
  });

  describe('getSelectedBook endpoint', () => {
    it('should transform selected book response', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(
          createFetchResponse({
            docs: [
              {
                title: 'Little Prince',
                author_name: ['Antoine de Saint-Exupéry'],
                first_publish_year: 1943,
                language: ['fre'],
                cover_i: 123,
                key: '/works/OL123W',
              },
            ],
          })
        )
      );

      const result = await store.dispatch(
        booksApi.endpoints.getSelectedBook.initiate('OL123W')
      );

      expect(result.data).toEqual({
        title: 'Little Prince',
        author: 'Antoine de Saint-Exupéry',
        publishYear: 1943,
        language: 'fre',
        coverId: 123,
      });
    });

    it('should use fallback values when optional selected book fields are missing', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(
          createFetchResponse({
            docs: [
              {
                title: 'No Details',
                key: '/works/OL555W',
              },
            ],
          })
        )
      );

      const result = await store.dispatch(
        booksApi.endpoints.getSelectedBook.initiate('OL555W')
      );

      expect(result.data).toEqual({
        title: 'No Details',
        author: 'Unknown',
        publishYear: 'Unknown',
        language: "0 or we don't have such information",
        coverId: null,
      });
    });

    it('should reject when selected book is not found in response', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(
          createFetchResponse({
            docs: [
              {
                title: 'Other Book',
                key: '/works/OL999W',
              },
            ],
          })
        )
      );

      const result = await store.dispatch(
        booksApi.endpoints.getSelectedBook.initiate('OL123W')
      );

      expect(result.error).toMatchObject({
        message: 'Search failed. Please try again later',
        name: 'Error',
      });
    });
  });

  describe('getSelectedBookDescription endpoint', () => {
    it('should return string description as is', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(
          createFetchResponse({
            description: 'A classic story',
          })
        )
      );

      const result = await store.dispatch(
        booksApi.endpoints.getSelectedBookDescription.initiate('OL123W')
      );

      expect(result.data).toBe('A classic story');
    });

    it('should extract description value from object response', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(
          createFetchResponse({
            description: { value: 'Description from object' },
          })
        )
      );

      const result = await store.dispatch(
        booksApi.endpoints.getSelectedBookDescription.initiate('OL123W')
      );

      expect(result.data).toBe('Description from object');
    });

    it('should return fallback text when description is missing', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(createFetchResponse({}))
      );

      const result = await store.dispatch(
        booksApi.endpoints.getSelectedBookDescription.initiate('OL123W')
      );

      expect(result.data).toBe('Sorry, no description available 😔');
    });
  });
});
