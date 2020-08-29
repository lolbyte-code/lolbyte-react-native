import HomeScreen from './screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import ProfileScreen from './screens/ProfileScreen';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const LolByteApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LolByteApp;
