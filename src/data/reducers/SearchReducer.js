import {
  CLEAR_SEARCHES,
  POP_SEARCH,
  PUSH_SEARCH,
} from 'LolByte/src/data/actions/SearchActions';

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case PUSH_SEARCH:
      state.unshift(action.summoner);
      return [...state];
    case POP_SEARCH:
      state.shift();
      return [...state];
    case CLEAR_SEARCHES:
      return [];
    default:
      return state;
  }
};

export default searchReducer;
