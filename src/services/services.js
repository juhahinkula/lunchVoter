// Fetch restaurants by city
export const fetchRestaurants = (city) => {
  const request = fetch(`${process.env.REACT_APP_REST_API_URL}/api/v1/restaurants/${city}`, {
    method: 'GET',
    credentials: 'include'
  });
  
  return request.then(res => res.json());
}

// Fetch todays voting results
export const fetchResults = () => {
  const request = fetch(`${process.env.REACT_APP_REST_API_URL}/api/v1/results`);

  return  request.then(res => res.json())
}

// Send vote to restaurant
export const sendVote = (id) => {
  return fetch(`${process.env.REACT_APP_REST_API_URL}/api/v1/vote/${id}`, {
    method: 'POST',
    credentials: 'include'
  })
}