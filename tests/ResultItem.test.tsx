import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ResultItem from '../src/components/ResultArea/ResultItem/ResultItem';

describe('Result Item', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display title received from the props', () => {
    render(<ResultItem key={1} title="Little Prince" />);
    const item = screen.getByRole('listitem', { name: 'title' });

    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('Little Prince');
  });
});
