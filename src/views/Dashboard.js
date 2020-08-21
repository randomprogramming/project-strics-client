import React from "react";
import { Page } from "../components/Page";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
}));

export const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      Hello world
    </Page>
  );
};
