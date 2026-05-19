import { it, expect, describe, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ResultArea from '../src/components/ResultArea/ResultArea';
import { BrowserRouter } from 'react-router-dom';

describe('ResultArea', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display No books found text when there were no books array received it props', () => {
    render(
      <BrowserRouter>
        <ResultArea books={[]} />
      </BrowserRouter>
    );
    const note = screen.getByText(/no/i);

    expect(note).toBeInTheDocument();
    expect(note).toHaveTextContent(/no books/i);
  });

  it('should display books list when there are any books received it props', () => {
    render(
      <BrowserRouter>
        <ResultArea
          books={[
            {
              bookId: '1',
              title: 'Little Women',
              author: 'Louisa May Alcott',
              publishYear: 1848,
              editionCount: 1888,
            },
            {
              bookId: '2',
              title: 'A Little Princess',
              author: 'Frances Hodgson Burnett',
              publishYear: 1905,
              editionCount: 305,
            },
            {
              bookId: '3',
              title: 'A Little Life',
              author:
                'Hanya Yanagihara, Oliver Wyman, Koen Tachelet, Ivo van Hove',
              publishYear: 2008,
              editionCount: 38,
            },
          ]}
        />
      </BrowserRouter>
    );

    const titleItems = screen.getAllByRole('listitem', { name: 'title' });
    const descriptionItems = screen.getAllByRole('listitem', {
      name: 'description',
    });

    expect(titleItems).toHaveLength(3);
    titleItems.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(descriptionItems).toHaveLength(3);
    descriptionItems.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
