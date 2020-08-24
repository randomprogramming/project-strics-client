import Axios from "axios";
import { SET_ACCOUNT, SET_DEFAULT_ACCOUNT } from "../actionTypes";
import { LOGGED_IN_ACCOUNT, LOGOUT } from "../../API";

const setAccount = (accountData) => {
  return {
    type: SET_ACCOUNT,
    payload: accountData,
  };
};

const setDefaultAccount = () => {
  return {
    type: SET_DEFAULT_ACCOUNT,
  };
};

export function fetchAndStoreAccount() {
  return function (dispatch) {
    Axios({
      method: "GET",
      url: LOGGED_IN_ACCOUNT,
    })
      .then((res) => dispatch(setAccount(res.data)))
      .catch((e) => console.log("Error when fetching account: " + e.message));
  };
}

export function logoutAccount() {
  return function (dispatch) {
    Axios({
      method: "POST",
      url: LOGOUT,
    })
      .then((res) => {
        if (res.status === 200) {
          // Logout the account, set the default account in the redux store and set the location of the window to the homepage
          dispatch(setDefaultAccount());
          window.location = "/";
        }
      })
      .catch((e) => console.log("Error when logging out: " + e.message));
  };
}
