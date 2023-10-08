import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ReactMarkdown from 'react-markdown';

interface OutputWindowProps {
  isLoading: boolean;
  output: string;
}

const OutputWindow: React.FC<OutputWindowProps> = ({ isLoading, output }) => (
  <div>
    {isLoading ? (
      <CircularProgress />
    ) : (
      <p>
        <ReactMarkdown>{output}</ReactMarkdown>
      </p>
    )}
  </div>
);

export default OutputWindow;
