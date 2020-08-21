import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      html: {
        margin: 0,
        padding: 0,
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
        fontFamily: "Work Sans, sans-serif",
      },
      body: {
        backgroundColor: "#ececec",
        margin: 0,
        padding: 0,
        height: "100%",
        width: "100%",
      },
      a: {
        textDecoration: "none",
      },
      img: {
        userSelect: "none",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
