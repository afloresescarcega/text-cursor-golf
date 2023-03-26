import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MainTextInput } from './MainTextInput';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('MainTextInput', () => {
  test('renders with initial state', () => {
    render(<MainTextInput />, container);

    const mainTextInput = container.querySelector('#mainTextInput');
    const keyDisplay = container.querySelector('#key-display');
    const counter = container.querySelector('#counter');
    
    expect(mainTextInput.value).toBe('The quick brown jumps fox over the lazy dog');
    expect(keyDisplay.value).toBe('');
    expect(counter.value).toBe('0');
  });

  test('updates background color to red when goal is not reached', () => {
    render(<MainTextInput />, container);

    const mainTextInput = container.querySelector('#mainTextInput');

    mainTextInput.value = 'The quick brown jumps fox over the lazy dog';
    mainTextInput.dispatchEvent(new Event('change'));
    expect(mainTextInput.style.backgroundColor).toBe('red');
  });
});
