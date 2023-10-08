import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface InterestInputProps {
  setInterests: React.Dispatch<React.SetStateAction<string>>;
}

const InterestInput: React.FC<InterestInputProps> = ({ setInterests }) => (
  <TextField label="Interests" variant="outlined" onChange={(e: ChangeEvent<HTMLInputElement>) => setInterests(e.target.value)} />
);

export default InterestInput;
