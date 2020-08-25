import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Card } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Page } from "../../components/Page";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { SearchField } from "../../components/SearchField";
import { INVENTORY } from "../../API";
import Axios from "axios";

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

  useEffect(() => {
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
              debounceTimeout={0}
            />
          </Card>
        </Box>
        <Box>
          {isFetching ? (
            <CircularProgress />
          ) : (
            inventory.data.map((item) => <div>Hello</div>)
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default Inventory;
