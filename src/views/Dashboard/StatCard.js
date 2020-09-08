import React, { useState, useEffect } from "react";
import { Box, Card, makeStyles, Typography, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 136,
    padding: theme.spacing(2),
  },
  avatar: {
    height: 56,
    width: 56,
  },
}));

const POSSIBLE_BACKGROUND_COLORS = [
  "#222E50",
  "#FFC857",
  "#D1345B",
  "#222222",
  "#0EAD69",
  "#ED1C24",
  "#42CAFD",
  "#254441",
];

const ICON_SIZE = 30;

export const StatCard = ({
  children,
  title,
  subtitle,
  alignChildrenToEnd,
  icon: Icon,
}) => {
  const classes = useStyles();
  const [backgroundColor, setbackgroundColor] = useState("none");

  useEffect(() => {
    // Choose a random color as the background from the possible listed colors above
    setbackgroundColor(
      POSSIBLE_BACKGROUND_COLORS[
        Math.floor(Math.random() * POSSIBLE_BACKGROUND_COLORS.length)
      ]
    );
  }, []);

  return (
    <Card className={classes.card} elevation={6}>
      <Box display="flex" flexDirection="column" height="100%" width="100%">
        <Box flex={3} display="flex" flexDirection="row">
          <Box flex={1}>
            {title && (
              <Typography variant="h6" gutterBottom>
                {title.toUpperCase()}
              </Typography>
            )}
            <Typography variant="h3">{subtitle}</Typography>
          </Box>
          {Icon && (
            <Avatar className={classes.avatar} style={{ backgroundColor }}>
              <Icon style={{ fontSize: ICON_SIZE }} />
            </Avatar>
          )}
        </Box>
        <Box
          flex={2}
          display="flex"
          alignItems={alignChildrenToEnd ? "flex-end" : "initial"}
        >
          {children}
        </Box>
      </Box>
    </Card>
  );
};

StatCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  alignChildrenToEnd: PropTypes.bool,
  icon: PropTypes.node,
};
