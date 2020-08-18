import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Hidden,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(() => ({
  toolbar: {
    height: 64,
  },
}));

const Topbar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar elevation={10} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default Topbar;
