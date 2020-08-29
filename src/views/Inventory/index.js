import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Card,
  List,
  ListItem,
  Typography,
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
  const [inventory, setinventory] = useState({
    data: [],
    length: 0,
  });

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
        setinventory(res.data);
      })
      .catch((err) => {
        setisFetching(false);
        console.log(err);
      });
  };

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
            {/* TODO: Make this work */}
            <SearchField
              onChange={onSearchValueChange}
              value={searchValue}
              placeholder="Search inventory"
              debounceTimeout={0}
            />
          </Card>
        </Box>
        <Box>
          <List>
            <ListItem disableGutters>
              <Typography variant="h4">{inventory.length} item(s)</Typography>
            </ListItem>
            {isFetching ? (
              <ListItem disableGutters>
                <Box mx="auto">
                  <CircularProgress />
                </Box>
              </ListItem>
            ) : (
              inventory.data.map((item) => (
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
