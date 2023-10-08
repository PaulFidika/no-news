import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { isValidUrl } from '../utils/isValidURL';

interface UrlInputProps {
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const UrlInput: React.FC<UrlInputProps> = ({ setUrls }) => {
  const [urls, setInternalUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUrl(e.target.value);
    setIsValid(isValidUrl(e.target.value));
  };

  const handleAdd = () => {
    if (isValid) {
      setInternalUrls((prev) => [...prev, newUrl]);
      setNewUrl('');
      setUrls(urls);
    }
  };

  const handleRemove = (index: number) => {
    const newUrls = urls.filter((_, idx) => idx !== index);
    setInternalUrls(newUrls);
    setUrls(newUrls);
  };

  return (
    <div>
      {urls.map((url, index) => (
        <div
          key={index}
          style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
        >
          <TextField
            label="URL"
            variant="outlined"
            value={url}
            disabled
            style={{ flex: 1 }}
          />
          <IconButton onClick={() => handleRemove(index)} color="error">
            <CloseIcon />
          </IconButton>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="URL"
          variant="outlined"
          value={newUrl}
          onChange={handleChange}
          error={!isValid}
          helperText={!isValid && 'Please enter a valid URL'}
          style={{ flex: 1, marginRight: '8px' }} // Added margin for spacing
        />
        <Button onClick={handleAdd} variant="contained" color="primary">
          Add URL
        </Button>
      </div>
    </div>
  );
};

export default UrlInput;
