import { combineReducers } from 'redux';
import userReducer from './user';
import tokenReducer from './token';

const appReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
});

export default appReducer;