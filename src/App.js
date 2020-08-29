import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import Profile from './components/Profile';
import {Provider} from 'react-redux';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {getFromStorage} from './utils/Storage';
import summonersReducer from './reducers/SummonersReducer';

const Stack = createStackNavigator();

let summonersStore = createStore(summonersReducer);
// getFromStorage('@summoners').then((summoners) => {
//   if (summoners == null) {
//     return;
//   }
//   summonersStore = createStore(summonersReducer, summoners);
// });

const LolByteApp = () => {
  return (
    <Provider store={summonersStore}>
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
