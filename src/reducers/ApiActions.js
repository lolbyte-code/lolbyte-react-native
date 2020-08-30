import {getChampionData, getRankedData, getSummonerData} from '../api/Url';

export const REQUEST_SUMMONER_DATA = 'REQUEST_SUMMONER_DATA';
export const RECEIVE_SUMMONER_DATA = 'RECEIVE_SUMMONER_DATA';
export const REQUEST_RANKED_DATA = 'REQUEST_RANKED_DATA';
export const RECEIVE_RANKED_DATA = 'RECEIVE_RANKED_DATA';
export const REQUEST_CHAMPION_DATA = 'REQUEST_CHAMPION_DATA';
export const RECEIVE_CHAMPION_DATA = 'RECEIVE_CHAMPION_DATA';

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
  console.log(summonerId)
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
