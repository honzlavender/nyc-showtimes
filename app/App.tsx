import React, {useState} from 'react';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LightTheme} from './theme/theme';
import Accordion from './src/components/Accordion';
import {MovieDetails, TheaterDetails} from './src/hooks/types';
import {getMovieShowtimes} from './src/hooks/getMovieShowtimes';
import {Text, View} from 'react-native';
import moment from 'moment';

export type RootStackParamList = {
  Home: undefined;
  Accordion: {
    header: string;
    theaterInfo: TheaterDetails[];
    index: number;
    // chosenMovie: any;
    // setChosenMovie: React.Dispatch<React.SetStateAction<MovieDetails>>;
    movieDetails: MovieDetails[];
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const {todaysDate} = getMovieShowtimes();

  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => (
              <View
                style={{
                  height: 130,
                  backgroundColor: '#EAF6DB',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  paddingHorizontal: 18,
                  paddingBottom: 10,
                }}>
                <Text style={{fontSize: 30, fontWeight: '900'}}>
                  {moment(todaysDate).format('LL').toLocaleLowerCase()}
                </Text>
                <Text style={{}}>wow</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Accordion"
          component={Accordion}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
