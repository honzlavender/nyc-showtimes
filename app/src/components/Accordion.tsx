import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {ShowtimeTab} from './ShowtimeTab';
import Carousel from './Carousel';
import {MovieDetails, TheaterDetails} from '../hooks/types';
import {ExpandedHeader} from './ExpandedHeader';
import {Body} from './Body';

const {height, width} = Dimensions.get('screen');

interface AccordionProps {
  theaterInfo: TheaterDetails[];
  // movieTitle?: string;
  header: string;
  // theaterName?: string;
  movieData: MovieDetails[];
  isMovieScreen: boolean;
}

const Accordion: FC<AccordionProps> = ({
  theaterInfo,
  isMovieScreen,
  movieData,
  header,
}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleItem = () => {
    setExpanded(!expanded);
  };

  const body = (
    <View style={styles.accordBody}>
      <Carousel
        theaterInfo={theaterInfo}
        movieData={movieData}
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
