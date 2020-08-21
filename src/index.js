import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";

// Only here for debug purposes, should NOT be enabled in production
// With this line of you you can just open the browser console and type window.store.getState() to see
// the state of the store(all the data)
// window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
