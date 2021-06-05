import {
  getCurrentGameData,
  getMatchData,
  getNotificationData,
  getRankedData,
  getRecentGamesData,
  getStatisticsData,
  getSummonerData,
} from '@app/api/Url';

import LRUCache from 'lru-cache';
import {config} from '@app/Config';

export const REQUEST_SUMMONER_DATA = 'REQUEST_SUMMONER_DATA';
export const RECEIVE_SUMMONER_DATA = 'RECEIVE_SUMMONER_DATA';
export const REQUEST_RECENT_GAMES_DATA = 'REQUEST_RECENT_GAMES_DATA';
export const RECEIVE_RECENT_GAMES_DATA = 'RECEIVE_RECENT_GAMES_DATA';
export const REQUEST_RANKED_DATA = 'REQUEST_RANKED_DATA';
export const RECEIVE_RANKED_DATA = 'RECEIVE_RANKED_DATA';
export const REQUEST_STATISTICS_DATA = 'REQUEST_STATISTICS_DATA';
export const RECEIVE_STATISTICS_DATA = 'RECEIVE_STATISTICS_DATA';
export const REQUEST_CURRENT_GAME_DATA = 'REQUEST_CURRENT_GAME_DATA';
export const RECEIVE_CURRENT_GAME_DATA = 'RECEIVE_CURRENT_GAME_DATA';
export const REQUEST_MATCH_DATA = 'REQUEST_MATCH_DATA';
export const RECEIVE_MATCH_DATA = 'RECEIVE_MATCH_DATA';
export const REQUEST_NOTIFICATION_DATA = 'REQUEST_NOTIFICATION_DATA';
export const RECEIVE_NOTIFICATION_DATA = 'RECEIVE_NOTIFICATION_DATA';
export const SUMMONER_FETCH_ERROR = 'SUMMONER_FETCH_ERROR';

const matchesCache = new LRUCache(config.matchesCacheSize);

function requestSummonerData(summonerName, summonerRegion) {
  return {
    type: REQUEST_SUMMONER_DATA,
    summonerName,
    summonerRegion,
  };
}

function receiveSummonerData(summonerName, summonerRegion, response) {
  return {
    type: RECEIVE_SUMMONER_DATA,
    summonerName,
    summonerRegion,
    data: response,
  };
}

function requestRecentGamesData(summonerId, gameType, summonerRegion) {
  return {
    type: REQUEST_RECENT_GAMES_DATA,
    summonerId,
    summonerRegion,
    gameType,
  };
}

function receiveRecentGamesData(
  summonerId,
  summonerRegion,
  gameType,
  response,
) {
  return {
    type: RECEIVE_RECENT_GAMES_DATA,
    summonerId,
    summonerRegion,
    gameType,
    data: response,
  };
}

function requestRankedData(summonerId, summonerRegion) {
  return {
    type: REQUEST_RANKED_DATA,
    summonerId,
    summonerRegion,
  };
}

function receiveRankedData(summonerId, summonerRegion, response) {
  return {
    type: RECEIVE_RANKED_DATA,
    summonerId,
    summonerRegion,
    data: response,
  };
}

function requestStatisticsData(summonerId, summonerRegion, gameType) {
  return {
    type: REQUEST_STATISTICS_DATA,
    summonerId,
    summonerRegion,
    gameType,
  };
}

function receiveStatisticsData(summonerId, summonerRegion, gameType, response) {
  return {
    type: RECEIVE_STATISTICS_DATA,
    summonerId,
    summonerRegion,
    gameType,
    data: response,
  };
}

function requestCurrentGameData(summonerId, summonerRegion) {
  return {
    type: REQUEST_CURRENT_GAME_DATA,
    summonerId,
    summonerRegion,
  };
}

function receiveCurrentGameData(summonerId, summonerRegion, response) {
  return {
    type: RECEIVE_CURRENT_GAME_DATA,
    summonerId,
    summonerRegion,
    data: response,
  };
}

function requestMatchData(matchId, summonerRegion, summonerId) {
  return {
    type: REQUEST_MATCH_DATA,
    matchId,
    summonerRegion,
    summonerId,
  };
}

