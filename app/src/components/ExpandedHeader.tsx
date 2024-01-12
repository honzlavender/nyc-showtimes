import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {MovieDetails} from '../hooks/useGetMovieDetails';

interface ExpandedHeaderProps {
  theaterName?: string;
  movieTitle?: MovieDetails[] | string;
  isMovieScreen: boolean;
}

export const ExpandedHeader: FC<ExpandedHeaderProps> = ({
  theaterName,
  movieTitle,
  isMovieScreen,
}) => {
  const header = isMovieScreen ? theaterName : movieTitle;
  return (
    <View>
      <Text>{`${header}`}</Text>
    </View>
  );
};
