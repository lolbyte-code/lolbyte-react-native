import {getFromStorage, setToStorage} from './utils/Storage';

import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import Profile from './components/Profile';
import {Provider} from 'react-redux';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import summonersReducer from './reducers/SummonersReducer';

const Stack = createStackNavigator();

const LolByteApp = () => {
  const [store, setStore] = React.useState(createStore(summonersReducer));
  store.subscribe(() => {
    setToStorage('@summoners', store.getState());
  });

  React.useEffect(() => {
    getFromStorage('@summoners').then((summoners) => {
      if (summoners !== null) {
        setStore(createStore(summonersReducer, summoners));
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default LolByteApp;
