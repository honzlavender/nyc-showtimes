import React from 'react';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LightTheme} from './theme/theme';
import MovieView from './src/screens/MovieView';
import Accordion from './src/components/Accordion';
import {Movie, MovieDetails, TheaterDetails} from './src/hooks/types';
import {getMovieShowtimes} from './src/hooks/getMovieShowtimes';

export type RootStackParamList = {
  Home: undefined;
  Accordion: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Accordion"
          component={Accordion}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
