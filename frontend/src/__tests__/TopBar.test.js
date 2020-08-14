import React from 'react';
import { render } from '@testing-library/react';
import SideBar from '../components/SideBar';

test('renders learn react link', () => {
  const { getByText, getByTestId } = render(<App />);
  const linkElement = getByTestId(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