function receiveMatchData(matchId, summonerRegion, summonerId, response) {
  return {
    type: RECEIVE_MATCH_DATA,
    matchId,
    summonerRegion,
    summonerId,
    data: response,
  };
}

function requestNotificationData() {
  return {
    type: REQUEST_NOTIFICATION_DATA,
  };
}

function receiveNotificationData(response) {
  return {
    type: RECEIVE_NOTIFICATION_DATA,
    data: response,
  };
}

function fetchSummonerDataError(response) {
  return {
    type: SUMMONER_FETCH_ERROR,
    data: response,
  };
}

/**
 * Used to reset the profile data states to isFetching = true.
 * Without this, the results page will double load. Once with
 * the previous summoner and once with the newly searched one.
 * This function must be called any time you navigate to the
 * profile page.
 */
export function resetProfileData(dispatch) {
  dispatch(requestSummonerData('', ''));
  dispatch(requestRecentGamesData('', '', 0));
  dispatch(requestRankedData('', ''));
  dispatch(requestStatisticsData('', '', 0));
  dispatch(requestCurrentGameData('', ''));
}

export function fetchSummonerData(summonerName, summonerRegion) {
  return (dispatch) => {
    dispatch(requestSummonerData(summonerName, summonerRegion));
    return fetch(getSummonerData(summonerName, summonerRegion), {
      method: 'GET',
      timeout: config.apiTimeout,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Summoner not found!');
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        dispatch(receiveSummonerData(summonerName, summonerRegion, json));
      })
      .catch((error) => {
        console.error(error);
        dispatch(fetchSummonerDataError(error));
      });
  };
}

export function fetchRecentGamesData(summonerId, summonerRegion, gameType) {
  return (dispatch) => {
    dispatch(requestRecentGamesData(summonerId, summonerRegion, gameType));
    return fetch(getRecentGamesData(summonerId, summonerRegion, gameType), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(
          receiveRecentGamesData(summonerId, summonerRegion, gameType, json),
        );
      })
      .catch((error) => console.error(error));
  };
}

export function fetchRankedData(summonerId, summonerRegion) {
  return (dispatch) => {
    dispatch(requestRankedData(summonerId, summonerRegion));
    return fetch(getRankedData(summonerId, summonerRegion), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveRankedData(summonerId, summonerRegion, json));
      })
      .catch((error) => console.error(error));
  };
}

export function fetchStatisticsData(summonerId, summonerRegion, gameType) {
  return (dispatch) => {
    dispatch(requestStatisticsData(summonerId, summonerRegion, gameType));
    return fetch(getStatisticsData(summonerId, summonerRegion, gameType), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(
          receiveStatisticsData(summonerId, summonerRegion, gameType, json),
        );
      })
      .catch((error) => console.error(error));
  };
}

export function fetchCurrentGameData(summonerId, summonerRegion) {
  return (dispatch) => {
    dispatch(requestCurrentGameData(summonerId, summonerRegion));
    return fetch(getCurrentGameData(summonerId, summonerRegion), {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Not in game!');
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        dispatch(receiveCurrentGameData(summonerId, summonerRegion, json));
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          receiveCurrentGameData(summonerId, summonerRegion, {summoners: []}),
        );
      });
  };
}

export function fetchMatchData(matchId, summonerRegion, summonerId) {
  return (dispatch) => {
    dispatch(requestMatchData(matchId, summonerRegion));
    if (matchesCache.has(matchId)) {
      console.log(`cache hit for match ${matchId}`);
      dispatch(
        receiveMatchData(
          matchId,
          summonerRegion,
          summonerId,
          matchesCache.get(matchId),
        ),
      );
    } else {
      console.log(`cache miss for match ${matchId}`);
      fetch(getMatchData(matchId, summonerRegion, summonerId), {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          matchesCache.set(matchId, json);
          dispatch(receiveMatchData(matchId, summonerRegion, summonerId, json));
        })
        .catch((error) => console.error(error));
    }
  };
}

export function fetchNotificationData() {
  return (dispatch) => {
    dispatch(requestNotificationData());
    return fetch(getNotificationData(), {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No notifications!');
        }
        response.json();
      })
      .then((json) => {
        console.log(json);
        dispatch(receiveNotificationData(json));
      })
      .catch((error) => console.error(error));
  };
}
