import React, { useState } from "react";
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
  TextField,
  Button,
} from "@material-ui/core";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import ClearIcon from "@material-ui/icons/Clear";
import Axios from "axios";
import { markTransactionSoldUrl, deleteTransaction } from "../../API";

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
  centeredFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sellButton: {
    "&:hover": {
      color: theme.palette.success.main,
    },
    "&:active": {
      color: theme.palette.success.main,
    },
  },
  greenBackground: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
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
  fetchContent,
}) => {
  const classes = useStyles();

  const [isSaleMenuOpen, setisSaleMenuOpen] = useState(false);
  const [saleAmount, setsaleAmount] = useState("");
  // This variable keep track when the user clicks the button to mark as sold transaction
  // We want to prevent the user from clicking that button twice, so we disable it while the server
  // does its thing
  const [isMarkingAsSold, setisMarkingAsSold] = useState(false);
  const [hasError, sethasError] = useState(false);
  const [isDeleteMenuOpen, setisDeleteMenuOpen] = useState(false);

  const ICON_SIZE = 32;

  const handleSellButton = () => {
    setisSaleMenuOpen(!isSaleMenuOpen);
  };

  const handleRemoveButton = () => {
    setisDeleteMenuOpen(!isDeleteMenuOpen);
  };

  const handleSaleAmountChange = (e) => {
    setsaleAmount(e.target.value);
  };

  const handleMarkAsSold = (id) => {
    setisMarkingAsSold(true);
    sethasError(false);
    const url = markTransactionSoldUrl(id);

    // If the amount can be converted to a float, create a request to the server
    if (parseFloat(saleAmount)) {
      Axios({
        method: "PATCH",
        url,
        data: {
          saleAmount,
        },
      })
        .then((res) => {
          setisMarkingAsSold(false);
          // If there was no error, we want to fetch the data again
          fetchContent();
        })
        .catch((err) => {
          setisMarkingAsSold(false);
          console.log(err);
        });
    } else {
      setisMarkingAsSold(false);
      sethasError(true);
    }
  };

  const handleDelete = (id) => {
    const url = deleteTransaction(id);

    Axios({
      method: "DELETE",
      url,
    })
      .then(() => fetchContent())
      .catch((err) => console.log(err));
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
                <Box className={classes.centeredFlex}>
                  <Box>
                    <Tooltip title="Mark as Sold">
                      <IconButton
                        className={classes.sellButton}
                        onClick={handleSellButton}
                      >
                        <AttachMoneyRoundedIcon
                          style={{ fontSize: ICON_SIZE }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {isSaleMenuOpen && (
                    <Box className={classes.fullColumnFlex}>
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="Sold for..."
                        value={saleAmount}
                        onChange={(e) => handleSaleAmountChange(e)}
                        error={hasError}
                        // If there was an error, show the helper text, else put a blank space there
                        // The blank space is used as a margin between the textfield and the button
                        helperText={
                          hasError ? "Please enter an valid amount." : " "
                        }
                      />
                      <Button
                        fullWidth
                        disabled={isMarkingAsSold}
                        className={classes.greenBackground}
                        variant="contained"
                        onClick={() => handleMarkAsSold(id)}
                      >
                        Mark as Sold
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              {/* PURCHASE DATE */}
              <Box className={classes.fullColumnFlex} textAlign="center">
                <Typography variant="body1">Purchase Date</Typography>
                <Typography variant="h5">
                  {purchasedDate.replaceAll("-", "/")}
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
                <Box className={classes.centeredFlex}>
                  <Box>
                    <Tooltip title="Remove from Inventory">
                      <IconButton
                        className={classes.deleteButton}
                        onClick={() => handleRemoveButton(id)}
                      >
                        <ClearIcon style={{ fontSize: ICON_SIZE }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box>
                    {isDeleteMenuOpen && (
                      <Box textAlign="center">
                        <Typography variant="h6">
                          Remove this item from inventory?
                        </Typography>
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          onClick={() => handleDelete(id)}
                        >
                          Remove
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
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
  fetchContent: PropTypes.func,
};
