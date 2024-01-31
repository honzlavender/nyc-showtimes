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
import {MovieDetails, TheaterDetails} from '../hooks/types';

const {height, width} = Dimensions.get('screen');

interface CarouselProps {
  theaterInfo: TheaterDetails[];
  movieData: MovieDetails[];
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

  const renderItem = ({item}: {item: MovieDetails}) => {
    // const movieTimes: {dateTime: Date; formattedTime: string}[] = [];

    // if (typeof item !== 'string' && item.movieShowtimes) {
    //   item.movieShowtimes.forEach(showtime => {
    //     const timeFormat = `${showtime.providerDate} ${showtime.providerTime}`;
    //     const isOpenCaption = showtime.isOpenCaption ? 'open caption' : '';
    //     const formattedTime = moment(timeFormat).format('LT');
    //     const displayTime = `${formattedTime} ${isOpenCaption}`;
    //     movieTimes.push({
    //       dateTime: moment(timeFormat, 'YYYY-MM-DD HH:mm:ss').toDate(),
    //       formattedTime: displayTime,
    //     });
    //   });

    //   movieTimes.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
    // }

    // const formattedShowtimesWithTag = movieTimes.map(
    //   time => time.formattedTime,
    // );
    const theaterIdFromTheater = theaterInfo.map(theater => theater.theaterId);
    const theaterIdFromMovie = item.showtimes.filter(showtime =>
      theaterIdFromTheater.includes(showtime.showtimeTheaterId),
    );

    const theaterNames = theaterIdFromMovie.map(showtime => {
      const matchingTheater = theaterInfo.find(
        theater => theater.theaterId === showtime.showtimeTheaterId,
      );
      return matchingTheater ? matchingTheater.theaterName : null;
    });
    // console.log('id from theater info', theaterIdFromTheater);
    // console.log('id from movie showtime', theaterIdFromMovie);

    return (
      <ShowtimeTab
        theaterInfo={theaterInfo}
        movieData={movieData}
        isMovieScreen={isMovieScreen}
      />
    );
  };

  const movieInfoObject = (
    <View style={styles.movieInfoObject}>
      <Text>movie info</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* {movieInfoObject} */}
      {/* <Pagination data={movieData} scrollX={scrollX} index={index} /> */}
      <FlatList
        data={movieData}
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
  movieInfoObject: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
