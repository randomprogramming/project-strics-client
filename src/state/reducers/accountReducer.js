import { SET_ACCOUNT } from "../actionTypes";

const initialState = {
  username: null,
  isLoggedIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT:
      if (action.payload) {
        return action.payload;
      } else {
        return state;
      }
    default:
      return state;
  }
}
