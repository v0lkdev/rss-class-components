import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SearchBooksResponseDoc {
  title: string;
  author_name: string[];
  first_publish_year: number | string;
  edition_count: number | string;
  key: string;
}

interface SearchBooksAPIResponse {
  num_found: number;
  docs: SearchBooksResponseDoc[];
}

interface SearchSelectedBookResponseDoc {
  title: string;
  author_name: string[];
  first_publish_year: number | string;
  language: string[];
  cover_i: number | null;
  key: string;
}

interface SearchSelectedBookResponse {
  docs: SearchSelectedBookResponseDoc[];
}

interface Book {
  title: string;
  author: string;
  publishYear: number | string;
  language: string;
  coverId: number | null;
}

interface searchSelectedBookDescriptionResponse {
  description: string | { value: string };
}

interface SearchBooksResponse {
  books: {
    title: string;
    author: string;
    publishYear: number | string;
    editionCount: number | string;
    bookId: string;
  }[];
  booksFoundTotal: number;
}

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://openlibrary.org' }),
  endpoints: (build) => ({
    getBooks: build.query<
      SearchBooksResponse,
      { query: string; page: number; limit: number }
    >({
      query: ({ query, page, limit }) => {
        let q = query.trim();
        if (q.length < 3) {
          q = 'new';
        }
        return {
          url: '/search.json',
          params: {
            q: query,
            page,
            limit,
          },
        };
      },
      transformResponse: (response: SearchBooksAPIResponse) => {
        const booksFoundTotal = response.num_found;
        const books = response.docs.map((book) => {
          return {
            title: book.title,
            author: book.author_name?.join(', ') || 'Unknown',
            publishYear: book.first_publish_year || 'Unknown',
            editionCount: book.edition_count || 'Unknown',
            bookId: book.key,
          };
        });
        return { books, booksFoundTotal };
      },
      transformErrorResponse: (error: unknown) => {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        return `Oops! Something went wrong. We couldn't load the results. Please try again. Error: ${message}`;
      },
    }),
    getSelectedBook: build.query<Book, string>({
      query: (bookId) => `/search.json?q=/works/${bookId}`,
      transformResponse: (response: SearchSelectedBookResponse, _, bookId) => {
        const book = response.docs.find((book) => book.key.includes(bookId));
        if (!book) {
          throw new Error('Search failed. Please try again later');
        }
        return {
          title: book.title,
          author: book.author_name?.join(', ') || 'Unknown',
          publishYear: book.first_publish_year || 'Unknown',
          language: book.language
            ? book.language.join(', ')
            : "0 or we don't have such information",
          coverId: book.cover_i || null,
        };
      },
    }),
    getSelectedBookDescription: build.query<string, string>({
      query: (bookId) => `/works/${bookId}.json`,
      transformResponse: (response: searchSelectedBookDescriptionResponse) => {
        const description = response.description;
        if (!description) {
          return 'Sorry, no description available 😔';
        }
        if (typeof description !== 'string') {
          return description.value;
        }
        return description;
      },
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSelectedBookDescriptionQuery,
  useGetSelectedBookQuery,
} = booksApi;

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});
