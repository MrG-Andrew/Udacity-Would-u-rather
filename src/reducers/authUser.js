import { REMOVE_LOGGED_USER, SET_LOGGED_USER } from "../actions/LoginOut";

export default function authUserReducer(state = null, action) {
  switch (action.type) {
    case SET_LOGGED_USER:
      return {
        ...action.loggedUser,
      };
    case REMOVE_LOGGED_USER:
      return null;
    default:
      return state;
  }
}