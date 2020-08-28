import React from "react";
import { Page } from "../../components/Page";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },
}));

const TransactionView = ({ title }) => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title={title}>
      Hello {title}
    </Page>
  );
};

TransactionView.propTypes = {
  title: PropTypes.string,
};

export default TransactionView;
