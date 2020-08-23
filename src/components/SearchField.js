import React from "react";
import { Box, Card, TextField, InputAdornment } from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";

export const SearchField = ({
  onChange,
  value,
  placeholder,
  debounceTimeout,
}) => {
  return (
    <Box p={2} maxWidth="600px">
      <DebounceInput
        debounceTimeout={debounceTimeout}
        onChange={(e) => onChange(e)}
        value={value}
        placeholder={placeholder}
        element={TextField}
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

SearchField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  debounceTimeout: PropTypes.number,
};