import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface QueryInputProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const QueryInput: React.FC<QueryInputProps> = ({ setQuery }) => (
  <TextField
    id="outlined-textarea"
    label="Query"
    placeholder="AI news and Meta Quest"
    multiline
    fullWidth
    maxRows={7}
  />
);

export default QueryInput;
