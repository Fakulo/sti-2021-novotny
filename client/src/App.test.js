import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Chat from './Chat.js';

test('jaký je čas', () => {
  const { getByTestId } = render(<App />);
  const inputEl = getByTestId("send-textarea");

  window.HTMLElement.prototype.scrollTo = function() {};

  fireEvent.change(inputEl, {
    target: {
      value: "ahoj"
    }
  });

  expect(inputEl.value).toBe("ahoj");
});

