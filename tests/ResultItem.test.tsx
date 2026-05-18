import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import ResultItem from '../src/components/ResultArea/ResultItem/ResultItem';

describe('Result Item', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display title received from the props', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route
            path="/:page"
            element={
              <ResultItem bookId="/works/1" title="Little Prince" active={false} />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const item = screen.getByRole('listitem', { name: 'title' });

    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('Little Prince');
  });

  it('should add selected class when active prop is true', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route
            path="/:page"
            element={
              <ResultItem bookId="/works/1" title="Little Prince" active={true} />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('listitem', { name: 'title' })).toHaveClass(
      'selected'
    );
  });

  it('should navigate to book works route on item click', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route
            path="/:page"
            element={
              <>
                <ResultItem
                  bookId="/works/OL123W"
                  title="Little Prince"
                  active={false}
                />
                <Outlet />
              </>
            }
          >
            <Route
              path="works/:bookId"
              element={<div>Book details</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('listitem', { name: 'title' }));

    expect(await screen.findByText('Book details')).toBeInTheDocument();
  });
});
