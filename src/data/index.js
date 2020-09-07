import api from './reducers/ApiReducer';
import {combineReducers} from 'redux';
import searches from './reducers/SearchReducer';
import summoners from './reducers/SummonersReducer';

export default combineReducers({
  summoners,
  searches,
  api,
});
