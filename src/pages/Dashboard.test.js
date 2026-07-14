import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './Dashboard';

test('renders the reception desk overview and CCTV surveillance view', () => {
  render(<Dashboard />);

  expect(screen.getByRole('heading', { name: /reception desk/i })).toBeInTheDocument();
  expect(screen.getByText(/book new stay/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /cctv surveillance/i })).toBeInTheDocument();
});

test('lets the user toggle CCTV monitoring from the dashboard', () => {
  render(<Dashboard />);

  expect(screen.getByText(/monitoring active/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /pause monitoring/i }));

  expect(screen.getByText(/monitoring paused/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /resume monitoring/i })).toBeInTheDocument();
});

test('shows a larger full-view preview for the selected CCTV camera', () => {
  render(<Dashboard />);

  expect(screen.getAllByRole('button', { name: /full view/i }).length).toBeGreaterThan(0);
});
