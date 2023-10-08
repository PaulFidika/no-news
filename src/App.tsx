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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <p>Enter your URLs to summarize here:</p>
          <UrlInput setUrls={setUrls} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <QueryInput setQuery={setQuery} />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <OutputWindow isLoading={isLoading} output={output} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
