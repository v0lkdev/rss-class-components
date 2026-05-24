import { it, expect, describe, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PaginationControls } from '../src/components/ResultArea/PaginationControls/PaginationControls';

describe('PaginationControls', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('should render pagination items based on itemsTotal and limit props', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route
            path="/:page"
            element={
              <PaginationControls
                itemsTotal={25}
                limit={10}
                onPageChange={vi.fn()}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('1');
    expect(items[1]).toHaveTextContent('2');
    expect(items[2]).toHaveTextContent('3');
  });

  it('should mark current page item as selected', () => {
    render(
      <MemoryRouter initialEntries={['/2']}>
        <Routes>
          <Route
            path="/:page"
            element={
              <PaginationControls
                itemsTotal={20}
                limit={10}
                onPageChange={vi.fn()}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const items = screen.getAllByRole('listitem');

    expect(items[0]).not.toHaveClass('selected');
    expect(items[1]).toHaveClass('selected');
  });
});
