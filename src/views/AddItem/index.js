import React, { useState, useEffect } from "react";
import { Page } from "../../components/Page";
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  Fab,
  makeStyles,
  Card,
  Switch,
  TextField,
  Avatar,
  Button,
  Hidden,
} from "@material-ui/core";
import { SearchField } from "../../components/SearchField";
import Axios from "axios";
import { SearchResultContainer } from "./SearchResultContainer";
import AddIcon from "@material-ui/icons/Add";
import { CREATE_TRANSACTION } from "../../API";

const useStyles = makeStyles((theme) => ({
  fab: {
    boxShadow: theme.shadows[0],
    marginLeft: theme.spacing(1),
  },
  // fabContainer: {
  //   position: "absolute",
  //   bottom: theme.spacing(3),
  //   right: theme.spacing(3),
  //   zIndex: 999,
  //   maxHeight: "48px",
  //   overflow: "hidden",
  // },
  fabContainer: {
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    zIndex: 999,
  },
  greenLine: {
    width: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  activeItemInfoContainer: {
    width: "60vw",
  },
  stickySearchBarContainer: {
    position: "sticky",
    boxShadow: theme.shadows[12],
    top: theme.spacing(3),
    zIndex: 1199,
    [theme.breakpoints.down("sm")]: {
      position: "initial",
      boxShadow: theme.shadows[2],
    },
  },
  smallText: {
    fontSize: "0.8rem",
    textTransform: "uppercase",
  },
  smallImageContainer: {
    width: "35%",
    height: "auto",
    margin: "0 auto",
  },
}));

const AddItem = () => {
  const classes = useStyles();

  const [searchValue, setsearchValue] = useState("");
  const [activeItem, setactiveItem] = useState({});
  const [searchResponse, setsearchResponse] = useState([]); //searchResponse is the server returned data after we filter duplcates, and extract only necessary data
  const [isFetchingData, setisFetchingData] = useState(false);
  const [isPurchase, setisPurchase] = useState(true);
  const [purchaseAmount, setpurchaseAmount] = useState("");
  const [purchaseAmountError, setpurchaseAmountError] = useState(false);

  const onSearchValueChange = (e) => {
    setsearchValue(e.target.value);
  };

  const onSelectActiveItem = (item) => {
    // If user clicked on an already selected item, deselect that item, otherwise mark that item as selected
    if (activeItem.id === item.id) {
      setactiveItem({});
    } else {
      setactiveItem(item);
    }
  };

  const extractDataFromResponse = (response) => {
    // Only save the info that we actually need
    let data = [];

    response.map((item) =>
      data.push({
        id: item.id,
        brand: item.brand,
        colorway: item.colorway,
        media: item.media,
        releaseDate: item.releaseDate,
        retailPrice: item.retailPrice,
        shoe: item.shoe,
        name: item.name,
        title: item.title,
        year: item.year,
      })
    );

    // Removes duplicates from the response and saves the data into searchResults
    setsearchResponse([
      ...new Map(data.map((item) => [item["id"], item])).values(),
    ]);
  };

  const createTransaction = () => {
    setpurchaseAmountError(false); // Else hide the error and send a request to the server
    Axios({
      method: "POST",
      url: CREATE_TRANSACTION,
      data: {
        ...activeItem,
        isPurchase,
        purchaseAmount,
      },
    })
      // TODO: Give the user feedback if the item was added or not
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    // If the activeItem is defined
    if (activeItem.id) {
      if (isPurchase) {
        if (parseFloat(purchaseAmount)) {
          createTransaction();
        } else {
          setpurchaseAmountError(true);
        }
      } else {
        createTransaction();
      }
    }
  };

  const onPurchaseAmountChange = (e) => {
    setpurchaseAmount(e.target.value);
  };

  useEffect(() => {
    // Whenever the search value updates, fetch the data and store it in the state
    if (searchValue.length > 0) {
      setisFetchingData(true);
      Axios({
        method: "GET",
        url: `https://stockx.com/api/browse?_search=${searchValue}`,
      })
        // We can implement pagination here at a later date if neccessary
        .then((res) => {
          setisFetchingData(false);
          extractDataFromResponse(res.data.Products);
        })
        .catch((err) => {
          setisFetchingData(false);
          alert(err);
        });
    }
  }, [searchValue]);

  return (
    <Page title="Add Sneaker">
      <Hidden mdUp>
        <Box position="absolute" className={classes.fabContainer}>
          <Fab
            variant="extended"
            color="primary"
            disabled={!activeItem.id}
            onClick={onSubmit}
          >
            <AddIcon />
            Add
          </Fab>
        </Box>
      </Hidden>
      <Typography variant="h1">Add to inventory</Typography>
      <Box mt={2} className={classes.stickySearchBarContainer}>
        <Card>
          <Grid container>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <SearchField
                placeholder="Search for sneakers"
                value={searchValue}
                onChange={onSearchValueChange}
                debounceTimeout={650}
              />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
              <Box
                pt={2}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box>
                  <Typography className={classes.smallText} variant="h6">
                    Mark as purchase
                  </Typography>
                </Box>
                <Box>
                  <Switch
                    checked={isPurchase}
                    onChange={() => setisPurchase(!isPurchase)}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
              <Box
                pt={2}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box>
                  <Typography className={classes.smallText} variant="h6">
                    Money spent
                  </Typography>
                </Box>

                <TextField
                  error={purchaseAmountError}
                  variant="standard"
                  type="number"
                  size="small"
                  style={{ width: "75%", marginTop: "4px" }}
                  disabled={!isPurchase}
                  value={purchaseAmount}
                  onChange={(e) => onPurchaseAmountChange(e)}
                  helperText={
                    purchaseAmountError && "Please enter a valid number."
                  }
                />
              </Box>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
              {activeItem.id && (
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  overflow="hidden"
                  textAlign="center"
                >
                  <Box height="100%" width="100%">
                    <Avatar
                      src={activeItem.media && activeItem.media.thumbUrl}
                      variant="square"
                      className={classes.smallImageContainer}
                    />
                  </Box>
                  <Typography className={classes.smallText} variant="h6">
                    {activeItem.shoe.includes(activeItem.brand)
                      ? activeItem.shoe.replace(activeItem.brand + " ", "")
                      : activeItem.shoe}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={12} xs={12}>
              <Box
                height="100%"
                width="100%"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
              >
                <Box width="100%" p={1}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!activeItem.id}
                    onClick={onSubmit}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box mt={2}>
        {isFetchingData ? (
          <Box
            display="flex"
            flexDirection="row"
            alignContent="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {searchResponse.map((item) => (
              <SearchResultContainer
                key={item.id}
                activeItem={activeItem}
                item={item}
                onClick={onSelectActiveItem}
              />
            ))}
          </Grid>
        )}
      </Box>
    </Page>
  );
};

export default AddItem;
