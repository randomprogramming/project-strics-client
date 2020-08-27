import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Box,
  Grid,
  Avatar,
  makeStyles,
  ListItem,
  Typography,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "auto",
  },
  card: {
    flex: 1,
  },
  fullColumnFlex: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  sellButton: {
    "&:hover": {
      color: theme.palette.success.main,
    },
    "&:active": {
      color: theme.palette.success.main,
    },
  },
  deleteButton: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&:active": {
      color: theme.palette.primary.main,
    },
  },
}));

export const InventoryItemContainer = ({
  id,
  purchasedAmount,
  purchasedDate,
  brand,
  colorway,
  shoe,
  name,
  title,
  imageUrl,
}) => {
  const classes = useStyles();

  const iconSize = 32;

  const handleSellButton = (id) => {
    console.log(id);
  };

  const handleRemoveButton = (id) => {
    console.log(id);
  };

  return (
    <ListItem disableGutters>
      <Card className={classes.card}>
        <Box p={1}>
          <Grid container>
            <Grid item xs={12} md={2}>
              {/* ITEM PICTURE */}
              <Box mx="auto" width="55%">
                <Avatar
                  className={classes.image}
                  src={imageUrl}
                  alt="inventory item"
                  variant="square"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              {/* ITEM NAME */}
              <Box className={classes.fullColumnFlex}>
                <Typography variant="h5">{brand}</Typography>
                <Typography variant="body1">
                  {shoe.replace(brand + " ", "")}
                </Typography>
                <Typography variant="body2">{name}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              {/* ACTION BUTTONS */}
              <Box className={classes.iconContainer}>
                <Box>
                  <Tooltip title="Mark as Sold">
                    <IconButton
                      className={classes.sellButton}
                      onClick={() => handleSellButton(id)}
                    >
                      <AttachMoneyRoundedIcon style={{ fontSize: iconSize }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              {/* PURCHASE DATE */}
              <Box className={classes.fullColumnFlex} textAlign="center">
                <Typography variant="body1">Purchase Date</Typography>
                <Typography variant="h5">
                  {purchasedDate.split("T")[0].replaceAll("-", "/")}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              {/* PURCHASE PRICE */}
              <Box className={classes.fullColumnFlex} textAlign="center">
                <Typography variant="body1">Money Spent</Typography>
                <Typography variant="h5" color="primary">
                  {purchasedAmount}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              {/* REMOVE BUTTON */}
              <Box className={classes.iconContainer}>
                <Tooltip title="Remove from Inventory">
                  <IconButton
                    className={classes.deleteButton}
                    onClick={() => handleRemoveButton(id)}
                  >
                    <ClearIcon style={{ fontSize: iconSize }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </ListItem>
  );
};

InventoryItemContainer.propTypes = {
  id: PropTypes.string,
  purchasedAmount: PropTypes.number,
  purchasedDate: PropTypes.string,
  brand: PropTypes.string,
  colorway: PropTypes.string,
  shoe: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
};
