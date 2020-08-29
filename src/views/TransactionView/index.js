import React, { useState, useEffect } from "react";
import { Page } from "../../components/Page";
import PropTypes from "prop-types";
import {
  makeStyles,
  Typography,
  CircularProgress,
  List,
  ListItem,
  Box,
} from "@material-ui/core";
import Axios from "axios";
import { PURHCASES, SALES } from "../../API";
import { TransactionContainer } from "./TransactionContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },
}));

const TransactionView = ({ title, purchases, sales }) => {
  const classes = useStyles();
  const [transactions, settransactions] = useState({
    data: [],
    length: 0,
  });
  const [isFetching, setisFetching] = useState(false);

  useEffect(() => {
    setisFetching(true);
    Axios({
      method: "GET",
      // This may be a bit confusing but what we are doing here is checking if the
      // site we are currently on is the sales or purchases site
      // if purchases is defined and is true, then we want to set the axios url to PURCHASE
      // if sales is defined and is true, we want to set the axios url to SALES
      // PURCHASES and SALES are constants exported from API.js
      // purchases and sales are props
      url: (purchases && PURHCASES) || (sales && SALES),
    })
      .then((res) => {
        setisFetching(false);
        settransactions(res.data);
      })
      .catch((err) => {
        setisFetching(false);
        console.log(err);
      });
    // Since we are using the same component for both sales sand purchases, we have to check if the title changes
    // and then make a request
  }, [title]);

  return (
    <Page className={classes.root} title={title}>
      <Typography variant="h4">{transactions.length} item(s)</Typography>
      <List>
        {isFetching ? (
          <ListItem disableGutters>
            <Box mx="auto">
              <CircularProgress />
            </Box>
          </ListItem>
        ) : (
          transactions.data.map((transaction) => (
            <TransactionContainer
              key={transaction.id}
              id={transaction.id}
              purchasedAmount={transaction.purchasedAmount}
              purchasedDate={transaction.purchasedDate}
              saleAmount={transaction.saleAmount}
              saleDate={transaction.saleDate}
              brand={transaction.sneaker.brand}
              colorway={transaction.sneaker.colorway}
              shoe={transaction.sneaker.shoe}
              name={transaction.sneaker.name}
              title={transaction.sneaker.title}
              imageUrl={transaction.sneaker.media.smallImageUrl}
            />
          ))
        )}
      </List>
    </Page>
  );
};

TransactionView.propTypes = {
  title: PropTypes.string,
  // These 2 boolean help us define if we are on the purchases or the sales site
  purchases: PropTypes.bool,
  sales: PropTypes.bool,
};

export default TransactionView;
