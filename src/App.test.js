import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Restaurant Voter header', () => {
  render(<App />);
  const linkElement = screen.getByText(/restaurant voter/i);
  expect(linkElement).toBeInTheDocument();
});
