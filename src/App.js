import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "./components/GlobalStyles";
import theme from "./theme";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { fetchAndStoreAccount } from "./state/actions/accountActions";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const routing = useRoutes(routes);

  useEffect(() => {
    dispatch(fetchAndStoreAccount());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
