import Cookies from 'js-cookie';

export const SET_LOGGED_USER = 'SET_LOGGED_USER';
export const REMOVE_LOGGED_USER = 'REMOVE_LOGGED_USER';

export function handleSetLoggedUser(user) {
  return dispatch => {
    return dispatch(setLoggedUser(user));
  }
}

export function handleRemoveLoggedUser() {
  return dispatch => {
    Cookies.remove('loggedUser');
    return dispatch(removeLoggedUser());
  }
}

// Local function
function setLoggedUser(loggedUser) {
  return {
    type: SET_LOGGED_USER,
    loggedUser,
  };
}

function removeLoggedUser() {
  return {
    type: REMOVE_LOGGED_USER,
  }
}