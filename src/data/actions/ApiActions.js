import {
  getChampionData,
  getCurrentGameData,
  getMatchData,
  getNotificationData,
  getRankedData,
  getSummonerData,
} from '@app/api/Url';

import {SimpleCache} from '@app/utils/Cache';

export const REQUEST_SUMMONER_DATA = 'REQUEST_SUMMONER_DATA';
export const RECEIVE_SUMMONER_DATA = 'RECEIVE_SUMMONER_DATA';
export const REQUEST_RANKED_DATA = 'REQUEST_RANKED_DATA';
export const RECEIVE_RANKED_DATA = 'RECEIVE_RANKED_DATA';
export const REQUEST_CHAMPION_DATA = 'REQUEST_CHAMPION_DATA';
export const RECEIVE_CHAMPION_DATA = 'RECEIVE_CHAMPION_DATA';
export const REQUEST_CURRENT_GAME_DATA = 'REQUEST_CURRENT_GAME_DATA';
export const RECEIVE_CURRENT_GAME_DATA = 'RECEIVE_CURRENT_GAME_DATA';
export const REQUEST_MATCH_DATA = 'REQUEST_MATCH_DATA';
export const RECEIVE_MATCH_DATA = 'RECEIVE_MATCH_DATA';
export const REQUEST_NOTIFICATION_DATA = 'REQUEST_NOTIFICATION_DATA';
export const RECEIVE_NOTIFICATION_DATA = 'RECEIVE_NOTIFICATION_DATA';

const matchesCache = new SimpleCache();

function requestSummonerData(summonerName, summonerRegion, gameType) {
  return {
    type: REQUEST_SUMMONER_DATA,
    summonerName,
    summonerRegion,
    gameType,
  };
}

function receiveSummonerData(summonerName, summonerRegion, gameType, response) {
  return {
    type: RECEIVE_SUMMONER_DATA,
    summonerName,
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

function requestChampionData(summonerId, summonerRegion) {
  return {
    type: REQUEST_CHAMPION_DATA,
    summonerId,
    summonerRegion,
  };
}

function receiveChampionData(summonerId, summonerRegion, response) {
  return {
    type: RECEIVE_CHAMPION_DATA,
    summonerId,
    summonerRegion,
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

export function resetSummonerData() {
  return (dispatch) => {
    dispatch(requestSummonerData('', '', 0));
  };
}

export function fetchSummonerData(summonerName, summonerRegion, gameType) {
  return (dispatch) => {
    dispatch(requestSummonerData(summonerName, summonerRegion, gameType));
    return fetch(getSummonerData(summonerName, summonerRegion, gameType), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(
          receiveSummonerData(summonerName, summonerRegion, gameType, json),
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

export function fetchChampionData(summonerId, summonerRegion) {
  return (dispatch) => {
    dispatch(requestChampionData(summonerId, summonerRegion));
    return fetch(getChampionData(summonerId, summonerRegion), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveChampionData(summonerId, summonerRegion, json));
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
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveCurrentGameData(summonerId, summonerRegion, json));
      })
      .catch((error) => console.error(error));
  };
}

export function fetchMatchData(matchId, summonerRegion, summonerId) {
  return (dispatch) => {
    dispatch(requestMatchData(matchId, summonerRegion));
    if (matchesCache.contains(matchId)) {
      dispatch(
        receiveMatchData(
          matchId,
          summonerRegion,
          summonerId,
          matchesCache.get(matchId),
        ),
      );
    } else {
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
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveNotificationData(json));
      })
      .catch((error) => console.error(error));
  };
}
