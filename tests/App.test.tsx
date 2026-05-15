import { it, expect, describe, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
vi.mock('../src/api', () => ({
  searchBooks: vi.fn(),
}));
import userEvent from '@testing-library/user-event';
import { searchBooks } from '../src/api';

vi.mock('react-loader-spinner', () => ({
  Hourglass: () => <div>Spinner</div>,
}));

import App from '../src/pages/App/App';

describe('App integration tests', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should update input value when user types', async () => {
    vi.mocked(searchBooks).mockResolvedValue([]);
    render(<App />);
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, 'text1');

    expect(input).toHaveValue('text1');
  });

  it('should trim Search query, then save it to localStorage and trigger search callback with correct parameters on Search button click', async () => {
    vi.mocked(searchBooks).mockResolvedValue([]);
    render(<App />);
    const input = screen.getByRole('textbox');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const spySetItem = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();

    await user.type(input, '     to trim   ');
    await user.click(searchBtn);

    expect(spySetItem).toHaveBeenCalledWith('currentSearchValue', 'to trim');
    expect(localStorage.getItem('currentSearchValue')).toBe('to trim');
    expect(searchBooks).toHaveBeenCalledWith('to trim');
  });

  it('should NOT set localStorage value and should NOT trigger search callback when new search is the same as the previous', async () => {
    vi.mocked(searchBooks).mockResolvedValue([]);
    render(<App />);
    const input = screen.getByRole('textbox');
    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const spySetItem = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();

    await user.type(input, 'one');
    await user.click(searchBtn);

    await user.type(input, '1');
    await user.type(input, '{backspace}');
    await user.click(searchBtn);

    expect(searchBooks).toHaveBeenNthCalledWith(1, '');
    expect(spySetItem).toHaveBeenCalledExactlyOnceWith(
      'currentSearchValue',
      'one'
    );
    expect(localStorage.getItem('currentSearchValue')).toBe('one');
    expect(searchBooks).toHaveBeenNthCalledWith(2, 'one');
    expect(searchBooks).toHaveBeenCalledTimes(2);
  });

  it('should make Search button disabled when loading is in progress', async () => {
    vi.mocked(searchBooks).mockImplementation(() => new Promise(() => {}));
    render(<App />);
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
