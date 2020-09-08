import React, { useState, useEffect } from "react";
import { Page } from "../../components/Page";
import { makeStyles, Grid, Box, Typography } from "@material-ui/core";
import { StatCard } from "./StatCard";
import Axios from "axios";
import {
  TOTAL_PROFIT,
  TRANSACTION_STATS,
  CURRENT_MONTH_PROFIT,
} from "../../API";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyRounded";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";
import TrendingDownRoundedIcon from "@material-ui/icons/TrendingDownRounded";
import TrendingFlatRoundedIcon from "@material-ui/icons/TrendingFlatRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },
  positiveChange: {
    color: theme.palette.success.main,
    fontWeight: "bold",
    marginRight: theme.spacing(1),
  },
  negativeChange: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginRight: theme.spacing(1),
  },
  zeroChange: {
    color: theme.palette.grey[600],
    fontWeight: "bold",
    marginRight: theme.spacing(1),
  },
  textWithIcon: {
    fontSize: "24px !important",
  },
  icon: {
    position: "relative",
    top: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [totalProfit, settotalProfit] = useState(0);
  const [currentMonthProfit, setcurrentMonthProfit] = useState(0);
  const [transactionStats, settransactionStats] = useState({
    currentMonthPurchases: 0,
    currentMonthSales: 0,
    purchasesIncreasePercentage: 0,
    salesIncreasePercentage: 0,
  });

  const getSalesDeltaIcon = () => {
    if (transactionStats.salesIncreasePercentage > 0) {
      // If the change is positive
      return (
        <span className={classes.positiveChange}>
          <TrendingUpRoundedIcon className={classes.icon} />
          {transactionStats.salesIncreasePercentage + "%"}
        </span>
      );
    } else if (transactionStats.salesIncreasePercentage < 0) {
      // If the change is negative
      return (
        <span className={classes.negativeChange}>
          <TrendingDownRoundedIcon className={classes.icon} />
          {transactionStats.salesIncreasePercentage + "%"}
        </span>
      );
    } else {
      // If the change is 0
      return (
        <span className={classes.zeroChange}>
          <TrendingFlatRoundedIcon className={classes.icon} />
          {transactionStats.salesIncreasePercentage + "%"}
        </span>
      );
    }
  };

  const getPurchaseDeltaIcon = () => {
    if (transactionStats.purchasesIncreasePercentage > 0) {
      // If the change is positive
      return (
        <span className={classes.positiveChange}>
          <TrendingUpRoundedIcon className={classes.icon} />
          {transactionStats.purchasesIncreasePercentage + "%"}
        </span>
      );
    } else if (transactionStats.purchasesIncreasePercentage < 0) {
      // If the change is negative
      return (
        <span className={classes.negativeChange}>
          <TrendingDownRoundedIcon className={classes.icon} />
          {transactionStats.purchasesIncreasePercentage + "%"}
        </span>
      );
    } else {
      // If the change is 0
      return (
        <span className={classes.zeroChange}>
          <TrendingFlatRoundedIcon className={classes.icon} />
          {transactionStats.purchasesIncreasePercentage + "%"}
        </span>
      );
    }
  };

  const fetchTotalProfit = async () => {
    Axios({
      method: "GET",
      url: TOTAL_PROFIT,
    })
      .then((res) => settotalProfit(res.data))
      .catch((err) => console.log(err));
  };

  const fetchTransactionStats = async () => {
    Axios({
      method: "GET",
      url: TRANSACTION_STATS,
    })
      .then((res) => settransactionStats(res.data))
      .catch((err) => console.log(err));
  };

  const fetchCurrentMonthProfit = async () => {
    Axios({
      method: "GET",
      url: CURRENT_MONTH_PROFIT,
    })
      .then((res) => setcurrentMonthProfit(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTotalProfit();
    fetchTransactionStats();
    fetchCurrentMonthProfit();
  }, []);

  return (
    <Page className={classes.root} title="Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            alignChildrenToEnd
            title="Current month profit"
            subtitle={currentMonthProfit}
            icon={AttachMoneyOutlinedIcon}
          >
            <Typography variant="body2">
              {/* TODO: Format currency containers */}
              Profit calculated from items sold during the ongoing month.
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            alignChildrenToEnd
            title="Items purchased this month"
            subtitle={transactionStats.currentMonthPurchases}
            icon={ShoppingCartOutlinedIcon}
          >
            <Typography variant="body2">
              {getPurchaseDeltaIcon()}
              since last month.
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            alignChildrenToEnd
            title="Items sold this month"
            subtitle={transactionStats.currentMonthSales}
            icon={LoyaltyOutlinedIcon}
          >
            <Typography variant="body2">
              {getSalesDeltaIcon()}
              since last month.
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            alignChildrenToEnd
            title="Total Profit"
            subtitle={totalProfit}
            icon={AttachMoneyOutlinedIcon}
          >
            <Typography variant="body2">
              Items that weren't marked as purchases aren't accounted in profit
              calculations.
            </Typography>
          </StatCard>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Dashboard;
