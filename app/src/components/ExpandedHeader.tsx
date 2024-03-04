import React, {FC} from 'react';
import {FlatList, Text, View} from 'react-native';
import {MovieDetails, MovieShowtimes, TheaterDetails} from '../hooks/types';
import {ShowtimeTab} from './ShowtimeTab';

interface ExpandedHeaderProps {
  theaterName?: string;
  movieTitle?: string;
  isMovieScreen: boolean;
  theaterInfo: MovieShowtimes[];
}

export const ExpandedHeader: FC<ExpandedHeaderProps> = ({
  theaterName,
  movieTitle,
  isMovieScreen,
  theaterInfo,
}) => {
  const header = isMovieScreen ? theaterName : movieTitle;
  return (
    <View>
      <Text style={{borderWidth: 2, backgroundColor: 'lightblue'}}>{`${header}`}</Text>
      <FlatList
        data={theaterInfo}
        style={{borderWidth: 2, backgroundColor: 'red'}}
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
  );
};
