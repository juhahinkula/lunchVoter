import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import ShowDishes from './ShowDishes';
import { sendVote } from '../services/services';

export default function RestaurantCard({ restaurant, loadRestaurants, alreadyVoted }) {  
  const [open, setOpen] = React.useState(false);

  const voteClicked = () => {
    if (alreadyVoted) {
      if (window.confirm('You have already voted. Do you want to do it again?'))
        vote();
    }
    else {
      vote();
    }
  }

  const vote = () => {
    sendVote(restaurant.id)
    .then(response => {
      if (response.ok) {
        setOpen(true);
        loadRestaurants();
      }
      else {
        alert('Something went wrong in voting!');
      }
    })
  }

  return (
    <>
    <Badge badgeContent={restaurant.votes} color="primary">
    <Card variant="outlined" sx={{ width: 250 }}>
      <CardContent>
        <Typography variant="h7" gutterBottom>
          {restaurant.name}
        </Typography>
        <Typography variant="body2">
          Open: {restaurant.openingHours}
        </Typography>
          {
            restaurant.dishes.length > 0 ?
            <ShowDishes dishes={restaurant.dishes}/> :
            <Typography variant="body2">No dishes available</Typography>
          }
      </CardContent>
      <CardActions>
        { alreadyVoted === restaurant.id ?
          <Tooltip title="Remove your vote">
            <IconButton 
              size="small"
              color="success"
              onClick={vote}>
                <ThumbUpIcon />
            </IconButton> 
          </Tooltip>
          :
          <Tooltip title="Give your vote">
            <IconButton 
                size="small"
                color="primary"
                onClick={voteClicked}>
                  <ThumbUpIcon />
            </IconButton>
          </Tooltip>
        }
      </CardActions>
    </Card>
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
      message="Thanks for voting!"
    />
    </Badge>
    </>
  );
}