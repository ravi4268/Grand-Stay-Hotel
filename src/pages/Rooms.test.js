import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Rooms from './Rooms';

beforeEach(() => {
  localStorage.clear();
});

test('toggles a room status to booked when the status button is clicked', async () => {
  render(<Rooms />);

  const statusButtons = screen.getAllByRole('button', { name: /status/i });
  await userEvent.click(statusButtons[0]);

  const bookedLabels = await screen.findAllByText(/^Booked$/i);
  expect(bookedLabels.length).toBeGreaterThan(0);
});
