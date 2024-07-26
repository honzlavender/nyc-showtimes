import React, {FC, useState} from 'react';
import {Button, ImageBackground, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Carousel from './Carousel';
import {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {height} from '../utils/utils';

type AccordionScreenRouteProp = RouteProp<RootStackParamList, 'Accordion'>;

interface AccordionProps {
  route: AccordionScreenRouteProp;
  navigation: any;
}

const Accordion: FC<AccordionProps> = ({route, navigation}) => {
  const {
    header,
    theaterInfo,
    index,
    // chosenMovie,
    // setChosenMovie,
    movieDetails,
  } = route.params;
  //@ts-ignore
  const image = ''//movieDetails.posterImageUrl;

  return (
    <ImageBackground source={{uri: image}} style={styles.imageContainer}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text>{`< back`}</Text>
        </TouchableOpacity>
        {/* <Text>{header}</Text> */}
        <Carousel theaterInfo={theaterInfo} />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center'
  },
  imageContainer: {
    // justifyContent: 'center'
    height,
  },
  button: {
    width: 64,
    backgroundColor: '#ffffff90',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerFont: {
    // fontSize: 20,
  },
});

export default Accordion;
