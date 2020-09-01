import {applyMiddleware, createStore} from 'redux';
import {getFromStorage, setToStorage} from './utils/Storage';

import CurrentGame from './components/CurrentGame';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import React from 'react';
import RegionSelect from './components/RegionSelect';
import Results from './components/Results';
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
                matchesData: {
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
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={pages.selectRegion}
            component={RegionSelect}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={pages.results}
            component={Results}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={pages.currentGame}
            component={CurrentGame}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default LolByteApp;
