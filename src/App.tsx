import React, { useState } from 'react';
import Header from './components/header';
import UrlInput from './components/urlInput';
import QueryInput from './components/queryInput';
import OutputWindow from './components/output';
import Button from '@mui/material/Button';

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
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <p>Enter your URLs to summarize here:</p>
      <UrlInput setUrls={setUrls} />
      <QueryInput setQuery={setQuery} />
      <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      <OutputWindow isLoading={isLoading} output={output} />
    </div>
  );
};

export default App;