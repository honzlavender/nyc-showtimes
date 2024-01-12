import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ExpandedHeader} from './ExpandedHeader';
import {Body} from './Body';
import {TheaterInfo} from '../hooks/useGetTheaters';
import {MovieInfo} from '../../../deadCode/useGetMoviesShowtimesDates';
import {MovieDetails, MovieShowtimes} from '../hooks/useGetMovieDetails';

const {width, height} = Dimensions.get('screen');

interface ShowtimeTabProps {
  // theaterName: string;
  // movieTitle: string;
  showtimes: string;
  theaterInfo: TheaterInfo;
  movieDetails: MovieDetails[] | string;
  isMovieScreen: boolean;
}

export const ShowtimeTab: FC<ShowtimeTabProps> = ({
  // theaterName,
  // movieTitle,
  showtimes,
  theaterInfo,
  movieDetails,
  isMovieScreen,
}) => {
  return (
    <View style={styles.container}>
      <ExpandedHeader
        movieTitle={movieDetails}
        theaterName={theaterInfo.theaterName}
        isMovieScreen={isMovieScreen}
      />
      <Body showtimes={showtimes} />
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
