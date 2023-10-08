import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface OutputWindowProps {
  isLoading: boolean;
  data: string;
}

const OutputWindow: React.FC<OutputWindowProps> = ({ isLoading, data }) => (
  <div>
    {isLoading ? <CircularProgress /> : <p>{data}</p>}
  </div>
);

export default OutputWindow;
