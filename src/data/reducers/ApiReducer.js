import {
  RECEIVE_CURRENT_GAME_DATA,
  RECEIVE_MATCH_DATA,
  RECEIVE_NOTIFICATION_DATA,
  RECEIVE_RANKED_DATA,
  RECEIVE_RECENT_GAMES_DATA,
  RECEIVE_STATISTICS_DATA,
  RECEIVE_SUMMONER_DATA,
  REQUEST_CURRENT_GAME_DATA,
  REQUEST_MATCH_DATA,
  REQUEST_NOTIFICATION_DATA,
  REQUEST_RANKED_DATA,
  REQUEST_RECENT_GAMES_DATA,
  REQUEST_STATISTICS_DATA,
  REQUEST_SUMMONER_DATA,
  SUMMONER_FETCH_ERROR,
} from '@app/data/actions/ApiActions';

import {combineReducers} from 'redux';

const summonerDataReducer = (
  state = {
    isFetching: false,
    isError: false,
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_SUMMONER_DATA:
      return {
        isFetching: true,
        isError: false,
        summonerName: action.summonerName,
        summonerRegion: action.summonerRegion,
      };
    case RECEIVE_SUMMONER_DATA:
      return {
        isFetching: false,
        isError: false,
        summonerName: action.summonerName,
        summonerRegion: action.summonerRegion,
        data: action.data,
      };
    case SUMMONER_FETCH_ERROR:
      return {
        isFetching: false,
        isError: true,
        data: action.data,
      };
    default:
      return state;
  }
};

const recentGamesDataReducer = (
  state = {
    isFetching: false,
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_RECENT_GAMES_DATA:
      return {
        isFetching: true,
        summonerId: action.summonerId,
        summonerRegion: action.summonerRegion,
        gameType: action.gameType,
      };
    case RECEIVE_RECENT_GAMES_DATA:
      return {
        isFetching: false,
        summonerId: action.summonerId,
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

const statisticsDataReducer = (
  state = {
    isFetching: false,
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_STATISTICS_DATA:
      return {
        isFetching: true,
        summonerId: action.summonerId,
        summonerRegion: action.summonerRegion,
        gameType: action.gameType,
      };
    case RECEIVE_STATISTICS_DATA:
      return {
        isFetching: false,
        summonerId: action.summonerId,
        summonerRegion: action.summonerRegion,
        gameType: action.gameType,
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

const matchDataReducer = (
  state = {
    isFetching: false,
    data: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_MATCH_DATA:
      return {
        isFetching: true,
        matchId: action.matchId,
        summonerRegion: action.summonerRegion,
        summonerId: action.summonerId,
      };
    case RECEIVE_MATCH_DATA:
      return {
        isFetching: false,
        matchId: action.matchId,
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
  recentGamesData: recentGamesDataReducer,
  rankedData: rankedDataReducer,
  statisticsData: statisticsDataReducer,
  currentGameData: currentGameDataReducer,
  matchData: matchDataReducer,
  notificationData: notificationDataReducer,
});

export default apiReducer;
