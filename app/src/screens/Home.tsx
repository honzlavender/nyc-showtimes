import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getMovieShowtimes} from '../hooks/getMovieShowtimes';
import {getAllTheaters} from '../hooks/getAllTheaters';
import MovieView from './MovieView';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const {movies: movieData} = getMovieShowtimes();
  const {data: theaterData} = getAllTheaters();
  return (
    <View>
      <MovieView theaterData={theaterData} movieData={movieData} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
