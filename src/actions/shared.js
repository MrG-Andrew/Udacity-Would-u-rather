import { hideLoading, showLoading } from 'react-redux-loading';
import Cookies from 'js-cookie';

import { getInitialData } from "../utilities/api";
import { setUsersAction } from "./users";
import { handleSetLoggedUser } from './LoginOut';
import { setQuestionsAction } from './questions';

export default function handleInitialData() {
  return async dispatch => {
    dispatch(showLoading());
    const { users, questions } = await getInitialData();
    dispatch(setUsersAction(users));
    dispatch(setQuestionsAction(questions));
    if (Cookies.get('loggedUser')) {
      const loggedUser = JSON.parse(Cookies.get('loggedUser'));
      dispatch(handleSetLoggedUser(users[loggedUser.id]));
    }
    dispatch(hideLoading());
  };
}