import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import jest from 'jest';
import { InputComponent, NumberInputComponent } from './component';

it('Single use of the hook', () => {
  render(<InputComponent />);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'hello' } });
  expect(input.value).toBe('hello');
});

it('Single use of the hook with empty string', () => {
  render(<InputComponent />);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: '' } });
  expect(input.value).toBe('');
});


it('Use of the hook with debounce value', () => {
  render(<InputComponent debounce={800} />);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Hello' } });
  expect(input.value).toBe('');
});

it('Use of hook with trim', () => {
  render(<InputComponent trim={true}/>);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'hello    ' } });
  expect(input.value).toBe('hello');
});

it('Use of hook with a custom parser function', () => {
  render(<InputComponent parser={(text) => text.toUpperCase()}/>);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'hello' } });
  expect(input.value).toBe('HELLO');
});

it('Use of hook to parse as number', () => {
  render(<NumberInputComponent />);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: '4' } });
  const out = screen.getByRole('out');
  expect(out.title).toBe('number');
});