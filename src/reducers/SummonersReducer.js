const ADD_RECENT = 'ADD_RECENT';
const ADD_FAV = 'ADD_FAV';
const REMOVE_FAV = 'REMOVE_FAV';
const MAX_CAPACITY = 100;

const initialState = {
  recentSummoners: [],
  favoriteSummoners: [],
};

const summonersReducer = (state = initialState, action) => {
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

export {ADD_RECENT, ADD_FAV, REMOVE_FAV};
