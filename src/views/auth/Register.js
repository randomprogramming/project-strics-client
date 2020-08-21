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
    paddingTop: theme.spacing(1),
  },
  linkText: {
    color: theme.palette.secondary,
  },
  statusOkText: {
    color: theme.palette.success.main,
  },
  statusErrorText: {
    color: theme.palette.error.main,
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

  const serverResponseDefault = {
    status: null,
    message: null,
  };

  const [serverResponse, setserverResponse] = useState(serverResponseDefault);
  const [isSubmitting, setisSubmitting] = useState(false);

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
    // Handle the change of each field
    setvalues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    // Handle the submit of the form
    setisSubmitting(true);
    setserverResponse(serverResponseDefault);
    event.preventDefault();

    for (let field in values) {
      if (values[field].length === 0) {
        // TODO: Create a error field to show this error and other errors
        // TODO: Send a email to the user to confirm their email
        alert("Some fields are empty.");
        return;
      }
    }

    Axios({
      method: "POST",
      url: "/api/register",
      data: values,
    })
      .then((res) => {
        setisSubmitting(false);
        setserverResponse({
          status: res.status,
          message: res.data,
        });
      })
      .catch((err) => {
        setisSubmitting(false);
        setserverResponse({
          status: err.response.status,
          message: err.response.data,
        });
      });
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
            <Typography
              className={
                serverResponse.status === 200
                  ? classes.statusOkText
                  : classes.statusErrorText
              }
              variant="body1"
            >
              {serverResponse.message}
            </Typography>
            <Box marginY={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
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
