import React, { useState } from "react";
import { Page } from "../../components/Page";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { CustomTextField } from "./CustomTextField";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    color: theme.palette.text.primary,
  },
  linkText: {
    color: theme.palette.secondary,
  },
}));

const USERNAME = "username";
const EMAIL = "email";
const PASSWORD = "password";
const REPEATED_PASSWORD = "repeatedPassword";

export const Register = () => {
  const classes = useStyles();

  const [values, setvalues] = useState({
    [USERNAME]: "",
    [EMAIL]: "",
    [PASSWORD]: "",
    [REPEATED_PASSWORD]: "",
  });

  const textFields = [
    {
      label: "Username",
      name: USERNAME,
      type: "text",
      value: values[USERNAME],
    },
    {
      label: "Email",
      name: EMAIL,
      type: "email",
      value: values[EMAIL],
    },
    {
      label: "Password",
      name: PASSWORD,
      type: "password",
      value: values[PASSWORD],
    },
    {
      label: "Confirm Password",
      name: REPEATED_PASSWORD,
      type: "password",
      value: values[REPEATED_PASSWORD],
    },
  ];

  const handleChange = (event) => {
    setvalues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    for (let field in values) {
      if (values[field].length === 0) {
        // TODO: Create a error field to show this error and other errors
        alert("Some fields are empty.");
        break;
      }
    }

    Axios({
      method: "POST",
      url: "/api/register",
      data: values,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Page title="Register" className={classes.root}>
      <Container maxWidth="sm">
        <Box>
          <Typography color="textPrimary" variant="h2">
            Create an account
          </Typography>
        </Box>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box flexDirection="column">
            {textFields.map((field, index) => (
              <CustomTextField
                key={index}
                label={field.label}
                name={field.name}
                type={field.type}
                value={field.value}
                onChange={handleChange}
              />
            ))}
            <Box marginY={2}>
              <Button
                color="primary"
                // disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign up now
              </Button>
            </Box>
            <Typography color="textPrimary" variant="body1">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login">
                Sign in
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </Page>
  );
};
