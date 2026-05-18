const BOOK_API_URL = 'https://openlibrary.org';
const COVER_API_URL = 'https://covers.openlibrary.org/b/id';

interface SearchBooksResponseDoc {
  title: string;
  author_name: string[];
  first_publish_year: number | string;
  edition_count: number | string;
  key: string;
}

interface SearchBooksResponse {
  num_found: number;
  docs: SearchBooksResponseDoc[];
}

export async function searchBooks(query: string, page: number, limit: number) {
  let q = query.trim();
  if (q.length < 3) {
    q = 'new';
  }
  const response = await fetch(
    `${BOOK_API_URL}/search.json?q=${q}&page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Search failed. Please try again later');
  }
  const searchResult = (await response.json()) as SearchBooksResponse;
  const booksFoundTotal = searchResult.num_found;
  const books = searchResult.docs.map((book) => {
    return {
      title: book.title,
      author: book.author_name?.join(', ') || 'Unknown',
      publishYear: book.first_publish_year || 'Unknown',
      editionCount: book.edition_count || 'Unknown',
      bookId: book.key,
    };
  });
  return { books, booksFoundTotal };
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

export interface Book {
  title: string;
  author: string;
  publishYear: number | string;
  language: string;
  coverId: number | null;
}

export async function searchSelectedBook(bookId: string): Promise<Book> {
  const response = await fetch(`${BOOK_API_URL}/search.json?q=works/${bookId}`);
  if (!response.ok) {
    throw new Error('Search failed. Please try again later');
  }
  const searchResult = (await response.json()) as SearchSelectedBookResponse;
  const book = searchResult.docs.find((book) => book.key.includes(bookId));
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
}

export function searchBookCover(coverId: string | number) {
  return `${COVER_API_URL}/${coverId}-L.jpg`;
}

interface searchSelectedBookDescriptionResponse {
  description: string | { value: string };
}

export async function searchSelectedBookDescription(bookId: string) {
  const response = await fetch(`${BOOK_API_URL}/works/${bookId}.json`);
  if (!response.ok) {
    throw new Error('Search failed. Please try again later');
  }
  const searchResult =
    (await response.json()) as searchSelectedBookDescriptionResponse;
  const description = searchResult.description;
  if (!description) {
    return 'Sorry, no description available 😔';
  }
  if (typeof description !== 'string') {
    return description.value;
  }

  return description;
}
