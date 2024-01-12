import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {ShowtimeTab} from './ShowtimeTab';
import {TheaterInfo} from '../hooks/useGetTheaters';
import {MovieInfo} from '../../../deadCode/useGetMoviesShowtimesDates';
import {MovieDetails, MovieShowtimes} from '../hooks/useGetMovieDetails';
import Carousel from './Carousel';

const {height, width} = Dimensions.get('screen');

interface AccordionProps {
  theaterInfo: TheaterInfo;
  showtimes: string;
  // movieTitle?: string;
  header: string;
  // theaterName?: string;
  movieDetails: MovieDetails[] | string;
  isMovieScreen: boolean;
}

const Accordion: FC<AccordionProps> = ({
  showtimes,
  theaterInfo,
  isMovieScreen,
  movieDetails,
  header,
}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleItem = () => {
    setExpanded(!expanded);
  };

  const body = (
    <View style={styles.accordBody}>
      {/* <ShowtimeTab
        theaterInfo={theaterInfo}
        movieDetails={movieDetails}
        showtimes={showtimes}
        isMovieScreen={isMovieScreen}
      /> */}
      <Carousel
        theaterInfo={theaterInfo}
        showtimes={showtimes}
        movieDetails={movieDetails}
        isMovieScreen={isMovieScreen}
      />
    </View>
  );

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <Text style={styles.accordTitle}>{header}</Text>
        <Text>{expanded ? '^' : '***'}</Text>
      </TouchableOpacity>
      {expanded && body}
      {/* <Carousel theaterInfo={theaterInfo} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  accordContainer: {
    // width
    // paddingBottom: 4,
  },
  accordHeader: {
    padding: 12,
    backgroundColor: 'pink',
    color: '#eee',
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordBody: {
    // width,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  accordTitle: {
    fontSize: 20,
  },
});

export default Accordion;
