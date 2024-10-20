import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/slices/authSlice";
import { themeSelector, toggleTheme } from "src/redux/slices/themeSlice";

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(themeSelector);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  const handleLogout = () => {
    dispatch(logout()); // Perform logout action
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Star Wars Characters
        </Typography>

        <Box display="flex" alignItems="center">
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={handleToggle}
                  color="primary"
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={isDarkMode ? "Dark Mode" : "Light Mode"}
            />
          </Box>
          <Button color="inherit" startIcon={<Logout />} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
