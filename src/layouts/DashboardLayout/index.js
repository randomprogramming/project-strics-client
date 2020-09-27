import React, { useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { makeStyles, Container } from "@material-ui/core";
import Topbar from "../../components/Topbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    // 64 is the height of the AppBar, do NOT change this
    paddingTop: 64,
    // 256 is the width of the Drawer, do NOT change this
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();

  const loggedIn = useSelector((state) => state.accountReducer.loggedIn);
  const subscribed = useSelector((state) => state.accountReducer.subscribed);

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  // Check if user is logged in or not and if user is subsribed or not
  return loggedIn ? (
    subscribed ? (
      <div className={classes.root}>
        <Topbar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <Navbar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <Container maxWidth="xl" className={classes.content}>
            <Outlet />
          </Container>
        </div>
      </div>
    ) : (
      // TODO: Get a component for this
      <div>Please Subscribe to access this site.</div>
    )
  ) : (
    // TODO: Get a component for this
    <div>Please Log in to access this site.</div>
  );
};

export default DashboardLayout;
