import React, { useState } from "react";
import { Page } from "../components/Page";
import { Typography, Box } from "@material-ui/core";
import { SearchField } from "../components/SearchField";

export const AddItem = () => {
  const [searchValue, setsearchValue] = useState("");

  const onSearchValueChange = (e) => {
    setsearchValue(e.target.value);
  };

  return (
    <Page title="Add Sneaker">
      <Typography variant="h1">Add to inventory</Typography>
      <Box mt={2}>
        <SearchField
          placeholder="Search for sneakers"
          value={searchValue}
          onChange={onSearchValueChange}
          debounceTimeout={750}
        />
      </Box>
    </Page>
  );
};
