import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ResultItemDescription from '../src/components/ResultArea/ResultItemDescription/ResultItemDescription';

describe('Result Description', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display description received from the props', () => {
    render(
      <ResultItemDescription
        key={1}
        author="Antoine de Saint-Exupéry"
        publishYear={2000}
        editionCount={5}
      />
    );
    const item = screen.getByRole('listitem', { name: 'description' });

    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent(
      /(?=.*Antoine de Saint-Exupéry)(?=.*2000)(?=.*5)/i
    );
  });
});
