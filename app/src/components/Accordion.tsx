import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TheaterDetails} from '../hooks/types';
import Carousel from './Carousel';

interface AccordionProps {
  header: string;
  theaterInfo: TheaterDetails[];
  index: any;
  chosenMovie: any;
  setChosenMovie: any;
}

const Accordion: FC<AccordionProps> = ({
  header,
  theaterInfo,
  index,
  chosenMovie,
  setChosenMovie,
}) => {
  const isOpen = chosenMovie === index;
  const toggleItem = () => {
    setChosenMovie(chosenMovie ? null : index);
  };
  const body = (
    <View>
      <Carousel theaterInfo={theaterInfo} />
    </View>
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
