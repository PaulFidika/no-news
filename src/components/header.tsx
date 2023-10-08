import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Container from '@mui/material/Container';

const Header: React.FC = () => (
  <AppBar position="static">
    <Toolbar style={{ justifyContent: 'left' }}>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <NewspaperIcon />
      </IconButton>
      <Typography variant="h6">NoNews.ai</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
