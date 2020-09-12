import {
  RECEIVE_CHAMPION_DATA,
  RECEIVE_CURRENT_GAME_DATA,
  RECEIVE_MATCHES_DATA,
  RECEIVE_NOTIFICATION_DATA,
  RECEIVE_RANKED_DATA,
  RECEIVE_SUMMONER_DATA,
  REQUEST_CHAMPION_DATA,
  REQUEST_CURRENT_GAME_DATA,
  REQUEST_MATCHES_DATA,
  REQUEST_NOTIFICATION_DATA,
  REQUEST_RANKED_DATA,
  REQUEST_SUMMONER_DATA,
} from '@app/data/actions/ApiActions';

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
        summonerRegion: action.summonerRegion,
        gameType: action.gameType,
      };
    case RECEIVE_SUMMONER_DATA:
      return {
        isFetching: false,
        summonerName: action.summonerName,
        summonerRegion: action.summonerRegion,
        gameType: action.gameType,
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
        summonerRegion: action.summonerRegion,
      };
    case RECEIVE_RANKED_DATA:
      return {
        isFetching: false,
        summonerId: action.summonerId,
        summonerRegion: action.summonerRegion,
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
        summonerRegion: action.summonerRegion,
      };
    case RECEIVE_CHAMPION_DATA:
      return {
        isFetching: false,
        summonerId: action.summonerId,
        summonerRegion: action.summonerRegion,
        data: action.data,
      };
    default:
      return state;
  }
};

const currentGameDataReducer = (
  state = {
    isFetching: false,
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_CURRENT_GAME_DATA:
      return {
        isFetching: true,
        summonerId: action.summonerId,
        summonerRegion: action.summonerRegion,
      };
    case RECEIVE_CURRENT_GAME_DATA:
      return {
        isFetching: false,
        summonerId: action.summonerId,
        summonerRegion: action.summonerRegion,
        data: action.data,
      };
    default:
      return state;
  }
};

const matchesDataReducer = (
  state = {
    isFetching: false,
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_MATCHES_DATA:
      return {
        isFetching: true,
        matchIds: action.matchIds,
        summonerRegion: action.summonerRegion,
        summonerId: action.summonerId,
      };
    case RECEIVE_MATCHES_DATA:
      return {
        isFetching: false,
        matchIds: action.matchIds,
        summonerRegion: action.summonerRegion,
        summonerId: action.summonerId,
        data: action.data,
      };
    default:
      return state;
  }
};

const notificationDataReducer = (
  state = {
    isFetching: false,
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_NOTIFICATION_DATA:
      return {
        isFetching: true,
      };
    case RECEIVE_NOTIFICATION_DATA:
      return {
        isFetching: false,
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
  currentGameData: currentGameDataReducer,
  matchesData: matchesDataReducer,
  notificationData: notificationDataReducer,
});

export default apiReducer;
