import React, {FC} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import Accordion from '../components/Accordion';
import {TheaterInfo, useGetTheaterById} from '../hooks/useGetTheaters';
import {MovieInfo} from '../../../deadCode/useGetMoviesShowtimesDates';
import {MovieDetails, MovieShowtimes} from '../hooks/useGetMovieDetails';
import moment from 'moment';
import Carousel from '../components/Carousel';

const {height, width} = Dimensions.get('screen');

interface MovieProps {
  theaterInfo: TheaterInfo;
  movieDetails: MovieDetails[];
  isMovieScreen: boolean;
  moviesPlaying: string[];
}

export const Movie: FC<MovieProps> = ({
  theaterInfo,
  isMovieScreen,
  movieDetails,
  moviesPlaying,
}) => {
  const renderItem = ({item}: {item: MovieDetails}) => {
    const movieTimes: {dateTime: Date; formattedTime: string}[] = [];

    item.movieShowtimes.map(showtime => {
      const timeFormat = `${showtime.providerDate} ${showtime.providerTime}`;
      const isOpenCaption = showtime.isOpenCaption ? 'open caption' : '';
      const formattedTime = moment(timeFormat).format('LT');
      const displayTime = `${formattedTime} ${isOpenCaption}`;
      movieTimes.push({
        dateTime: moment(timeFormat, 'YYYY-MM-DD HH:mm:ss').toDate(),
        formattedTime: displayTime,
      });
    });

    movieTimes.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
    const formattedShowtimesWithTag = movieTimes.map(
      time => time.formattedTime,
    );

    return (
      <Accordion
        theaterInfo={theaterInfo}
        header={item.name}
        movieDetails={movieDetails}
        showtimes={formattedShowtimesWithTag.join('\n')}
        isMovieScreen={isMovieScreen}
      />
    );
  };

  // console.log('movie', moviesPlaying.map(movie => movie))
  const movies = moviesPlaying.map(movie => movie);

  const renderMovies = ({item}: any) => {
    // const movies = item.map(movie => movie)
    return <Text>{item}</Text>;
  };

  return <FlatList data={movieDetails} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  container: {
    // width,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
