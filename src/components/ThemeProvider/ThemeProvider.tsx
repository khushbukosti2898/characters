import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { themeSelector } from 'src/redux/slices/themeSlice';
import { GlobalStyles } from '@mui/material';

// Define color constants for light and dark modes
const LIGHT_MODE = {
  background: '#ffffff',
  text: '#000000',
};

const DARK_MODE = {
  background: '#121212',
  text: '#ffffff',
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isDarkMode = useSelector(themeSelector);

  // Create memoized theme to avoid unnecessary recalculations
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode],
  );

  // Use appropriate colors based on the current mode
  const currentColors = isDarkMode ? DARK_MODE : LIGHT_MODE;

  return (
    <MUIThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            backgroundColor: currentColors.background,
            color: currentColors.text,
          },
        }}
      />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
