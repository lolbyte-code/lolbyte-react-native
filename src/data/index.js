import api from 'LolByte/src/data/reducers/ApiReducer';
import {combineReducers} from 'redux';
import searches from 'LolByte/src/data/reducers/SearchReducer';
import summoners from 'LolByte/src/data/reducers/SummonersReducer';

export default combineReducers({
  summoners,
  searches,
  api,
});
