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

const App: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');

  const handleSubmit = async () => {
    setIsLoading(true);
    // Do your API call here and setOutput
    // const response = await fetch('your-api-endpoint', { method: 'POST', body: JSON.stringify({ urls, query }) });
    // setOutput(await response.json());
    setOutput('Your output will appear here.');
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
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" component="p" gutterBottom>
              The president gets a daily morning briefing; why shouldn't you?
              Just:
              <ul><li> specify news sources you want to keep an eye on </li> <li> specify
              what's interesting to you </li> <li> And we'll summarize everything you
              need to know concisely. </li> </ul> We aim to provide concise, unbiased,
              relevant information for you every day.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" component="p" gutterBottom>
              What news sites do you want to pull from?
            </Typography>
            <UrlInput setUrls={setUrls} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" component="p" gutterBottom>
              What's relevant to you personally?
            </Typography>
            <QueryInput setQuery={setQuery} />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth // This makes the button full width
              style={{ marginTop: theme.spacing(2) }} // Adds some space above the button
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
