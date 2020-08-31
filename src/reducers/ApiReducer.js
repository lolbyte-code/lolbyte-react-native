import {
  RECEIVE_CHAMPION_DATA,
  RECEIVE_RANKED_DATA,
  RECEIVE_SUMMONER_DATA,
  REQUEST_CHAMPION_DATA,
  REQUEST_RANKED_DATA,
  REQUEST_SUMMONER_DATA,
} from './ApiActions';

import {combineReducers} from 'redux';

const summonerDataReducer = (
  state = {
    isFetching: false,
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_SUMMONER_DATA:
      return {
        isFetching: true,
        summonerName: action.summonerName,
        region: action.region,
      };
    case RECEIVE_SUMMONER_DATA:
      return {
        isFetching: false,
        summonerName: action.summonerName,
        region: action.region,
        data: action.data,
      };
    default:
      return state;
  }
};

const rankedDataReducer = (
  state = {
    isFetching: false,
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_RANKED_DATA:
      return {
        isFetching: true,
        summonerId: action.summonerId,
        region: action.region,
      };
    case RECEIVE_RANKED_DATA:
      return {
        isFetching: false,
        summonerId: action.summonerId,
        region: action.region,
        data: action.data,
      };
    default:
      return state;
  }
};

const championDataReducer = (
  state = {
    isFetching: false,
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_CHAMPION_DATA:
      return {
        isFetching: true,
        summonerId: action.summonerId,
        region: action.region,
      };
    case RECEIVE_CHAMPION_DATA:
      return {
        isFetching: false,
        summonerId: action.summonerId,
        region: action.region,
        data: action.data,
      };
    default:
      return state;
  }
};

const apiReducer = combineReducers({
  summonerData: summonerDataReducer,
  rankedData: rankedDataReducer,
  championData: championDataReducer,
});

export default apiReducer;
