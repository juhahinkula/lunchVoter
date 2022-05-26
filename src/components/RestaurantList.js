import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Ranking from './Ranking';
import Stack from '@mui/material/Stack';
import Typography  from '@mui/material/Typography';
import RestaurantCard from './RestaurantCard';
import _ from 'lodash';
import Cities from '../cities.json';

export default function RestaurantList() {
  const [city, setCity] = useState('Helsinki');
  const [todaysVotes, setTodaysVotes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [alreadyVoted, setAlreadyVoted] = useState('');

  useEffect(() => {
    fetchRestaurants();
    fetchResults();
  }, [city]);

  const fetchRestaurants = () => {
    fetch(`${process.env.REACT_APP_REST_API_URL}/api/v1/restaurants/${city}`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setRestaurants(data.restaurants);
      setAlreadyVoted(data.alreadyVoted);
    })
    .then(_ => fetchResults())
    .catch(err => console.error(err))
  }

  // Fetch results and order results by vote
  const fetchResults = () => {
    fetch(`${process.env.REACT_APP_REST_API_URL}/api/v1/results`)
    .then(res => res.json())
    .then(data => setTodaysVotes(_.orderBy(data.results, ['votes'], ['desc'])))
    .catch(err => console.error(err))
      
  }

  return(
    <>  
    <Stack direction="row" spacing={1} alignItems='center'>
      <Autocomplete
          disablePortal
          id="cities"
          options={Cities.data}
          value={city}
          onChange={(e, selectedCity) => setCity(selectedCity)}
          sx={{ width: 300, margin: 5 }}
          renderInput={(params) => <TextField {...params} label="Choose a city" />}
        />  
        <Ranking topRestaurants={todaysVotes} />
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        {
        restaurants.length > 0 ?
        <Grid container spacing={1}>
          {
            restaurants.map(restaurant => 
              <>
                <Grid item xs={3}>
                  <RestaurantCard 
                    restaurant={restaurant} 
                    fetchRestaurants={fetchRestaurants} 
                    alreadyVoted={alreadyVoted}
                  />
                </Grid>
              </>
              )
          }
        </Grid>
        :
        <Typography variant="h7">No restaurants available</Typography>
        }
      </Box>
    </>
  );
}