import Axios from "axios";
import { SET_ACCOUNT } from "../actionTypes";

const setAccount = (accountData) => {
  return {
    type: SET_ACCOUNT,
    payload: accountData,
  };
};

export function fetchAndStoreAccount() {
  console.log("fetching account");
  return function (dispatch) {
    console.log("doing this func");
    Axios({
      method: "GET",
      url: "/api/logged-in-account",
    })
      .then((res) => {
        console.log("no error when fetching");
        console.log(res.data);
        dispatch(setAccount(res.data));
      })
      .catch((e) => {
        console.log("Error when fetching account:" + e.message);
      });
  };
}
