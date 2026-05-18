import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { Error } from '../src/pages/Error/Error';

describe('Error page', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display error message and link to go back home', () => {
    render(
      <BrowserRouter>
        <Error />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/something went wrong/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name:  /back/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
