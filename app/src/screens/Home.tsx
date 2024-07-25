import React, {FC, useContext, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getMovieShowtimes} from '../hooks/getMovieShowtimes';
import {getAllTheaters} from '../hooks/getAllTheaters';
import MovieView from './MovieView';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
interface HomeProps {
  navigation: any;
}

const Home: FC<HomeProps> = ({navigation}) => {
  const [isMovieScreen, setIsMovieScreen] = useState(true);
  const toggleScreen = () => {
    setIsMovieScreen(!isMovieScreen);
  };
  const {movies: movieData, todaysDate} = getMovieShowtimes();
  const {data: theaterData} = getAllTheaters();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.date}>
        {moment(todaysDate).format('LL').toLocaleLowerCase()}
      </Text>
      <MovieView navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
    color: '#24302A',
  },
  button: {
    backgroundColor: '#A82D1A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 100,
    marginBottom: 20,
  },
  buttonText: {
    color: '#F0DBC8',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
// <TouchableOpacity style={styles.button} onPress={toggleScreen}>
//   <Text style={styles.buttonText}>
//     {isMovieScreen ? 'movies' : 'theaters'}
//   </Text>
// </TouchableOpacity>
// {isMovieScreen ? (
//   <MovieView navigation={navigation} />
// ) : (
//   <View>
//     <Text>this will be the theater sort view</Text>
//   </View>
// )}
