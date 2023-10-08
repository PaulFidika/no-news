import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface UrlInputProps {
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const UrlInput: React.FC<UrlInputProps> = ({ setUrls }) => {
  const [url, setUrl] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setIsValid(e.target.value.startsWith('http://') || e.target.value.startsWith('https://'));
  };

  const handleAdd = () => {
    if (isValid) setUrls((prev) => [...prev, url]);
  };

  return (
    <div>
      <TextField label="URL" variant="outlined" value={url} onChange={handleChange} error={!isValid} helperText={!isValid && 'Please enter a valid URL'} />
      <Button onClick={handleAdd} variant="contained" color="primary">Add URL</Button>
    </div>
  );
};

export default UrlInput;
