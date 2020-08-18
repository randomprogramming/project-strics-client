import { createMuiTheme, colors } from "@material-ui/core";
import typography from "./typography";

const theme = createMuiTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: "#ececec",
      paper: colors.common.white,
    },
    primary: {
      main: "#d92d36",
    },
    secondary: {
      main: "#d92d36",
    },
    text: {
      primary: "#040404",
      secondary: "#fff",
    },
  },
  typography,
});

export default theme;
