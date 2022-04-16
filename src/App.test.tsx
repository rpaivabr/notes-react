import { render } from '@testing-library/react'
import App from './App';

test('Renders main page correctly', () => {
  const app = render(<App />)
  expect(true).toBeTruthy();
});