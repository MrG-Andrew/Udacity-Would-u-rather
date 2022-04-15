import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';

import authUserReducer from './authUser';
import userReducer from './users';
import questionReducer from './questions';

export default combineReducers({
  loggedUser: authUserReducer,
  loadingBar: loadingBarReducer,
  users: userReducer,
  questions: questionReducer,
});