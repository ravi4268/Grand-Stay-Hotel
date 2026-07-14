import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './pages/Dashboard';
import PeoplePage from './pages/PeoplePage';
import CarParkingPage from './pages/CarParkingPage';

beforeEach(() => {
  localStorage.clear();
});

test('renders the current members staying section', () => {
  render(<Dashboard />);

  expect(screen.getByText(/members staying now/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /sanidhya/i })).toBeInTheDocument();
});

test('renders the dedicated people staying page', () => {
  localStorage.setItem('hotel_bookings', JSON.stringify([
    { id: 1, guest: 'Sanidhya', room: '101', checkIn: '2026-06-01', checkOut: '2026-06-05', status: 'Checked In' }
  ]));

  render(<PeoplePage />);

  expect(screen.getByText(/people staying in the hotel/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /sanidhya/i })).toBeInTheDocument();
});

test('allows adding a new guest from the people page', async () => {
  render(<PeoplePage />);

  userEvent.type(screen.getByLabelText(/guest name/i), 'Aisha');
  userEvent.type(screen.getByLabelText(/room number/i), '205');
  userEvent.type(screen.getByLabelText(/check in/i), '2026-06-10');
  userEvent.type(screen.getByLabelText(/check out/i), '2026-06-12');
  userEvent.selectOptions(screen.getByLabelText(/status/i), 'Checked In');
  userEvent.click(screen.getByRole('button', { name: /add guest/i }));

  expect(await screen.findByText(/aisha/i)).toBeInTheDocument();
  expect(screen.getByText(/room 205/i)).toBeInTheDocument();
});

test('shows no parked cars on first load and only the booked one after adding it', async () => {
  render(<CarParkingPage />);

  expect(screen.queryByText(/rahul sharma/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/neha verma/i)).not.toBeInTheDocument();

  userEvent.type(screen.getByLabelText(/owner name/i), 'Mina Khan');
  userEvent.type(screen.getByLabelText(/vehicle plate/i), 'DL 07 MN 4567');
  userEvent.type(screen.getByLabelText(/parking slot/i), 'G-15');
  userEvent.type(screen.getByLabelText(/entry time/i), '02:30 PM');
  userEvent.click(screen.getByRole('button', { name: /add vehicle/i }));

  expect(await screen.findByText(/mina khan/i)).toBeInTheDocument();
  expect(screen.getByText(/dl 07 mn 4567/i)).toBeInTheDocument();
  expect(screen.queryByText(/rahul sharma/i)).not.toBeInTheDocument();
});

test('shows parking CCTV controls on the parking management page', () => {
  render(<CarParkingPage />);

  expect(screen.getByRole('heading', { name: /parking cctv/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /pause monitoring/i })).toBeInTheDocument();
});
