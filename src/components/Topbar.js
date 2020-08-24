import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Hidden,
  IconButton,
  Box,
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
        <Box>
          <IconButton color="inherit" onClick={onLogoutButtonClick}>
            <ExitToAppRoundedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default Topbar;
