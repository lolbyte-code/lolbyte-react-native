import {DEFAULT_REGION, SUMMONERS_STORAGE, pages} from '@app/Constants';
import {
  bulkAddFavoriteSummoners,
  bulkAddRecentSummoners,
} from '@app/data/actions/SummonersActions';

import CurrentGame from '@app/components/scenes/CurrentGame';
import Home from '@app/components/scenes/Home';
import {NavigationContainer} from '@react-navigation/native';
import NotFound from '@app/components/scenes/NotFound';
import React from 'react';
import RegionSelect from '@app/components/scenes/RegionSelect';
import Results from '@app/components/scenes/Results';
import {createStackNavigator} from '@react-navigation/stack';
import {getFromStorage} from '@app/utils/Storage';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

const AppContainer = () => {
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

export default AppContainer;
