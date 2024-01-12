import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {MovieShowtimes} from '../hooks/useGetMovieDetails';

interface BodyProps {
  showtimes: string;
}

export const Body: FC<BodyProps> = ({showtimes}) => {
  return (
    <View>
      <Text>{showtimes}</Text>
    </View>
  );
};
