import api from './ApiReducer';
import {combineReducers} from 'redux';
import summoners from './SummonersReducer';

export default combineReducers({
  summoners,
  api,
});
