import React, {FC} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Accordion from '../components/Accordion';
import {MovieInfo} from '../../../deadCode/useGetMoviesShowtimesDates';
import moment from 'moment';
import Carousel from '../components/Carousel';
import {
  MovieDetails,
  MovieShowtimes,
  MovieWithShowtimes,
  MoviesAndTheatersAndShowtimes,
  TheaterDetails,
} from '../hooks/types';
import {uuidV4} from '../utils/uuid';

const {height, width} = Dimensions.get('screen');

export interface Showtime {
  movieName: string;
  isOpenCaption: boolean;
  showtimeDate: string;
  showtimeTime: string;
  showtimeTheaterId: string;
  theaterName?: string;
}

interface Theater {
  theaterId: string;
  theaterName: string;
  hasReservedSeating: boolean;
  hasCurrentShowtimes: boolean;
  distanceFromUserZipcode: number;
}

export interface Movie {
  durationInMinutes: number;
  motionPictureRating: string;
  movieName: string;
  posterImageUrl: string;
  releaseDate: string;
  rottenTomatoScore: number;
  showtimes: Showtime[];
}

interface MovieProps {
  theaterData: TheaterDetails[];
  movieData: Movie[];
  isMovieScreen: boolean;
}

export const Movie: FC<MovieProps> = ({
  theaterData,
  movieData,
  isMovieScreen,
}) => {
  const combineObjects = (movies: Movie[], theaters: Theater[]): Movie[] => {
    const uniqueMovies: {[key: string]: Movie} = {};

    movies.forEach(movie => {
      const key = movie.movieName;
      if (!uniqueMovies[key]) {
        uniqueMovies[key] = {...movie, showtimes: []};
      }
      movie.showtimes.forEach(showtime => {
        const theaterId = showtime.showtimeTheaterId;
        const matchingTheater = theaters.find(
          theater => theater.theaterId === theaterId,
        );

        const showtimeWithTheaterName = {
          ...showtime,
          theaterName: matchingTheater
            ? matchingTheater.theaterName
            : undefined,
        };

        uniqueMovies[key].showtimes.push(showtimeWithTheaterName);
      });
    });

    return Object.values(uniqueMovies);
  };
  const combinedMovies: Movie[] = combineObjects(movieData, theaterData);
  // const showtimeArray = combinedMovies.map(show => show.showtimes);
  const showtimeArray: Showtime[] = combinedMovies.reduce(
    (acc: Showtime[], movie: Movie) => [...acc, ...movie.showtimes],
    [],
  );

  function combineShowtimes(data: Showtime[]): any[] {
    const combinedData: {[key: string]: any} = {};

    data.forEach(entry => {
      const key = `${entry.theaterName}_${entry.movieName}`;
      if (!combinedData[key]) {
        combinedData[key] = {
          theaterName: entry.theaterName,
          movieName: entry.movieName,
          showtimes: [],
        };
      }
      combinedData[key].showtimes.push({
        showtimeDate: entry.showtimeDate,
        showtimeTheaterId: entry.showtimeTheaterId,
        showtimeTime: entry.showtimeTime,
        isOpenCaption: entry.isOpenCaption,
      });
    });

    return Object.values(combinedData);
  }
  const newArray = combineShowtimes(showtimeArray);
  const formattedData: {[key: string]: any} = {};
  newArray.forEach(entry => {
    const key = entry.movieName;
    if (!formattedData[key]) {
      formattedData[key] = {
        movieName: entry.movieName,
        theaters: [],
      };
    }

    formattedData[key].theaters.push({
      theaterName: entry.theaterName,
      showtimes: entry.showtimes,
    });
  });
  const dataToRender = Object.values(formattedData);

  return (
    <FlatList
      data={dataToRender}
      snapToAlignment="center"
      snapToInterval={width}
      renderItem={({item}) => (
        <Accordion
          header={item.movieName}
          theaterInfo={item.theaters}
          isMovieScreen={isMovieScreen}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
