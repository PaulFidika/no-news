import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import Header from '@/src/components/header';
import UrlInput from '@/src/components/urlInput';
import QueryInput from '@/src/components/queryInput';
import OutputWindow from '@/src/components/output';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/src/styles/theme';
import { API_Routes } from '@/src/constants';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';

const Home: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async () => {
    setIsLoading(true);

    // AWS API Gateway endpoint call
    try {
      // const response = await fetch(API_Routes.CLAUDE, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     urls,
      //     query,
      //   }),
      // });

      console.log('in client ', urls);

      const response = await fetch(API_Routes.SCRAPER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls,
          query,
        }),
      });

      // const response = await fetch(
      //   'https://your-api-id.execute-api.your-region.amazonaws.com/your-stage/your-resource',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       urls,
      //       query,
      //     }),
      //   },
      // );

      if (response.ok) {
        const responseData = await response.json();
        const { contentType, body } = responseData;

        if (
          contentType === 'application/json' &&
          body &&
          body.data &&
          Array.isArray(body.data)
        ) {
          const jsonString = String.fromCharCode.apply(null, body.data);
          const data = JSON.parse(jsonString);

          setOutput(data.completion as string);
        } else {
          console.error('Unexpected response format:', responseData);
        }
      } else {
        console.error('Server response was not ok', response.statusText);
      }
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
        maxWidth="lg"
        sx={{
          padding: isMobile ? '0px' : theme.spacing(2),
          marginLeft: isMobile ? theme.spacing(2) : 'auto', // Adjusted margin left for mobile
          marginRight: isMobile ? theme.spacing(2) : 'auto', // Adjusted margin right for mobile
          width: 'auto', // Adjusted width for responsiveness
        }}
      >
        <Grid container spacing={isMobile ? 2 : 3}>
          <Grid item xs={12}>
            <Typography variant="body1" component="div" gutterBottom>
              The president gets a daily morning briefing; why shouldn&apos;t
              you? Just:
              <ul>
                <li> specify news sources you want to keep an eye on </li>{' '}
                <li> specify what&apos;s interesting to you </li>{' '}
                <li>
                  {' '}
                  And we&apos;ll summarize everything you need to know
                  concisely.{' '}
                </li>{' '}
              </ul>{' '}
              We aim to provide concise, unbiased, relevant information for you
              every day.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ marginBottom: isMobile ? theme.spacing(2) : '0px' }}
          >
            <Paper
              sx={{
                padding: theme.spacing(2),
                backgroundColor: '#3a4047',
                borderRadius: '8px',
                // Adjust width and margin for your Grid items for responsiveness
                width: '100%',
                marginRight: theme.spacing(1),
              }}
            >
              <Typography variant="body2" component="p" gutterBottom>
                What news sites do you want to pull from?
              </Typography>
              <UrlInput setUrls={setUrls} />
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ marginBottom: isMobile ? theme.spacing(2) : '0px' }}
          >
            <Paper
              sx={{
                padding: theme.spacing(2),
                backgroundColor: '#3a4047',
                borderRadius: '8px',
                // Adjust width and margin for your Grid items for responsiveness
                width: '100%',
                marginRight: theme.spacing(1),
              }}
            >
              <Typography variant="body2" component="p" gutterBottom>
                What&apos;s relevant to you personally?
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

export default Home;
