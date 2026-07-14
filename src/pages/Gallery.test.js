import { render, screen } from '@testing-library/react';
import Gallery from './Gallery';

test('renders a larger responsive gallery with more image cards and filters', () => {
  render(<Gallery />);

  expect(screen.getByText(/Hotel Media Gallery/i)).toBeInTheDocument();
  expect(screen.getByText(/AC Hotel Reception/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Wellness/i })).toBeInTheDocument();
  expect(screen.getByText(/City Skyline Balcony View/i)).toBeInTheDocument();
  expect(screen.getByText(/Luxury Spa Suite/i)).toBeInTheDocument();
  expect(screen.getAllByRole('img').length).toBeGreaterThan(8);
});
