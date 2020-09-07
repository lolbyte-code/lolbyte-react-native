export const PUSH_SEARCH = 'PUSH_SEARCH';
export const POP_SEARCH = 'POP_SEARCH';
export const CLEAR_SEARCHES = 'CLEAR_SEARCHES';

export function pushSearch(summoner) {
  return {
    type: PUSH_SEARCH,
    summoner,
  };
}

export function popSearch() {
  return {
    type: POP_SEARCH,
  };
}

export function clearSearches() {
  return {
    type: CLEAR_SEARCHES,
  };
}
