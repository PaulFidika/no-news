import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#333333',
      paper: '#424242',
    },
    text: {
      primary: '#d0d0d0',
    },
  },
  spacing: 4,
});

export default theme;
