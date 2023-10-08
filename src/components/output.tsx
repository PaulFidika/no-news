import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface OutputWindowProps {
  isLoading: boolean;
  output: string;
}

const OutputWindow: React.FC<OutputWindowProps> = ({ isLoading, output }) => (
  <div>
    {isLoading ? <CircularProgress /> : <p>{output}</p>}
  </div>
);

export default OutputWindow;
