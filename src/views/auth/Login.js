import React, { useState } from "react";
import { Page } from "../../components/Page";
import {
  makeStyles,
  Container,
  Box,
  Typography,
  Link,
  Button,
} from "@material-ui/core";
import Axios from "axios";
import { CustomTextField } from "./CustomTextField";
import { Link as RouterLink } from "react-router-dom";
import { LOGIN } from "../../API";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(3),
  },
  linkText: {
    color: theme.palette.secondary,
  },
  statusOkText: {
    color: theme.palette.success.dark,
  },
  statusErrorText: {
    color: theme.palette.primary.main,
  },
}));

const USERNAME = "username";
const PASSWORD = "password";

export const Login = () => {
  const classes = useStyles();

  const [values, setvalues] = useState({
    [USERNAME]: "",
    [PASSWORD]: "",
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
      label: "Password",
      name: PASSWORD,
      type: "password",
      value: values[PASSWORD],
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
      url: LOGIN,
      withCredentials: true,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      // I tried sending a object with username and password and the server didn't
      // like that, so I guess this is the way it's going to be.
      data: `username=${values[USERNAME]}&password=${values[PASSWORD]}`,
    })
      .then((res) => {
        setisSubmitting(false);
        setserverResponse({
          status: res.status,
          message: "Login successful. You will be redirected shortly.",
        });
        // We have 2 options here:
        // 1. We do a 'soft' redirect, without refresing the page, to the dasboard link
        // AND we fetch the user data from the server again with redux dispatch
        // 2. We do a hard redirect, which forces the app to reload, and completely re-mount
        // Since the app autimatically fetches info abut the user when it mounts, in this case
        // we don't have to fetch the info using redux after login
        // TODO: Redirect to the purchase page if theyre not subscribed
        setTimeout(() => {
          window.location = "/app/dashboard";
        }, 700);
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
    <Page title="Login" className={classes.root}>
      <Container maxWidth="sm">
        <Box>
          <Typography color="textPrimary" variant="h2">
            Sign in
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Sign in to access your dashboard
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
                Sign in now
              </Button>
            </Box>
            <Typography color="textPrimary" variant="body1">
              Don't have an account?{" "}
              <Link component={RouterLink} to="/register">
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </Page>
  );
};
