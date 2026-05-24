import { it, expect, describe, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
vi.mock('../src/api', () => ({
  searchBooks: vi.fn(),
}));
import ErrorBtn from '../src/components/ErrorBtn/ErrorBtn';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';

vi.mock('react-loader-spinner', () => ({
  Hourglass: () => <div>Spinner</div>,
}));

describe('Error boundary', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('shows error on Error btn click', async () => {
    render(
      <ErrorBoundary fallback={<div>Oops</div>}>
        <ErrorBtn />
      </ErrorBoundary>
    );
    const errorbtn = screen.getByRole('button', { name: /error/i });

    const user = userEvent.setup();
    await user.click(errorbtn);
    const errorText = await screen.findByText(/oops/i);

    expect(errorText).toBeInTheDocument();
  });
});
