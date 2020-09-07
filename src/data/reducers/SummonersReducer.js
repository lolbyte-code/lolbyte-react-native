import {
  ADD_FAV,
  ADD_RECENT,
  BULK_ADD_FAV,
  BULK_ADD_RECENT,
  REMOVE_FAV,
} from '../actions/SummonersActions';

const MAX_CAPACITY = 100;

const summonersReducer = (
  state = {
    recentSummoners: [],
    favoriteSummoners: [],
  },
  action,
) => {
  switch (action.type) {
    case ADD_RECENT:
      if (!state.recentSummoners) {
        state.recentSummoners = [];
      }
      if (
        state.recentSummoners.some(
          (summoner) => summoner.summonerName === action.summoner.summonerName,
        )
      ) {
        state.recentSummoners = state.recentSummoners.filter(
          (summoner) => summoner.summonerName !== action.summoner.summonerName,
        );
      }
      state.recentSummoners.unshift(action.summoner);
      if (state.recentSummoners.length > MAX_CAPACITY) {
        state.recentSummoners = state.recentSummoners.slice(0, MAX_CAPACITY);
      }
      return {
        ...state,
        recentSummoners: [...state.recentSummoners],
      };
    case ADD_FAV:
      if (!state.favoriteSummoners) {
        state.favoriteSummoners = [];
      }
      if (
        state.favoriteSummoners.some(
          (summoner) => summoner.summonerName === action.summoner.summonerName,
        )
      ) {
        return state;
      }
      state.favoriteSummoners.unshift(action.summoner);
      if (state.favoriteSummoners.length > MAX_CAPACITY) {
        state.favoriteSummoners = state.favoriteSummoners.slice(
          0,
          MAX_CAPACITY,
        );
      }
      return {
        ...state,
        favoriteSummoners: [...state.favoriteSummoners],
      };
    case REMOVE_FAV:
      state.favoriteSummoners = state.favoriteSummoners.filter(
        (summoner) => summoner.summonerName !== action.summonerName,
      );
      return {
        ...state,
        favoriteSummoners: [...state.favoriteSummoners],
      };
    case BULK_ADD_RECENT:
      return {
        ...state,
        recentSummoners: action.summoners,
      };
    case BULK_ADD_FAV:
      return {
        ...state,
        favoriteSummoners: action.summoners,
      };
    default:
      return state;
  }
};

export default summonersReducer;
