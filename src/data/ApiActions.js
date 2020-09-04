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

function requestSummonerData(summonerName, summonerRegion) {
  return {
    type: REQUEST_SUMMONER_DATA,
    summonerName,
    summonerRegion,
  };
}

function receiveSummonerData(summonerName, summonerRegion, responseJson) {
  return {
    type: RECEIVE_SUMMONER_DATA,
    summonerName,
    summonerRegion,
    data: responseJson,
  };
}

function requestRankedData(summonerId, summonerRegion) {
  return {
    type: REQUEST_RANKED_DATA,
    summonerId,
    summonerRegion,
  };
}

function receiveRankedData(summonerId, summonerRegion, responseJson) {
  return {
    type: RECEIVE_RANKED_DATA,
    summonerId,
    summonerRegion,
    data: responseJson,
  };
}

function requestChampionData(summonerId, summonerRegion) {
  return {
    type: REQUEST_CHAMPION_DATA,
    summonerId,
    summonerRegion,
  };
}

function receiveChampionData(summonerId, summonerRegion, responseJson) {
  return {
    type: RECEIVE_CHAMPION_DATA,
    summonerId,
    summonerRegion,
    data: responseJson,
  };
}

function requestCurrentGameData(summonerId, summonerRegion) {
  return {
    type: REQUEST_CURRENT_GAME_DATA,
    summonerId,
    summonerRegion,
  };
}

function receiveCurrentGameData(summonerId, summonerRegion, responseJson) {
  return {
    type: RECEIVE_CURRENT_GAME_DATA,
    summonerId,
    summonerRegion,
    data: responseJson,
  };
}

function requestMatchesData(matchIds, summonerRegion, summonerId) {
  return {
    type: REQUEST_MATCHES_DATA,
    matchIds,
    summonerRegion,
    summonerId,
  };
}

function receiveMatchesData(
  matchIds,
  summonerRegion,
  summonerId,
  responseJson,
) {
  return {
    type: RECEIVE_MATCHES_DATA,
    matchIds,
    summonerRegion,
    summonerId,
    data: responseJson,
  };
}

export function fetchSummonerData(summonerName, summonerRegion) {
  return (dispatch) => {
    dispatch(requestSummonerData(summonerName, summonerRegion));
    return fetch(getSummonerData(summonerName, summonerRegion), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveSummonerData(summonerName, summonerRegion, json));
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

export function fetchMatchesData(matchIds, summonerRegion, summonerId) {
  const matchLimit = matchIds.length;
  return (dispatch) => {
    dispatch(requestMatchesData(matchIds, summonerRegion));
    const matches = [];
    var count = 0;
    matchIds.forEach((match) => {
      if (matchesCache.contains(match)) {
        matches.unshift(matchesCache.get(match));
        if (++count === matchLimit) {
          dispatch(
            receiveMatchesData(matchIds, summonerRegion, summonerId, matches),
          );
        }
      } else {
        fetch(getMatchData(match, summonerRegion, summonerId), {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            matchesCache.set(match, json);
            matches.unshift(json);
            if (++count === matchLimit) {
              dispatch(
                receiveMatchesData(
                  matchIds,
                  summonerRegion,
                  summonerId,
                  matches,
                ),
              );
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };
}
