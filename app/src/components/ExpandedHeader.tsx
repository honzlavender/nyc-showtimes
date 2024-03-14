import React, {FC, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {MovieDetails, MovieShowtimes, TheaterDetails} from '../hooks/types';
import {ShowtimeTab} from './ShowtimeTab';

const {height, width} = Dimensions.get('screen');

interface ExpandedHeaderProps {
  theaterName?: string;
  movieTitle?: string;
  isMovieScreen: boolean;
  theaterInfo: MovieShowtimes[];
  index: number;
  totalTheaters: number;
}

export const ExpandedHeader: FC<ExpandedHeaderProps> = ({
  theaterName,
  movieTitle,
  isMovieScreen,
  theaterInfo,
  totalTheaters,
  index,
}) => {
  //if selected index/slide keep centered
  //if last index show <
  //if first index show >
  const header = isMovieScreen ? theaterName : movieTitle;
  return (
    <View style={styles.container}>
      {index > 0 && <Text>{`<`}</Text>}
      <View style={styles.content}>
        <Text>{`${header}`}</Text>
        <FlatList
          snapToInterval={width}
          snapToAlignment="center"
          data={theaterInfo}
          renderItem={({item}) => {
            return (
              <ShowtimeTab
                isMovieScreen={isMovieScreen}
                showtimeTime={item.showtimeTime}
                isOpenCaption={item.isOpenCaption}
              />
            );
          }}
        />
      </View>
      {index < totalTheaters - 1 && <Text>{`>`}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width,
    marginVertical: 24,
  },
  content: {
    flex: 0.4,
    width: '80%',
    borderWidth: 2,
  },
});
