import { getUsers } from "../utilities/api";

export const SET_USERS = 'SET_USERS';

export function handleFetchUsers() {
  return async dispatch => {
    return getUsers().then(users => {
      dispatch(setUsersAction(users));
    });
  };
};

export function setUsersAction(users) {
  return {
    type: SET_USERS,
    users
  };
}