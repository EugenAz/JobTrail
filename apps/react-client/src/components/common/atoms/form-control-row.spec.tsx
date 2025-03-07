import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormControlRow } from './form-control-row';

describe('FormControlRow', () => {
  it('renders the label correctly', () => {
    render(
      <FormControlRow
        label="Test Label"
        htmlFor="test-input"
        control={({ controlClassName }) => (
          <input id="test-input" className={controlClassName} />
        )}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('applies the correct class to the control', () => {
    render(
      <FormControlRow
        label="Test Label"
        htmlFor="test-input"
        control={({ controlClassName }) => (
          <input id="test-input" className={controlClassName} />
        )}
      />
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass(
      'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
    );
  });

  it('renders the control element', () => {
    render(
      <FormControlRow
        label="Test Label"
        htmlFor="test-input"
        control={({ controlClassName }) => (
          <input id="test-input" className={controlClassName} />
        )}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
