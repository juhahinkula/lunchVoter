import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ShowDishes({ dishes }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Show Dishes
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dishes</DialogTitle>
        <DialogContent>
        <ul>
        {
          dishes.map((dish, index) => 
            <li key={index}><Typography variant="body1">{dish.name}</Typography></li>)
        }
        </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
