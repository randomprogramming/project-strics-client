import React from "react";
import PropTypes from "prop-types";
import { AppBar, makeStyles, Toolbar, Box, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  toolbar: {
    height: 64,
    flexDirection: "row-reverse",
  },
}));

const TransparentTopbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const isLoggedIn = useSelector(
    (state) =>
      // If the username is defined and the username length is larger than 0, then user is logged in
      state.accountReducer.username && state.accountReducer.username.length > 0
  );

  const isSubscribed = useSelector(
    (state) => state.accountReducer.isSubscribed
  );

  return (
    <AppBar elevation={0} color="transparent" {...rest}>
      <Toolbar className={classes.toolbar}>
        {!isLoggedIn && (
          <Box>
            <Button component={Link} to="/login">
              Login
            </Button>
            <Button component={Link} to="/register">
              Register
            </Button>
          </Box>
        )}
        {isLoggedIn && isSubscribed && (
          <Box>
            <Button component={Link} to="/app/dashboard">
              Dashboard
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

TransparentTopbar.propTypes = {
  className: PropTypes.string,
};

export default TransparentTopbar;
