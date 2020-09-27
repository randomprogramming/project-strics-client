import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";

// Only here for debug purposes, should NOT be enabled in production
// With this line of you you can just open the browser console and type window.store.getState() to see
// the state of the store(all the data)
window.store = store;

// TODO: Move this somewhere else
const stripePromise = loadStripe(
  "pk_test_51H1yWzAUs2cGVaF3AUbsGRJn1ygd8xlWGg9od4YV7hgUyXHc68pq2ZpCrcy8YvAQ3hyQCM71eTzpLr1pwwNLozER00A9SROj90"
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
