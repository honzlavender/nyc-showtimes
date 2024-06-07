import React, {FC, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MovieDetails, TheaterDetails} from '../hooks/types';
import Carousel from './Carousel';

interface AccordionProps {
  header: string;
  theaterInfo: TheaterDetails[];
  index: any;
  chosenMovie: any;
  setChosenMovie: any;
  movieDetails: MovieDetails[];
}

const Accordion: FC<AccordionProps> = ({
  header,
  theaterInfo,
  index,
  chosenMovie,
  setChosenMovie,
  movieDetails,
}) => {
  const isOpen = chosenMovie === index;
  const toggleItem = () => {
    setChosenMovie(chosenMovie === index ? null : index);
  };
const image = movieDetails.map(url => url.posterImageUrl)

  const body = (
    <ImageBackground source={{uri: image[0]}}>
      <Carousel theaterInfo={theaterInfo} />
    </ImageBackground>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerButton} onPress={toggleItem}>
        <Text style={styles.header}>{header}</Text>
        <Text>{isOpen ? '^' : '***'}</Text>
      </TouchableOpacity>
      {isOpen && body}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  headerButton: {
    padding: 12,
    backgroundColor: 'pink',
    color: '#eee',
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 20,
  },
});

export default Accordion;
