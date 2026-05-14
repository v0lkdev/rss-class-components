const BOOK_API_URL = 'https://openlibrary.org/search.json';

interface SearchResponseDoc {
  title: string;
  author_name: string[];
  first_publish_year: number | string;
  edition_count: number | string;
}

interface SearchResponse {
  docs: SearchResponseDoc[];
}

export async function searchBooks(
  query: string,
  page: number = 1,
  limit: number = 20
) {
  let q = query.trim();
  if (q.length < 3) {
    q = 'new';
  }
  const response = await fetch(
    `${BOOK_API_URL}?q=${q}&page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Search failed. Please try again later');
  }
  const searchResult = (await response.json()) as SearchResponse;
  const books = searchResult.docs.map((book) => {
    return {
      title: book.title,
      author: book.author_name?.join(', ') || 'Unknown',
      publishYear: book.first_publish_year || 'Unknown',
      editionCount: book.edition_count || 'Unknown',
    };
  });
  return books;
}
