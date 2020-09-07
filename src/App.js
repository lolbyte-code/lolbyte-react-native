import {applyMiddleware, createStore} from 'redux';

import AppContainer from '@app/AppContainer';
import {Provider} from 'react-redux';
import React from 'react';
import {SUMMONERS_STORAGE} from '@app/Constants';
import reducer from '@app/data/index.js';
import {setToStorage} from '@app/utils/Storage';
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
      <AppContainer />
    </Provider>
  );
};

export default LolByteApp;
