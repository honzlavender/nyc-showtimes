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
import {TheaterInfo} from '../hooks/useGetTheaters';
import {MovieDetails} from '../hooks/useGetMovieDetails';
import moment from 'moment';
import Pagination from './Pagination';

const {height, width} = Dimensions.get('screen');

interface CarouselProps {
  theaterInfo: TheaterInfo;
  showtimes: string;
  movieDetails: MovieDetails[] | string;
  isMovieScreen: boolean;
}

const Carousel: FC<CarouselProps> = ({
  showtimes,
  theaterInfo,
  isMovieScreen,
  movieDetails,
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

  const renderItem = ({item}: {item: MovieDetails | string}) => {
    const movieTimes: {dateTime: Date; formattedTime: string}[] = [];

    if (typeof item !== 'string' && item.movieShowtimes) {
      item.movieShowtimes.forEach(showtime => {
        const timeFormat = `${showtime.providerDate} ${showtime.providerTime}`;
        const isOpenCaption = showtime.isOpenCaption ? 'open caption' : '';
        const formattedTime = moment(timeFormat).format('LT');
        const displayTime = `${formattedTime} ${isOpenCaption}`;
        movieTimes.push({
          dateTime: moment(timeFormat, 'YYYY-MM-DD HH:mm:ss').toDate(),
          formattedTime: displayTime,
        });
      });

      movieTimes.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
    }

    const formattedShowtimesWithTag = movieTimes.map(
      time => time.formattedTime,
    );

    return (
      <ShowtimeTab
        theaterInfo={theaterInfo}
        movieDetails={movieDetails}
        showtimes={formattedShowtimesWithTag.join('\n')}
        isMovieScreen={isMovieScreen}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Pagination data={movieDetails} scrollX={scrollX} index={index} />
      <FlatList
        data={movieDetails}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
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
});
