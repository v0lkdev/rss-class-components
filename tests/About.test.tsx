import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { About } from '../src/views/About/About';

describe('About page', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display author and course information', () => {
    render(<About />);

    expect(screen.getByText(/website author info/i)).toBeInTheDocument();
    expect(screen.getByText(/yulia volk/i)).toBeInTheDocument();
    const links = screen.getAllByRole('link', { name: 'here' });

    expect(links[0]).toHaveAttribute('href', 'https://github.com/v0lkdev');
    expect(links[1]).toHaveAttribute(
      'href',
      'https://wearecommunity.io/events/rs-react-2026q2'
    );
    expect(screen.getByText(/school react/i)).toBeInTheDocument();
  });
});
