import React, {FC} from 'react';
import {FlatList, Text, View} from 'react-native';
import {TheaterDetails, TheaterInfo} from '../hooks/useGetTheaters';
import {useGetMoviesShowtimesDates} from '../../../deadCode/useGetMoviesShowtimesDates';
import Accordion from '../components/Accordion';
import {MovieDetails} from '../hooks/useGetMovieDetails';
import moment from 'moment';

interface TheaterProps {
  theaterInfo: TheaterInfo;
  movieDetails: MovieDetails[];
  isMovieScreen: boolean;
  theaterList: TheaterDetails[];
}

export const Theater: FC<TheaterProps> = ({
  theaterInfo,
  movieDetails,
  isMovieScreen,
  theaterList,
}) => {
  const renderItem = ({item}: {item: MovieDetails}) => {
    const movieTimes: {dateTime: Date; formattedTime: string}[] = [];

    item.movieShowtimes.map(showtime => {
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
    const formattedShowtimesWithTag = movieTimes.map(
      time => time.formattedTime,
    );
    const theaterName = theaterList.map(theater => theater.theaterName);
    return (
      <View>
        <Accordion
          theaterInfo={theaterInfo}
          header={theaterInfo.theaterName}
          movieDetails={item.name}
          showtimes={formattedShowtimesWithTag.join('\n')}
          isMovieScreen={isMovieScreen}
        />
      </View>
    );
  };

  const renderAnotherItem = ({item}: {item: TheaterDetails}) => {
    const movieTimes: {dateTime: Date; formattedTime: string}[] = [];

    const movieShowtimes = movieDetails.flatMap(
      showtimes => showtimes.movieShowtimes || [],
    );

    movieShowtimes.map(showtime => {
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
    const formattedShowtimesWithTag = movieTimes.map(
      time => time.formattedTime,
    );
    return (
      <View>
        <Accordion
          theaterInfo={theaterInfo}
          header={item.theaterName}
          movieDetails={item.theaterName}
          showtimes={formattedShowtimesWithTag.join('\n')}
          isMovieScreen={isMovieScreen}
        />
      </View>
    );
  };

  return (
    <View style={{padding: 12}}>
      <Text>theater screen</Text>
      {/* <FlatList data={movieDetails} renderItem={renderItem} /> */}
      <FlatList
        data={theaterList.slice(0, 10)}
        renderItem={renderAnotherItem}
      />
    </View>
  );
};
