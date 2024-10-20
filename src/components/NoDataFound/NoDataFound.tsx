import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material'; // Import an icon for better visual appeal

interface NoDataFoundProps {
  info: string;
}

export const NoDataFound: React.FC<NoDataFoundProps> = ({ info }) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100%"
      spacing={2}
      sx={{ textAlign: 'center', padding: 3 }}
    >
      <SearchIcon fontSize="large" color="action" />
      <Typography variant="h6" color="text.secondary">
        No data found for "{info}"
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Try adjusting your search
      </Typography>
    </Stack>
  );
};
