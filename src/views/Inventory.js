import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Page } from "../components/Page";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { SearchField } from "../components/SearchField";

export const Inventory = () => {
  const [searchValue, setsearchValue] = useState("");

  const onSearchValueChange = (e) => {
    setsearchValue(e.target.value);
  };

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
          <SearchField
            onChange={onSearchValueChange}
            value={searchValue}
            placeholder="Search inventory"
            debounceTimeout={0}
          />
        </Box>
      </Box>
    </Page>
  );
};
