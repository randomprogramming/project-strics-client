import React from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import HomepageImage from "../static/images/homepage_item.png";
import { Page } from "../components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export const Homepage = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Project Strics">
      Homepage view
    </Page>
  );
};
