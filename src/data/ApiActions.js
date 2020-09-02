import {
  getChampionData,
  getCurrentGameData,
  getMatchData,
  getRankedData,
  getSummonerData,
} from '../api/Url';

import {SimpleCache} from '../utils/Cache';

export const REQUEST_SUMMONER_DATA = 'REQUEST_SUMMONER_DATA';
export const RECEIVE_SUMMONER_DATA = 'RECEIVE_SUMMONER_DATA';
export const REQUEST_RANKED_DATA = 'REQUEST_RANKED_DATA';
export const RECEIVE_RANKED_DATA = 'RECEIVE_RANKED_DATA';
export const REQUEST_CHAMPION_DATA = 'REQUEST_CHAMPION_DATA';
export const RECEIVE_CHAMPION_DATA = 'RECEIVE_CHAMPION_DATA';
export const REQUEST_CURRENT_GAME_DATA = 'REQUEST_CURRENT_GAME_DATA';
export const RECEIVE_CURRENT_GAME_DATA = 'RECEIVE_CURRENT_GAME_DATA';
export const REQUEST_MATCHES_DATA = 'REQUEST_MATCHES_DATA';
export const RECEIVE_MATCHES_DATA = 'RECEIVE_MATCHES_DATA';

const matchesCache = new SimpleCache();

function requestSummonerData(summonerName, region) {
  return {
    type: REQUEST_SUMMONER_DATA,
    summonerName,
    region,
  };
}

function receiveSummonerData(summonerName, region, responseJson) {
  return {
    type: RECEIVE_SUMMONER_DATA,
    summonerName,
    region,
    data: responseJson,
  };
}

function requestRankedData(summonerId, region) {
  return {
    type: REQUEST_RANKED_DATA,
    summonerId,
    region,
  };
}

function receiveRankedData(summonerId, region, responseJson) {
  return {
    type: RECEIVE_RANKED_DATA,
    summonerId,
    region,
    data: responseJson,
  };
}

function requestChampionData(summonerId, region) {
  return {
    type: REQUEST_CHAMPION_DATA,
    summonerId,
    region,
  };
}

function receiveChampionData(summonerId, region, responseJson) {
  return {
    type: RECEIVE_CHAMPION_DATA,
    summonerId,
    region,
    data: responseJson,
  };
}

function requestCurrentGameData(summonerId, region) {
  return {
    type: REQUEST_CURRENT_GAME_DATA,
    summonerId,
    region,
  };
}

function receiveCurrentGameData(summonerId, region, responseJson) {
  return {
    type: RECEIVE_CURRENT_GAME_DATA,
    summonerId,
    region,
    data: responseJson,
  };
}

function requestMatchesData(matchIds, region, summonerId) {
  return {
    type: REQUEST_MATCHES_DATA,
    matchIds,
    region,
    summonerId,
  };
}

function receiveMatchesData(matchIds, region, summonerId, responseJson) {
  return {
    type: RECEIVE_MATCHES_DATA,
    matchIds,
    region,
    summonerId,
    data: responseJson,
  };
}

export function fetchSummonerData(summonerName, region) {
  return (dispatch) => {
    dispatch(requestSummonerData(summonerName, region));
    return fetch(getSummonerData(summonerName, region), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveSummonerData(summonerName, region, json));
      })
      .catch((error) => console.error(error));
  };
}

export function fetchRankedData(summonerId, region) {
  return (dispatch) => {
    dispatch(requestRankedData(summonerId, region));
    return fetch(getRankedData(summonerId, region), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveRankedData(summonerId, region, json));
      })
      .catch((error) => console.error(error));
  };
}

export function fetchChampionData(summonerId, region) {
  return (dispatch) => {
    dispatch(requestChampionData(summonerId, region));
    return fetch(getChampionData(summonerId, region), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveChampionData(summonerId, region, json));
      })
      .catch((error) => console.error(error));
  };
}

export function fetchCurrentGameData(summonerId, region) {
  return (dispatch) => {
    dispatch(requestCurrentGameData(summonerId, region));
    return fetch(getCurrentGameData(summonerId, region), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveCurrentGameData(summonerId, region, json));
      })
      .catch((error) => console.error(error));
  };
}

export function fetchMatchesData(matchIds, region, summonerId) {
  const matchLimit = matchIds.length;
  return (dispatch) => {
    dispatch(requestMatchesData(matchIds, region));
    const matches = [];
    var count = 0;
    matchIds.forEach((match) => {
      if (matchesCache.contains(match)) {
        matches.unshift(matchesCache.get(match));
        if (++count === matchLimit) {
          dispatch(receiveMatchesData(matchIds, region, summonerId, matches));
        }
      } else {
        fetch(getMatchData(match, region, summonerId), {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            matchesCache.set(match, json);
            matches.unshift(json);
            if (++count === matchLimit) {
              dispatch(
                receiveMatchesData(matchIds, region, summonerId, matches),
              );
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };
}
