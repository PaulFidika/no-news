import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#009688', // Teal as the primary color
    },
    secondary: {
      main: '#ff6b6b', // Coral as the secondary color for contrast
    },
    background: {
      default: '#263238', // A deep, dark blue-gray for the main background
      paper: '#37474f', // A slightly lighter blue-gray for paper elements
    },
    text: {
      primary: '#eceff1', // A soft, light gray for text to ensure readability against the dark background
    },
  },
  spacing: 4,
});

export default theme;
