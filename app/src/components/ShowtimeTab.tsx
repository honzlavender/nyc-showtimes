import React, {FC} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {ExpandedHeader} from './ExpandedHeader';
import {Body} from './Body';
import {MovieDetails, MovieShowtimes, TheaterDetails} from '../hooks/types';

const {width, height} = Dimensions.get('screen');

interface ShowtimeTabProps {
  theaterInfo?: TheaterDetails[];
  movieData?: MovieShowtimes[];
  isMovieScreen: boolean;
  showtimeTime: string;
  isOpenCaption: boolean;
}

export const ShowtimeTab: FC<ShowtimeTabProps> = ({
  theaterInfo,
  movieData,
  showtimeTime,
  isOpenCaption,
  isMovieScreen,
}) => {

  return (
    <View style={styles.container}>
      <Text>
        {showtimeTime}
        {isOpenCaption && ' - open captions'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    // paddingLeft: 12,
    // alignItems: 'center',
    // justifyContent: 'space-around',
    // borderColor: 'red',
    // marginVertical: 20,
  },
});
