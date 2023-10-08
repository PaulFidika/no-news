import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface QueryInputProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const QueryInput: React.FC<QueryInputProps> = ({ setQuery }) => (
  <TextField
    id="query-input"
    label="Query"
    placeholder="AI news and Meta Quest"
    multiline
    fullWidth
    maxRows={7}
    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
  />
);

export default QueryInput;
