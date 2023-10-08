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
  // State for the current list of URLs
  const [urls, setInternalUrls] = useState<string[]>([]);
  // State for the new URL input
  const [newUrl, setNewUrl] = useState<string>('');
  // State to track if the input URL is valid
  const [isValid, setIsValid] = useState<boolean>(true);

  // Handler for when the new URL input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUrl(e.target.value);
    // Check if URL is valid and update the isValid state accordingly
    setIsValid(isValidUrl(e.target.value));
  };

  // Handler for adding a new URL to the list
  const handleAdd = () => {
    // Check if the URL is valid and total URLs are less than 5 before adding
    if (isValid && urls.length < 5) {
      setInternalUrls((prev) => [...prev, newUrl]);
      // Reset the new URL input after adding
      setNewUrl('');
      // Update the parent component's URLs state
      setUrls(urls);
    }
  };

  // Handler for removing a URL from the list
  const handleRemove = (index: number) => {
    // Filter out the URL that needs to be removed
    const newUrls = urls.filter((_, idx) => idx !== index);
    setInternalUrls(newUrls);
    // Update the parent component's URLs state
    setUrls(newUrls);
  };

  return (
    <div>
      {/* Map through the list of URLs and display them */}
      {urls.map((url, index) => (
        <div
          key={index}
          style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
        >
          <TextField
            id="url-input"
            label="URL"
            placeholder="techcrunch.com"
            value={url}
            disabled
            style={{ flex: 1 }}
          />
          {/* Button to remove a URL */}
          <IconButton onClick={() => handleRemove(index)} color="error">
            <CloseIcon />
          </IconButton>
        </div>
      ))}

      {/* Only display the new URL input and add button if total URLs are less than 5 */}
      {urls.length < 5 && (
        <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="URL"
          variant="outlined"
          value={newUrl}
          onChange={handleChange}
          error={!isValid}
          placeholder={newUrl === '' ? "techcrunch.com" : undefined}
          helperText={!isValid && 'Please enter a valid URL'}
          style={{ flex: 1, marginRight: '8px' }}
        />
        {/* Button to add a new URL */}
        <Button onClick={handleAdd} variant="contained" color="primary">
          Add URL
        </Button>
      </div>
      </form>
      )}
    </div>
  );
};

export default UrlInput;
