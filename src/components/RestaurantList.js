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
import { fetchRestaurants, fetchResults } from '../services/services';

export default function RestaurantList() {
  const [city, setCity] = useState('Helsinki');
  const [todaysVotes, setTodaysVotes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [alreadyVoted, setAlreadyVoted] = useState('');

  useEffect(() => {
    loadRestaurants();
    loadResults();
  }, [city]);

  const loadRestaurants = () => {
    fetchRestaurants(city)
    .then(data => {
      setRestaurants(data.restaurants);
      setAlreadyVoted(data.alreadyVoted);
    })
    .then(_ => loadResults())
    .catch(err => console.error(err))
  }

  // Fetch results and order results by vote
  const loadResults = () => {
    fetchResults()
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
                    loadRestaurants={loadRestaurants} 
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
