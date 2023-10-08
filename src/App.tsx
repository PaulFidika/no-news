import React, { useState } from 'react';
import Header from './components/header';
import UrlInput from './components/urlInput';
import QueryInput from './components/queryInput';
import OutputWindow from './components/output';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';

const App: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async () => {
    setIsLoading(true);

    // AWS API Gateway endpoint call
    try {
      const response = await fetch(
        'https://your-api-id.execute-api.your-region.amazonaws.com/your-stage/your-resource',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            urls,
            query,
          }),
        },
      );

      const data = (await response.json()) as string;
      setOutput(data);
    } catch (error: unknown) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container
        component="main"
        maxWidth={false}
        style={{ width: '800px', margin: 'auto' }}
      >
        <Grid container spacing={isMobile ? 0 : 3}>
          <Grid item xs={12}>
            <Typography variant="body1" component="p" gutterBottom>
              {/* Your introductory text here */}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              style={{
                padding: theme.spacing(2),
                backgroundColor: '#5e4e5e',
                borderRadius: '8px',
              }}
            >
              <Typography variant="body2" component="p" gutterBottom>
                What news sites do you want to pull from?
              </Typography>
              <UrlInput setUrls={setUrls} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              style={{
                padding: theme.spacing(2),
                backgroundColor: '#5e4e5e',
                borderRadius: '8px',
              }}
            >
              <Typography variant="body2" component="p" gutterBottom>
                What's relevant to you personally?
              </Typography>
              <QueryInput setQuery={setQuery} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: theme.spacing(2) }}
            >
              Submit Query
            </Button>
          </Grid>
          <Grid item xs={12}>
            <OutputWindow isLoading={isLoading} output={output} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
