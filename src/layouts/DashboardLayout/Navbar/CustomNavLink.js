import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { ListItem, Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    width: "100%",
    justifyContent: "flex-start",
  },
  activeLink: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[10],
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const CustomNavLink = ({ text, href, icon: Icon }) => {
  const classes = useStyles();

  return (
    <ListItem disableGutters>
      <Button
        component={NavLink}
        className={classes.link}
        activeClassName={classes.activeLink}
        to={href}
      >
        {Icon && <Icon size="20" className={classes.icon} />}
        <span>{text}</span>
      </Button>
    </ListItem>
  );
};

CustomNavLink.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
};

export default CustomNavLink;
