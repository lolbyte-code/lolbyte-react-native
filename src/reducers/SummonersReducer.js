import {ADD_FAV, ADD_RECENT, REMOVE_FAV} from './SummonersActions';

const MAX_CAPACITY = 100;

const summonersReducer = (
  state = {
    recentSummoners: [],
    favoriteSummoners: [],
  },
  action,
) => {
  const cloneState = {
    recentSummoners: [...state.recentSummoners],
    favoriteSummoners: [...state.favoriteSummoners],
  };
  switch (action.type) {
    case ADD_RECENT:
      if (typeof cloneState.recentSummoners === 'undefined') {
        cloneState.recentSummoners = [];
      }
      if (
        cloneState.recentSummoners.some(
          (summoner) => summoner.summonerName === action.summoner.summonerName,
        )
      ) {
        return state;
      }
      cloneState.recentSummoners.unshift(action.summoner);
      if (cloneState.recentSummoners.length > MAX_CAPACITY) {
        cloneState.recentSummoners = cloneState.recentSummoners.slice(
          0,
          MAX_CAPACITY,
        );
      }
      return {
        ...state,
        recentSummoners: cloneState.recentSummoners,
        favoriteSummoners: cloneState.favoriteSummoners,
      };
    case ADD_FAV:
      if (typeof cloneState.favoriteSummoners === 'undefined') {
        cloneState.favoriteSummoners = [];
      }
      if (
        cloneState.favoriteSummoners.some(
          (summoner) => summoner.summonerName === action.summoner.summonerName,
        )
      ) {
        return state;
      }
      cloneState.favoriteSummoners.unshift(action.summoner);
      if (cloneState.favoriteSummoners.length > MAX_CAPACITY) {
        cloneState.favoriteSummoners = cloneState.favoriteSummoners.slice(
          0,
          MAX_CAPACITY,
        );
      }
      return {
        ...state,
        recentSummoners: cloneState.recentSummoners,
        favoriteSummoners: cloneState.favoriteSummoners,
      };
    case REMOVE_FAV:
      cloneState.favoriteSummoners = cloneState.favoriteSummoners.filter(
        (summoner) => summoner.summonerName !== action.summonerName,
      );
      return {
        ...state,
        recentSummoners: cloneState.recentSummoners,
        favoriteSummoners: cloneState.favoriteSummoners,
      };
    default:
      return state;
  }
};

export default summonersReducer;
