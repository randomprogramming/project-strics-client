import React from "react";
import {
  ListItem,
  Card,
  Box,
  makeStyles,
  Grid,
  Typography,
  Avatar,
} from "@material-ui/core";
import PropTypes from "prop-types";

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
  amountText: {
    color: theme.palette.primary.main,
  },
}));

export const TransactionContainer = ({
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
                <Typography variant="h5" className={classes.amountText}>
                  {purchasedAmount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </ListItem>
  );
};

TransactionContainer.propTypes = {
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
