import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Card,
  List,
  ListItem,
  Typography,
  TextField,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Page } from "../../components/Page";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { SearchField } from "../../components/SearchField";
import { INVENTORY } from "../../API";
import Axios from "axios";
import { InventoryItemContainer } from "./InventoryItemContainer";

const Inventory = () => {
  const [searchValue, setsearchValue] = useState("");
  const [isFetching, setisFetching] = useState(false);
  // This is the inventory that is fetched from the server
  // This will not be changed and this is used for the search feature
  // Because we need a place to store the users inventory
  const [fetchedInventory, setfetchedInventory] = useState([]);
  // This is the inventory that gets shown to the user
  // This can and will be changed according to the Search field value
  const [processedInventory, setprocessedInventory] = useState([]);

  const onSearchValueChange = (e) => {
    setsearchValue(e.target.value);
  };

  const fetchContent = () => {
    setisFetching(true);
    Axios({
      method: "GET",
      url: INVENTORY,
    })
      .then((res) => {
        setisFetching(false);
        setfetchedInventory(res.data.data);
      })
      .catch((err) => {
        setisFetching(false);
        console.log(err);
      });
  };

  useEffect(() => {
    // In the beggining, fetchedInventory and proccesedInventory should be the same
    if (searchValue.length === 0) {
      setprocessedInventory(fetchedInventory);
    }
  }, [fetchedInventory]);

  useEffect(() => {
    // Whenever the fetchedInventory or searchValue changes,
    // make sure that the processedInventory is up to date
    setprocessedInventory(
      fetchedInventory.filter((item) =>
        item.sneaker.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, fetchedInventory]);

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <Page title="Inventory">
      <Box flexDirection="column">
        <Box flexDirection="row">
          <Button
            component={RouterLink}
            to="/app/new"
            color="primary"
            variant="contained"
          >
            <AddRoundedIcon />
            Add To Inventory
          </Button>
        </Box>
        <Box mt={2}>
          <Card>
            <SearchField
              onChange={onSearchValueChange}
              value={searchValue}
              placeholder="Search inventory"
              debounceTimeout={500}
            />
          </Card>
        </Box>
        <Box>
          <List>
            <ListItem disableGutters>
              {searchValue.length > 0 ? (
                <Typography variant="h4">
                  {processedInventory.length} item(s) matching "{searchValue}"
                </Typography>
              ) : (
                <Typography variant="h4">
                  {processedInventory.length} item(s)
                </Typography>
              )}
            </ListItem>
            {isFetching ? (
              <ListItem disableGutters>
                <Box mx="auto">
                  <CircularProgress />
                </Box>
              </ListItem>
            ) : (
              processedInventory.map((item) => (
                <InventoryItemContainer
                  key={item.id}
                  id={item.id}
                  purchasedAmount={item.purchasedAmount}
                  purchasedDate={item.purchasedDate}
                  brand={item.sneaker.brand}
                  colorway={item.sneaker.colorway}
                  shoe={item.sneaker.shoe}
                  name={item.sneaker.name}
                  title={item.sneaker.title}
                  imageUrl={item.sneaker.media.smallImageUrl}
                  fetchContent={fetchContent}
                />
              ))
            )}
          </List>
        </Box>
      </Box>
    </Page>
  );
};

export default Inventory;
