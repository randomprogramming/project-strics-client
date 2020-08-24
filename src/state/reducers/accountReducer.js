import { SET_ACCOUNT, SET_DEFAULT_ACCOUNT } from "../actionTypes";

const initialState = {
  username: null,
  loggedIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT:
      if (action.payload) {
        return {
          ...action.payload,
          // If the username is defined and the length of the username is more than 0, we can be
          // 100% sure that the user is logged in, and then we set the value of loggedIn to true
          loggedIn:
            action.payload.username && action.payload.username.length > 0,
        };
      } else {
        return state;
      }
    case SET_DEFAULT_ACCOUNT:
      return initialState;
    default:
      return state;
  }
}
