import React from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import HomepageImage from "../static/images/homepage_item.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export const Homepage = () => {
  const classes = useStyles();

  return <div className={classes.root}>Homepage view</div>;
};
