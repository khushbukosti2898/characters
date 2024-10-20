import React from "react";
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import Spinner from "@mui/material/CircularProgress";

interface SelectDropdownProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Array<{ label: string; value: string }>;
  isLoading?: boolean;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  isLoading = false,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {isLoading ? (
          <MenuItem sx={{ justifyContent: "center" }}>
            <Spinner size={20} thickness={2} />
          </MenuItem>
        ) : (
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};
