import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface QueryInputProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const QueryInput: React.FC<QueryInputProps> = ({ setQuery }) => (
  <TextField label="Query" variant="outlined" onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} />
);

export default QueryInput;
