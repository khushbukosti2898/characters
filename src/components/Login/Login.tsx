import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  Container,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Lock, Person } from '@mui/icons-material';
import { useAuth } from 'src/hooks/useAuth';

export const Login: React.FC = () => {
  const { login, error } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '420px',
          }}
        >
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <Box mb={2}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
              />
            </Box>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: 'bold',
                backgroundColor: '#3f51b5',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};
