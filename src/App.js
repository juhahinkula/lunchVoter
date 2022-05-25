import './App.css';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RestaurantList from './components/RestaurantList';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <React.Fragment>
    <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Restaurant Voter
            </Typography>
          </Toolbar>
        </AppBar>
        <RestaurantList />
      </Container>
    </React.Fragment>
  );
}

export default App;
