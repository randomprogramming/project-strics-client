import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  Avatar,
  makeStyles,
  Box,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    cursor: "pointer",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "75%",
    height: "auto",
    margin: "0 auto",
  },
  checkboxContainer: {
    zIndex: 999,
    position: "absolute",
    top: "50%",
    left: "50%",
    transition: "visiblity 0s ease-in-out 3s",
  },
}));

export const SearchResultContainer = ({ activeItem, item, onClick }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
      <Card
        className={classes.root}
        onClick={() => onClick(item)}
        elevation={item.id === activeItem.id ? 12 : 2}
      >
        <Box p={2}>
          <Box className={classes.imageContainer}>
            <Avatar
              src={item.media.smallImageUrl}
              className={classes.image}
              variant="square"
              alt="item picture"
            />
          </Box>
          <Box>
            <Typography align="center" variant="h6">
              {item.brand}
            </Typography>
            <Typography align="center" variant="body1">
              {item.shoe.includes(item.brand)
                ? item.shoe.replace(item.brand + " ", "")
                : item.shoe}
            </Typography>
            <Typography align="center" variant="body2">
              {item.name}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

SearchResultContainer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    brand: PropTypes.string,
    colorway: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    shoe: PropTypes.string,
    title: PropTypes.string,
  }),
  activeItem: PropTypes.shape({
    id: PropTypes.string,
    brand: PropTypes.string,
    colorway: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    shoe: PropTypes.string,
    title: PropTypes.string,
  }),
  onClick: PropTypes.func,
};
