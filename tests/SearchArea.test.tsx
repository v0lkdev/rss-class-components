import { it, expect, describe, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import SearchArea from '../src/components/SearchArea/SearchArea';

describe('SearchArea', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render Search button and input field with pre-defined value on app launch', () => {
    render(
      <SearchArea
        searchQuery="book"
        onChange={vi.fn()}
        onClick={vi.fn()}
        buttonIsDisabled={true}
      />
    );

    const input = screen.getByRole('textbox');
    const btn = screen.getByRole('button', { name: 'Search' });

    expect(input).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(input).toHaveValue('book');
  });

  describe('input field', () => {
    afterEach(() => {
      cleanup();
    });

    it("should render empty input field if there's empty Search query value", () => {
      render(
        <SearchArea
          searchQuery=""
          onChange={vi.fn()}
          onClick={vi.fn()}
          buttonIsDisabled={true}
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    it('should pass entered by user value via onChange function ', async () => {
      const handleOnChange = vi.fn();

      render(
        <SearchArea
          searchQuery=""
          onChange={handleOnChange}
          onClick={vi.fn()}
          buttonIsDisabled={true}
        />
      );
      const input = screen.getByRole('textbox');
      const user = userEvent.setup();

      await user.type(input, 'text1');

      expect(handleOnChange).toHaveBeenCalledTimes(5);
      expect(handleOnChange).toHaveBeenNthCalledWith(1, 't');
      expect(handleOnChange).toHaveBeenNthCalledWith(2, 'e');
      expect(handleOnChange).toHaveBeenNthCalledWith(3, 'x');
      expect(handleOnChange).toHaveBeenNthCalledWith(4, 't');
      expect(handleOnChange).toHaveBeenNthCalledWith(5, '1');
    });

    it('should display received from props value in the input field ', async () => {
      const { rerender } = render(
        <SearchArea
          searchQuery="great"
          onChange={vi.fn()}
          onClick={vi.fn()}
          buttonIsDisabled={true}
        />
      );
      const input = screen.getByRole('textbox');

      rerender(
        <SearchArea
          searchQuery="new query"
          onChange={vi.fn()}
          onClick={vi.fn()}
          buttonIsDisabled={true}
        />
      );

      expect(input).toHaveValue('new query');
    });
  });

  describe('Search button', () => {
    afterEach(() => {
      cleanup();
    });

    it('should make Search button disabled when gets buttonIsDisabled true prop', () => {
      render(
        <SearchArea
          searchQuery=""
          onChange={vi.fn()}
          onClick={vi.fn()}
          buttonIsDisabled={true}
        />
      );
      const btn = screen.getByRole('button', { name: 'Search' });

      expect(btn).toBeDisabled();
    });

    it('should make Search button enabled when gets buttonIsDisabled false prop', () => {
      render(
        <SearchArea
          searchQuery=""
          onChange={vi.fn()}
          onClick={vi.fn()}
          buttonIsDisabled={false}
        />
      );
      const btn = screen.getByRole('button', { name: 'Search' });

      expect(btn).not.toBeDisabled();
    });
  });
});
