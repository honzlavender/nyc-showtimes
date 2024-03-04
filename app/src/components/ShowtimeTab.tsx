import React, {FC} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {ExpandedHeader} from './ExpandedHeader';
import {Body} from './Body';
import {MovieDetails, MovieShowtimes, TheaterDetails} from '../hooks/types';

const {width, height} = Dimensions.get('screen');

interface ShowtimeTabProps {
  theaterInfo: TheaterDetails[];
  movieData: MovieShowtimes[];
  isMovieScreen: boolean;
}

export const ShowtimeTab: FC<ShowtimeTabProps> = ({
  theaterInfo,
  movieData,
  isMovieScreen,
}) => {
  //if movie title theater id matches a theaterinfo theater id return theater name
  // const theaterName = theaterInfo.map(theater => theater.theaterName);
  // const movieTitle = movieData.map(movie => movie.movieName);
  // const showtimes = movieData.map(showtime => showtime.showtimes);
  // const theaterIdFromTheater = theaterInfo.map(theater => theater.theaterId);
  // const theaterIdFromMovie = showtimes.flatMap(showtimes =>
  //   showtimes.filter(showtime =>
  //     theaterIdFromTheater.includes(showtime.showtimeTheaterId),
  //   ),
  // );

  // const theaterNames = theaterIdFromMovie.map(showtime => {
  //   const matchingTheater = theaterInfo.find(
  //     theater => theater.theaterId === showtime.showtimeTheaterId,
  //   );
  //   return matchingTheater ? matchingTheater.theaterName : null;
  // });
  // console.log('from theater', theaterIdFromTheater)
  // console.log('from movie', showtimeTheaterIds)

  return (
    <View style={styles.container}>
    <FlatList
      data={movieData}
      renderItem={({ item }) => (
        <View>
          <Text>
            {item.isOpenCaption
              ? `${item.showtimeTime} (F***)`
              : item.showtimeTime}
          </Text>
        </View>
      )}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    paddingLeft: 12,
    // alignItems: 'center',
    // justifyContent: 'space-around',
    // borderColor: 'red',
    borderWidth: 2,
    marginVertical: 20,
  },
});
