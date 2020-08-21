import Axios from "axios";
import { SET_ACCOUNT } from "../actionTypes";

const setAccount = (accountData) => {
  return {
    type: SET_ACCOUNT,
    payload: accountData,
  };
};

export function fetchAndStoreAccount() {
  return function (dispatch) {
    Axios({
      method: "GET",
      url: "/api/logged-in-account",
    })
      .then((res) => {
        dispatch(setAccount(res.data));
      })
      .catch((e) => {
        console.log("Error when fetching account:" + e.message);
      });
  };
}
