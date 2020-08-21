import React, { useState } from "react";
import Navbar from "./Navbar";
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
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    padding: `${theme.spacing(3)}px 0`,
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
    <div className={classes.root}>
      <Topbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <Navbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
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

export default DashboardLayout;
