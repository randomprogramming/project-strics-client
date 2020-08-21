import React from "react";
import PropTypes from "prop-types";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  labelText: {
    color: theme.palette.text.primary,
  },
}));

export const CustomTextField = ({ label, name, type, value, onChange }) => {
  const classes = useStyles();

  return (
    <TextField
      fullWidth
      label={label}
      margin="normal"
      name={name}
      onChange={(e) => onChange(e)}
      type={type}
      value={value}
      InputLabelProps={{
        classes: {
          root: classes.labelText,
        },
      }}
      variant="outlined"
    />
  );
};

CustomTextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
