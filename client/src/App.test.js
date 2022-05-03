import App from './App';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Test clienta', () => {
  let buttonEl;
  let inputEl;
  window.HTMLElement.prototype.scrollTo = function () { };

  beforeEach(() => {
    render(<App />);
    buttonEl = screen.getByTestId("send-button");
    inputEl = screen.getByTestId("send-textarea");  
  })

  test('Zobrazení textu v inputboxu', () => { 
    user.type(inputEl, "Ahoj");
    expect(inputEl.value).toBe("Ahoj");
  });

  test('Smazání zprávy po odeslání', async () => {
    user.type(inputEl, "Ahoj");
    user.click(buttonEl);

    await waitFor(() => {
      inputEl = screen.getByTestId("send-textarea");
      expect(inputEl.value).toBe("");
    });

  });
  test('Znefunkčnění tlačítka a následné zfunkčnění', async () => {
    user.type(inputEl, "Ahoj");
    user.click(buttonEl);

    buttonEl = screen.getByTestId("send-button");

    expect(buttonEl.disabled).toBe(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    await waitFor(() => {
      buttonEl = screen.getByTestId("send-button");
      expect(buttonEl.disabled).toBe(false);
    });

  });
  test('Nezadání textu a zmáčknutí tlačítka', async () => {
    user.click(buttonEl);

    buttonEl = screen.getByTestId("send-button");

    expect(buttonEl.disabled).toBe(false); 
  });
});

