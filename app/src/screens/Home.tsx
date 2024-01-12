import React, {FC, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import {getTheaterList, useGetTheaterById} from '../hooks/useGetTheaters';
import {Theater} from './Theater';
import {Movie} from './Movie';
import {
  extractMovieData,
  getTheaterShowtimes,
} from '../hooks/useGetMovieDetails';
interface HomeProps {}
const {height, width} = Dimensions.get('screen');

const Home: FC<HomeProps> = () => {
  const [isMovieScreen, setIsMovieScreen] = useState(true);

  const {movieDetails, displayDate} = extractMovieData('angelika');
  const {theaterList, theaterId} = getTheaterList();
  const theaterInfo = useGetTheaterById('Al2f6XiGOIkVTp4');
  const toggleScreen = () => {
    setIsMovieScreen(!isMovieScreen);
  };
  const {todaysDate, moviesPlaying} = getTheaterShowtimes(theaterId);
  return (
    <View style={styles.top}>
      <View style={styles.container}>
        <Text style={styles.date}>{moment(todaysDate).format('LL')}</Text>
      </View>
      <TouchableOpacity onPress={toggleScreen} style={styles.button}>
        <Text style={styles.buttonText}>
          {isMovieScreen ? 'movies' : 'theaters'}
        </Text>
      </TouchableOpacity>
      {isMovieScreen ? (
        <Movie
          theaterInfo={theaterInfo}
          movieDetails={movieDetails}
          isMovieScreen={isMovieScreen}
          moviesPlaying={moviesPlaying}
        />
      ) : (
        <Theater
          theaterInfo={theaterInfo}
          movieDetails={movieDetails}
          isMovieScreen={isMovieScreen}
          theaterList={theaterList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    // width,
    // paddingHorizontal: 10,
  },
  container: {
    marginTop: 50,
    alignItems: 'center',
    // justifyContent: 'center',
    // width,
    // marginHorizontal: 10,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  button: {
    backgroundColor: 'brown',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 100,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
