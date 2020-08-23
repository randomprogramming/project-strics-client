import React from "react";
import { Outlet } from "react-router";
import { makeStyles, Container } from "@material-ui/core";
import TransparentTopbar from "../../components/TransparentTopbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    overflow: "auto",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    // 64 is the height of the AppBar, do NOT change this
    paddingTop: 64,
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    marginTop: theme.spacing(3),
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
  },
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TransparentTopbar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <Container maxWidth="xl" className={classes.content}>
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
