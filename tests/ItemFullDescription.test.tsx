import { it, expect, describe, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
vi.mock('../src/api', () => ({
  searchSelectedBook: vi.fn(),
  searchSelectedBookDescription: vi.fn(),
  searchBookCover: vi.fn(),
}));
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  searchSelectedBook,
  searchSelectedBookDescription,
  searchBookCover,
} from '../src/api';
import { ItemFullDescription } from '../src/components/ResultArea/ItemFullDescription/ItemFullDescription';

describe('ItemFullDescription', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('should not fetch book data when bookId param is missing', () => {
    render(
      <MemoryRouter initialEntries={['/2']}>
        <Routes>
          <Route path="/:page" element={<ItemFullDescription />} />
        </Routes>
      </MemoryRouter>
    ); 

    expect(searchSelectedBook).not.toHaveBeenCalled();
    expect(searchSelectedBookDescription).not.toHaveBeenCalled();
  });

  it('should display loading state and then book details when data is loaded', async () => {
    vi.mocked(searchSelectedBook).mockResolvedValue({
      title: 'Little Prince',
      author: 'Antoine de Saint-Exupéry',
      publishYear: 1943,
      language: 'fre',
      coverId: 123,
    });
    vi.mocked(searchSelectedBookDescription).mockResolvedValue(
      'A story about a prince'
    );
    vi.mocked(searchBookCover).mockReturnValue(
      'https://covers.openlibrary.org/b/id/123-L.jpg'
    );

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

    expect(await screen.findByText('Little Prince')).toBeInTheDocument();
    expect(screen.getByText(/Antoine de Saint-Exupéry/i)).toBeInTheDocument();
    expect(screen.getByText('A story about a prince')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'book cover' })).toHaveAttribute(
      'src',
      'https://covers.openlibrary.org/b/id/123-L.jpg'
    );
    expect(searchSelectedBook).toHaveBeenCalledWith('OL123W');
    expect(searchSelectedBookDescription).toHaveBeenCalledWith('OL123W');
  });

  it('should use stub cover when book has no coverId', async () => {
    vi.mocked(searchSelectedBook).mockResolvedValue({
      title: 'No Cover Book',
      author: 'Unknown',
      publishYear: 'Unknown',
      language: "0 or we don't have such information",
      coverId: null,
    });
    vi.mocked(searchSelectedBookDescription).mockResolvedValue('No description');

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
      '../../../../public/stub-book-cover.jpg'
    );
    expect(searchBookCover).not.toHaveBeenCalled();
  });

  it('should navigate to current page on close button click', async () => {
    vi.mocked(searchSelectedBook).mockResolvedValue({
      title: 'Book',
      author: 'Author',
      publishYear: 2000,
      language: 'eng',
      coverId: null,
    });
    vi.mocked(searchSelectedBookDescription).mockResolvedValue('Description');

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
