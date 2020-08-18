import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { makeStyles } from "@material-ui/core";
import Topbar from "../../components/Topbar";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div>
      <Topbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <Navbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
