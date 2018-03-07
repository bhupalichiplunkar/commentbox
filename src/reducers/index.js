import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import postReducer from './post';

export default combineReducers({
  router: routerReducer,
  postReducer
});
