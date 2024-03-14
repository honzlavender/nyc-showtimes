import React, {FC, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ShowtimeTab} from './ShowtimeTab';
import moment from 'moment';
import Pagination from './Pagination';
import {
  MovieDetails,
  MovieShowtimes,
  MovieWithShowtimes,
  TheaterDetails,
} from '../hooks/types';
import {Movie} from '../screens/Movie';
import {ExpandedHeader} from './ExpandedHeader';

const {height, width} = Dimensions.get('screen');

interface CarouselProps {
  theaterInfo: TheaterDetails[];
  movieData?: Movie[];
  isMovieScreen: boolean;
}

const Carousel: FC<CarouselProps> = ({
  theaterInfo,
  isMovieScreen,
  movieData,
}) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}: any) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      {/* <Pagination data={theaterInfo} scrollX={scrollX} index={index} /> */}
      <FlatList
        data={theaterInfo}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        renderItem={({item, index}) => (
          <View style={styles.container}>
            <ExpandedHeader
              isMovieScreen={isMovieScreen}
              theaterName={item.theaterName}
              theaterInfo={item.showtimes}
              index={index}
              totalTheaters={theaterInfo.length}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  // container: {
  //   // width,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
    // borderWidth: 2,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
  movieInfoObject: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
