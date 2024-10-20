import React from "react";
import { Typography } from "@mui/material";

interface HomeworldDetailsProps {
  label: string;
  value: string;
}

export const HomeworldDetails: React.FC<HomeworldDetailsProps> = ({
  label,
  value,
}) => {
  return (
    <Typography variant="h6" mt={2}>
      <strong>{label}:</strong> {value}
    </Typography>
  );
};
