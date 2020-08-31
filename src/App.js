import {applyMiddleware, createStore} from 'redux';
import {getFromStorage, setToStorage} from './utils/Storage';

import CurrentGame from './components/CurrentGame';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import Profile from './components/Profile';
import {Provider} from 'react-redux';
import React from 'react';
import RegionSelect from './components/RegionSelect';
import {createStackNavigator} from '@react-navigation/stack';
import {pages} from './Constants';
import reducer from './reducers/index.js';
import thunkMiddleware from 'redux-thunk';

const SUMMONERS_STORAGE = '@summoners';

const Stack = createStackNavigator();

const LolByteApp = () => {
  const [store, setStore] = React.useState(
    createStore(
      reducer,
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
      ),
    ),
  );
  store.subscribe(() => {
    setToStorage(SUMMONERS_STORAGE, store.getState().summoners);
  });

  React.useEffect(() => {
    getFromStorage(SUMMONERS_STORAGE).then((summoners) => {
      if (summoners !== null) {
        setStore(
          createStore(
            reducer,
            {
              summoners: summoners,
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
              },
            },
            applyMiddleware(
              thunkMiddleware, // lets us dispatch() functions
            ),
          ),
        );
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={pages.home}
            component={Home}
            initialParams={{region: 'na'}}
          />
          <Stack.Screen
            name={pages.selectRegion}
            component={RegionSelect}
            options={{headerShown: false}}
          />
          <Stack.Screen name={pages.profile} component={Profile} />
          <Stack.Screen name={pages.currentGame} component={CurrentGame} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default LolByteApp;
