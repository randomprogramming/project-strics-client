import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Hidden,
  IconButton,
  Box,
  Typography,
  Grid,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { logoutAccount } from "../state/actions/accountActions";

const useStyles = makeStyles(() => ({
  toolbar: {
    height: 64,
  },
}));

const Topbar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.accountReducer.username);
  const loggedIn = useSelector((state) => state.accountReducer.loggedIn);

  const onLogoutButtonClick = () => {
    dispatch(logoutAccount());
  };

  return (
    <AppBar elevation={10} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Box flex={1}></Box>
        {loggedIn ? (
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box height="100%" display="flex" alignItems="center">
                  <Typography variant="body1">{username}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <IconButton color="inherit" onClick={onLogoutButtonClick}>
                  <ExitToAppRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography variant="body1">You are not Logged In</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default Topbar;
