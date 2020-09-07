import api from '@app/data/reducers/ApiReducer';
import {combineReducers} from 'redux';
import searches from '@app/data/reducers/SearchReducer';
import summoners from '@app/data/reducers/SummonersReducer';

export default combineReducers({
  summoners,
  searches,
  api,
});
