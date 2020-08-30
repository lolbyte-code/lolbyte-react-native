import {getChampionData, getRankedData, getSummonerData} from '../api/Url';

export const REQUEST_SUMMONER_DATA = 'REQUEST_SUMMONER_DATA';
export const RECEIVE_SUMMONER_DATA = 'RECEIVE_SUMMONER_DATA';
export const REQUEST_RANKED_DATA = 'REQUEST_RANKED_DATA';
export const RECEIVE_RANKED_DATA = 'RECEIVE_RANKED_DATA';
export const REQUEST_CHAMPION_DATA = 'REQUEST_CHAMPION_DATA';
export const RECEIVE_CHAMPION_DATA = 'RECEIVE_CHAMPION_DATA';

function requestSummonerData(name, region) {
  return {
    type: REQUEST_SUMMONER_DATA,
    name,
    region,
  };
}

function receiveSummonerData(name, region, responseJson) {
  return {
    type: RECEIVE_SUMMONER_DATA,
    name,
    region,
    data: responseJson,
  };
}

function requestRankedData(id, region) {
  return {
    type: REQUEST_RANKED_DATA,
    id,
    region,
  };
}

function receiveRankedData(id, region, responseJson) {
  return {
    type: RECEIVE_RANKED_DATA,
    id,
    region,
    data: responseJson,
  };
}

function requestChampionData(id, region) {
  return {
    type: REQUEST_CHAMPION_DATA,
    id,
    region,
  };
}

function receiveChampionData(id, region, responseJson) {
  return {
    type: RECEIVE_CHAMPION_DATA,
    id,
    region,
    data: responseJson,
  };
}

export function fetchSummonerData(name, region) {
  return (dispatch) => {
    dispatch(requestSummonerData(name, region));
    return fetch(getSummonerData(name, region), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveSummonerData(name, region, json));
      })
      .catch((error) => console.error(error));
  };
}

export function fetchRankedData(id, region) {
  return (dispatch) => {
    dispatch(requestRankedData(id, region));
    return fetch(getRankedData(id, region), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveRankedData(id, region, json));
      })
      .catch((error) => console.error(error));
  };
}

export function fetchChampionData(id, region) {
  return (dispatch) => {
    dispatch(requestChampionData(id, region));
    return fetch(getChampionData(id, region), {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveChampionData(id, region, json));
      })
      .catch((error) => console.error(error));
  };
}
