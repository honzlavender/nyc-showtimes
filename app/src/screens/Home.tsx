import React, {FC, useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getMovieShowtimes} from '../hooks/getMovieShowtimes';
import {getAllTheaters} from '../hooks/getAllTheaters';
import MovieView from './MovieView';
import moment from 'moment';
import WavyBorder from '../assets/svg/WavyBorder';
import {ThemeContext, themes} from '../../theme/theme';
import { ThemeToggle } from '../components/ThemeToggle';
import { SafeAreaView } from 'react-native-safe-area-context';

// const {theme, toggleTheme} = useContext(ThemeContext);
interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [isMovieScreen, setIsMovieScreen] = useState(true);
  const toggleScreen = () => {
    setIsMovieScreen(!isMovieScreen);
  };
  const {movies: movieData, todaysDate} = getMovieShowtimes();
  const {data: theaterData} = getAllTheaters();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.date}>{moment(todaysDate).format('LL')}</Text>
      <TouchableOpacity style={styles.button} onPress={toggleScreen}>
        <Text style={styles.buttonText}>
          {isMovieScreen ? 'movies' : 'theaters'}
        </Text>
      </TouchableOpacity>
      {isMovieScreen ? (
        <MovieView theaterData={theaterData} movieData={movieData} />
      ) : (
        <View>
          <Text>this will be the theater sort view</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1
    // marginTop: 50,
    // alignItems: 'center',
  },
  date: {
    // fontSize: 20,
    // fontWeight: 'bold',
    // margin: 16,
  },
  button: {
    // backgroundColor: 'brown',
    // padding: 10,
    // borderRadius: 5,
    // alignItems: 'center',
    // marginHorizontal: 100,
    // marginBottom: 20,
  },
  buttonText: {
    // color: '#fff',
    // fontSize: 16,
    // fontWeight: 'bold',
  },
});

export default Home;
