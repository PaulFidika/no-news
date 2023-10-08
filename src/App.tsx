import React, { useState } from 'react';
import Header from './components/header';
import UrlInput from './components/urlInput';
import InterestInput from './components/interestInput';
import OutputWindow from './components/output';
import Button from '@mui/material/Button';

const App: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [interests, setInterests] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<string>('');

  const handleSubmit = async () => {
    setIsLoading(true);
    // Do your API call here and setData
    // For example, adjust to your actual API call:
    // const response = await fetch('your-api-endpoint', { method: 'POST', body: JSON.stringify({ urls, interests }) });
    // setData(await response.json());
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <p>Enter your URLs to summarize here:</p>
      <UrlInput setUrls={setUrls} />
      <InterestInput setInterests={setInterests} />
      <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      <OutputWindow isLoading={isLoading} data={data} />
    </div>
  );
};

export default App;