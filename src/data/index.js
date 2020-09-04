import api from './ApiReducer';
import {combineReducers} from 'redux';
import searches from './SearchReducer';
import summoners from './SummonersReducer';

export default combineReducers({
  summoners,
  searches,
  api,
});
