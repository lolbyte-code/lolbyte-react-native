import {applyMiddleware, createStore} from 'redux';

import App from 'LolByte/src/App';
import {Provider} from 'react-redux';
import React from 'react';
import {SUMMONERS_STORAGE} from 'LolByte/src/Constants';
import reducer from 'LolByte/src/data/index.js';
import {setToStorage} from 'LolByte/src/utils/Storage';
import thunkMiddleware from 'redux-thunk';

const LolByteApp = () => {
  const store = createStore(
    reducer,
    {
      summoners: {
        recentSummoners: [],
        favoriteSummoners: [],
      },
      searches: [],
      api: {
        summonerData: {
          isFetching: true,
        },
        rankedData: {
          isFetching: true,
        },
        championData: {
          isFetching: true,
        },
        currentGameData: {
          isFetching: true,
        },
        matchesData: {
          isFetching: true,
        },
      },
    },
    applyMiddleware(thunkMiddleware),
  );
  store.subscribe(() => {
    setToStorage(SUMMONERS_STORAGE, store.getState().summoners);
  });

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default LolByteApp;
