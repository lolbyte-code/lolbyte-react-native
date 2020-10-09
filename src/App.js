import {applyMiddleware, createStore} from 'redux';

import AppContainer from '@app/AppContainer';
import {Provider} from 'react-redux';
import React from 'react';
import {SUMMONERS_STORAGE} from '@app/Constants';
import SplashScreen from 'react-native-splash-screen';
import reducer from '@app/data/index.js';
import {setToStorage} from '@app/utils/Storage';
import thunkMiddleware from 'redux-thunk';

const LolByteApp = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

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
          isError: false,
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
        matchData: {
          isFetching: true,
        },
        notificationData: {
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
