export const ADD_RECENT = 'ADD_RECENT';
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';

export function addRecentSummoner(summoner) {
  return {
    type: ADD_RECENT,
    summoner,
  };
}

export function addFavoriteSummoner(summoner) {
  return {
    type: ADD_FAV,
    summoner,
  };
}

export function removeFavoriteSummoner(summonerName) {
  return {
    type: REMOVE_FAV,
    summonerName,
  };
}
