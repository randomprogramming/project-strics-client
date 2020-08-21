import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ListSubheader } from "@material-ui/core";
import Logo from "../../../components/Logo";
import CustomNavLink from "./CustomNavLink";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import LoyaltyRoundedIcon from "@material-ui/icons/LoyaltyRounded";

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const Navbar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const navItems = [
    {
      text: "Dashboard",
      href: "/app/dashboard",
      icon: DashboardRoundedIcon,
    },
    {
      text: "Inventory",
      href: "/app/inventory",
      icon: ViewListRoundedIcon,
    },
    {
      text: "Purchases",
      href: "/app/purchases",
      icon: ShoppingCartRoundedIcon,
    },
    {
      text: "Sales",
      href: "/app/sales",
      icon: LoyaltyRoundedIcon,
    },
  ];

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignSelf="center" p={2}>
        <Logo />
      </Box>
      <Divider />
      <Box p={2}>
        <List dense>
          {navItems.map((item) => (
            <CustomNavLink text={item.text} href={item.href} icon={item.icon} />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <div>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </div>
  );
};

Navbar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

Navbar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default Navbar;
