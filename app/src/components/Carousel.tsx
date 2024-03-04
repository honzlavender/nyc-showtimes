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
    <View style={styles.container}>
      {/* <Pagination data={theaterInfo} scrollX={scrollX} index={index} /> */}
      <FlatList
        data={theaterInfo}
        renderItem={({item}) => (
          <View>
            <Text>{item.theaterName} - {item.theaterId}</Text>
            <FlatList
              data={item.showtimes}
              renderItem={({item}) => {
                console.log(item.showtimeTime)
                return (
                  <Text>
                    {item.showtimeTime}
                    {item.isOpenCaption && ' - open captions'}
                  </Text>
                );
              }}
            />
          </View>
        )}
      />
      {/* <FlatList
        data={movieData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      /> */}
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
    marginTop: 20,
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
