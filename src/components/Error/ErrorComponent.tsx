import React from "react";
import { Typography, Button, Container } from "@mui/material";

interface ErrorComponentProps {
  onRetry: () => void;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ onRetry }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      <Typography variant="h5" color="error" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" gutterBottom>
        We encountered an error while loading the data. Please try again.
      </Typography>
      <Button variant="contained" color="primary" onClick={onRetry}>
        Retry
      </Button>
    </Container>
  );
};
