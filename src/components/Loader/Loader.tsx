import React from 'react';
import Spinner from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <Spinner
      sx={{
        position: 'relative',
        top: '50%',
        left: 'calc(50% - 50px)',
      }}
    />
  );
};

export default Loader;
