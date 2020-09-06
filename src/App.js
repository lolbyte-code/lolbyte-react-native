import {DEFAULT_REGION, SUMMONERS_STORAGE, pages} from './Constants';
import {
  bulkAddFavoriteSummoners,
  bulkAddRecentSummoners,
} from './data/SummonersActions';

import CurrentGame from './components/CurrentGame';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import NotFound from './components/NotFound';
import React from 'react';
import RegionSelect from './components/RegionSelect';
import Results from './components/Results';
import {createStackNavigator} from '@react-navigation/stack';
import {getFromStorage} from './utils/Storage';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getFromStorage(SUMMONERS_STORAGE).then((summoners) => {
      if (summoners) {
        if (summoners.recentSummoners) {
          dispatch(bulkAddRecentSummoners(summoners.recentSummoners));
        }
        if (summoners.favoriteSummoners) {
          dispatch(bulkAddFavoriteSummoners(summoners.favoriteSummoners));
        }
      }
    });
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={pages.home}
          component={Home}
          initialParams={{summonerRegion: DEFAULT_REGION}}
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
        <Stack.Screen
          name={pages.notFound}
          component={NotFound}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
