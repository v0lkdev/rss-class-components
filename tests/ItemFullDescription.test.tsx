import { it, expect, describe, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
vi.mock('../src/store', () => ({
  useGetSelectedBookQuery: vi.fn(),
  useGetSelectedBookDescriptionQuery: vi.fn(),
}));
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  useGetSelectedBookDescriptionQuery,
  useGetSelectedBookQuery,
} from '../src/store';
import { ItemFullDescription } from '../src/components/ResultArea/ItemFullDescription/ItemFullDescription';

const defaultBook = {
  title: 'Little Prince',
  author: 'Antoine de Saint-Exupéry',
  publishYear: 1943,
  language: 'fre',
  coverId: 123,
};

describe('ItemFullDescription', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('should call book queries with undefined when bookId param is missing', () => {
    vi.mocked(useGetSelectedBookQuery).mockReturnValue({
      data: undefined,
      isFetching: false,
      refetch: vi.fn(),
    });
    vi.mocked(useGetSelectedBookDescriptionQuery).mockReturnValue({
      data: undefined,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/2']}>
        <Routes>
          <Route path="/:page" element={<ItemFullDescription />} />
        </Routes>
      </MemoryRouter>
    );

    expect(useGetSelectedBookQuery).toHaveBeenCalledWith(undefined);
    expect(useGetSelectedBookDescriptionQuery).toHaveBeenCalledWith(undefined);
  });

  it('should display loading state and then book details when data is loaded', async () => {
    vi.mocked(useGetSelectedBookQuery).mockReturnValue({
      data: defaultBook,
      isFetching: false,
      refetch: vi.fn(),
    });
    vi.mocked(useGetSelectedBookDescriptionQuery).mockReturnValue({
      data: 'A story about a prince',
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/2/works/OL123W']}>
        <Routes>
          <Route
            path="/:page/works/:bookId"
            element={<ItemFullDescription />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Little Prince')).toBeInTheDocument();
    expect(screen.getByText(/Antoine de Saint-Exupéry/i)).toBeInTheDocument();
    expect(screen.getByText('A story about a prince')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'book cover' })).toHaveAttribute(
      'src',
      'https://covers.openlibrary.org/b/id/123-L.jpg'
    );
    expect(useGetSelectedBookQuery).toHaveBeenCalledWith('OL123W');
    expect(useGetSelectedBookDescriptionQuery).toHaveBeenCalledWith('OL123W');
  });

  it('should display loading state while book data is fetching', () => {
    vi.mocked(useGetSelectedBookQuery).mockReturnValue({
      data: undefined,
      isFetching: true,
      refetch: vi.fn(),
    });
    vi.mocked(useGetSelectedBookDescriptionQuery).mockReturnValue({
      data: undefined,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/2/works/OL123W']}>
        <Routes>
          <Route
            path="/:page/works/:bookId"
            element={<ItemFullDescription />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should use stub cover when book has no coverId', async () => {
    vi.mocked(useGetSelectedBookQuery).mockReturnValue({
      data: {
        title: 'No Cover Book',
        author: 'Unknown',
        publishYear: 'Unknown',
        language: "0 or we don't have such information",
        coverId: null,
      },
      isFetching: false,
      refetch: vi.fn(),
    });
    vi.mocked(useGetSelectedBookDescriptionQuery).mockReturnValue({
      data: 'No description',
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/1/works/OL999W']}>
        <Routes>
          <Route
            path="/:page/works/:bookId"
            element={<ItemFullDescription />}
          />
        </Routes>
      </MemoryRouter>
    );

    const cover = await screen.findByRole('img', { name: 'book cover' });

    expect(cover).toHaveAttribute(
      'src',
      '/stub-book-cover.jpg'
    );
  });

  it('should navigate to current page on close button click', async () => {
    vi.mocked(useGetSelectedBookQuery).mockReturnValue({
      data: {
        title: 'Book',
        author: 'Author',
        publishYear: 2000,
        language: 'eng',
        coverId: null,
      },
      isFetching: false,
      refetch: vi.fn(),
    });
    vi.mocked(useGetSelectedBookDescriptionQuery).mockReturnValue({
      data: 'Description',
      isFetching: false,
      refetch: vi.fn(),
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/2/works/OL123W']}>
        <Routes>
          <Route
            path="/:page/works/:bookId"
            element={<ItemFullDescription />}
          />
          <Route path="/2" element={<div>Page 2 list</div>} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText('Book');
    await user.click(screen.getByRole('button', { name: 'X' }));

    expect(await screen.findByText('Page 2 list')).toBeInTheDocument();
  });
});
