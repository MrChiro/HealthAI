import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Healthcare Access
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Chat
        </Button>
        <Button color="inherit" component={Link} to="/user-dashboard">
          User Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/practitioner-dashboard">
          Practitioner Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;