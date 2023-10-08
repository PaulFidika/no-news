import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

const Header: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <Icon>your_icon_here</Icon>
      </IconButton>
      <Typography variant="h6">NoNews.ai</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
