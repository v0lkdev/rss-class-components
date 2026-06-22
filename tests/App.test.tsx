import { it, expect, describe, vi, afterEach } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
vi.mock('../src/store', () => ({
  useGetBooksQuery: vi.fn(),
}));
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useGetBooksQuery } from '../src/store';

vi.mock('react-loader-spinner', () => ({
  Hourglass: () => <div>Spinner</div>,
}));

import App from '../src/views/App/App';

const defaultQueryResult = {
  data: { books: [], booksFoundTotal: 0 },
  error: undefined,
  isFetching: false,
  refetch: vi.fn(),
};

describe('App integration tests', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should update input value when user types', async () => {
    vi.mocked(useGetBooksQuery).mockReturnValue(defaultQueryResult);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, 'text1');

    expect(input).toHaveValue('text1');
  });

  it('should trim Search query, then save it to localStorage and trigger search callback with correct parameters on Search button click', async () => {
    vi.mocked(useGetBooksQuery).mockReturnValue(defaultQueryResult);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const spySetItem = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();

    await user.type(input, '     to trim   ');
    await user.click(searchBtn);

    expect(spySetItem).toHaveBeenCalledWith('currentSearchValue', 'to trim');
    expect(localStorage.getItem('currentSearchValue')).toBe('to trim');
    expect(useGetBooksQuery).toHaveBeenCalledWith(
      expect.objectContaining({ query: 'to trim', page: 1, limit: 10 })
    );
  });

  it('should NOT set localStorage value and should NOT trigger search callback when new search is the same as the previous', async () => {
    vi.mocked(useGetBooksQuery).mockReturnValue(defaultQueryResult);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const spySetItem = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();

    await user.type(input, 'one');
    await user.click(searchBtn);

    await user.type(input, '1');
    await user.type(input, '{backspace}');
    await user.click(searchBtn);

    expect(useGetBooksQuery).toHaveBeenCalledWith(
      expect.objectContaining({ query: '', page: 1, limit: 10 })
    );
    expect(spySetItem).toHaveBeenCalledExactlyOnceWith(
      'currentSearchValue',
      'one'
    );
    expect(localStorage.getItem('currentSearchValue')).toBe('one');
    expect(useGetBooksQuery).toHaveBeenCalledWith(
      expect.objectContaining({ query: 'one', page: 1, limit: 10 })
    );
    expect(spySetItem).toHaveBeenCalledTimes(1);
  });

  it('should display unknown error message when searchBooks rejects with non-Error value', async () => {
    vi.mocked(useGetBooksQuery).mockReturnValue({
      data: undefined,
      error:
        "Oops! Something went wrong. We couldn't load the results. Please try again. Error: Unknown error",
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<App />} />
        </Routes>
      </MemoryRouter>
    );
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const user = userEvent.setup();

    await user.click(searchBtn);

    expect(await screen.findByText(/unknown error/i)).toBeInTheDocument();
  });

  it('should display error message when searchBooks rejects', async () => {
    vi.mocked(useGetBooksQuery).mockReturnValue({
      data: undefined,
      error:
        "Oops! Something went wrong. We couldn't load the results. Please try again. Error: Search failed. Please try again later",
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<App />} />
        </Routes>
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const user = userEvent.setup();

    await user.type(input, 'error query');
    await user.click(searchBtn);

    expect(
      await screen.findByText(/oops! something went wrong/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/search failed\. please try again later/i)
    ).toBeInTheDocument();
  });

  it('should trigger search with new page when pagination item is clicked', async () => {
    vi.mocked(useGetBooksQuery).mockReturnValue({
      data: {
        books: [
          {
            title: 'Book',
            author: 'Author',
            publishYear: 2000,
            editionCount: 1,
            bookId: '/works/1',
          },
        ],
        booksFoundTotal: 25,
      },
      error: undefined,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<App />} />
        </Routes>
      </MemoryRouter>
    );
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const user = userEvent.setup();

    await user.click(searchBtn);
    await screen.findAllByRole('listitem');

    const paginationList = screen.getAllByRole('list')[2];
    await user.click(within(paginationList).getByText('2'));

    expect(useGetBooksQuery).toHaveBeenLastCalledWith(
      expect.objectContaining({ query: '', page: 2, limit: 10 })
    );
  });

  it('should make Search button disabled when loading is in progress', async () => {
    vi.mocked(useGetBooksQuery).mockImplementation(({ query }) => {
      if (query === 'little') {
        return {
          data: undefined,
          error: undefined,
          isFetching: true,
          refetch: vi.fn(),
        };
      }
      return defaultQueryResult;
    });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const user = userEvent.setup();

    await user.type(input, 'little');
    await user.click(searchBtn);

    expect(await screen.findByText(/spinner/i)).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(searchBtn).toBeDisabled();
  });
});
