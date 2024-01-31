import React, {FC} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
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

interface MovieProps {
  theaterData: TheaterDetails[];
  movieData: MovieWithShowtimes[];
  isMovieScreen: boolean;
}

export const Movie: FC<MovieProps> = ({theaterData, movieData}) => {
  // Create a map to organize data by movie and theater
  const organizedData = new Map();

  // Populate the map with data
  movieData.forEach(movie => {
    movie.showtimes.forEach(showtime => {
      const theater = theaterData.find(
        theater => theater.theaterId === showtime.showtimeTheaterId,
      );
      if (theater) {
        const key = `${movie.movieName}_${theater.theaterName}`;
        if (!organizedData.has(key)) {
          organizedData.set(key, {
            movieName: movie.movieName,
            theaterName: theater.theaterName,
            showtimes: [],
          });
        }
        const isOpenCaption = showtime.isOpenCaption;
        organizedData
          .get(key)
          .showtimes.push({isOpenCaption, showtimeTime: showtime.showtimeTime});
      }
    });
  });

  // Convert the map values to an array for rendering
  const organizedArray = Array.from(organizedData.values());

  return (
    <>
      <FlatList
        data={organizedArray}
        renderItem={({item}) => (
          <View>
            <Text>{item.movieName}</Text>
            <Text>{item.theaterName}</Text>
            <FlatList
              data={item.showtimes}
              renderItem={({item: showtime}) => (
                <View>
                  <Text>
                    {showtime.isOpenCaption
                      ? `${showtime.showtimeTime} FUCK`
                      : showtime.showtimeTime}
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
