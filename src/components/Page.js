import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

export const Page = forwardRef(({ children, title = "", ...rest }, ref) => {
  return (
    <Box ref={ref} {...rest} paddingY={3}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};
