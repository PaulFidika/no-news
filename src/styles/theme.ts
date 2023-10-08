import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#61AFEF', // Teal as the primary color
    },
    secondary: {
      main: '#C768DD', // Purple as the secondary color for contrast
    },
    background: {
      default: '#282C34', // A deep, dark blue-gray for the main background
      paper: '#3a4047', // A slightly lighter blue-gray for paper elements
    },
    text: {
      primary: '#ABB2BF', // A soft, light gray for text to ensure readability against the dark background
    },
  },
  spacing: 4,
});

export default theme;
