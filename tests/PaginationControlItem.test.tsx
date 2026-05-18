import { it, expect, describe, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PaginationControlItem } from '../src/components/ResultArea/PaginationControlItem/PaginationControlItem';

describe('PaginationControlItem', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('should display page number received from the props', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route
            path="/:page"
            element={
              <PaginationControlItem
                page={2}
                onClick={vi.fn()}
                selected={false}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const item = screen.getByRole('listitem');

    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('2');
  });

  it('should add selected class when selected prop is true', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route
            path="/:page"
            element={
              <PaginationControlItem page={1} onClick={vi.fn()} selected={true} />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('listitem')).toHaveClass('selected');
  });

  it('should call onClick and navigate to selected page on item click', async () => {
    const handleOnClick = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route
            path="/:page"
            element={
              <PaginationControlItem
                page={3}
                onClick={handleOnClick}
                selected={false}
              />
            }
          />
          <Route path="/3" element={<div>Page 3</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByText('3'));

    expect(handleOnClick).toHaveBeenCalledExactlyOnceWith(3);
    expect(await screen.findByText('Page 3')).toBeInTheDocument();
  });
});
