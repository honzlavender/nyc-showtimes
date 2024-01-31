import React, {FC, useEffect, useState} from 'react';
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
import {getTheaterList} from '../hooks/useGetTheaters';
import {Theater} from './Theater';
import {Movie} from './Movie';
import {
  MovieDetails,
  // MovieShowtimes,
  getTheaterShowtimesAndMovieData,
} from '../hooks/useGetMovieDetails';
import {getMovieShowtimes} from '../hooks/getMovieShowtimes';
import {getAllTheaters} from '../hooks/getAllTheaters';
import {MovieShowtimes, TheaterDetails} from '../hooks/types';
import {uuidV4} from '../utils/uuid';

interface HomeProps {}
const {height, width} = Dimensions.get('screen');

export interface Theater {
  id: string;
  name: string;
}

interface MoviesAndTheatersAndShowtimes extends MovieDetails {
  theaterInfo: {
    [theaterId: string]: {
      theaterDetails: TheaterDetails[];
      showtimes: MovieShowtimes[];
    };
  };
}

const Home: FC<HomeProps> = () => {
  const [isMovieScreen, setIsMovieScreen] = useState(true);
  //THEATERDETAILS
  const {todaysDate, moviesPlaying, allMovieShowtimes} =
    getTheaterShowtimesAndMovieData();
  const toggleScreen = () => {
    setIsMovieScreen(!isMovieScreen);
  };

  const {data: theaterData} = getAllTheaters();
  const {movies: movieData} = getMovieShowtimes();

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
      <Movie
        theaterData={theaterData}
        movieData={movieData}
        isMovieScreen={isMovieScreen}
      />
      {/* {
        isMovieScreen ? (
          <Movie
            theaterInfo={theaterDetails}
            movieDetails={movieDetails}
            isMovieScreen={isMovieScreen}
            moviesPlaying={moviesPlaying}
          />
        ) : undefined
        // <Theater
        //   theaterInfo={theaterList}
        //   movieDetails={movieDetails}
        //   isMovieScreen={isMovieScreen}
        //   theaterList={theaterList}
        // />
      } */}
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
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
