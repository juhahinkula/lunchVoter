import { render, screen, fireEvent } from '@testing-library/react';
import RestaurantList from './components/RestaurantList';
import RestaurantCard from './components/RestaurantCard';

test('renders restaurant list', () => {
  render(<RestaurantList />);
  const linkElement = screen.getByLabelText('Choose a city');
  expect(linkElement).toBeInTheDocument();
});

test('renders restaurant card with mock data', () => {
  const mockData = {
    dishes: [],
    id: "a6f64b57271dd2136233fb30de065f86cba24622a78fe77cc2da7547ed535513",
    name: "NOM Helsinki",
    openingHours: "11-13:30",
    votes: 2   
  }
  render(<RestaurantCard restaurant={mockData} fetchRestaurants={null} alreadyVoted={null}/>);
  const linkElement = screen.getByText('NOM Helsinki');
  expect(linkElement).toBeInTheDocument();
});

