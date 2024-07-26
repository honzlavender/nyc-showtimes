import React, {FC, useState} from 'react';
import {Movie, Showtime, TheaterDetails} from '../hooks/types';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import {width} from '../utils/utils';
import {getMovieShowtimes} from '../hooks/getMovieShowtimes';
import {getAllTheaters} from '../hooks/getAllTheaters';

interface MovieProps {
  // theaterData: TheaterDetails[];
  // movieData: Movie[];
  navigation: any;
}

const MovieView: FC<MovieProps> = ({navigation}) => {
  const {movies: movieData, todaysDate} = getMovieShowtimes();
  const {data: theaterData} = getAllTheaters();
  // const [chosenMovie, setChosenMovie] = useState(false);
  const colors = [
    //trolls
    // 'green',
    // '#7025B5',
    // '#155DC1',
    // '#F0CE0B',
    // '#FE8415',
    // '#EE0000',
    //midsommer
    '#B50102',
    '#D54D01',
    '#D99800',
    '#377856',
    '#3F5D8F',
    '#AA2366',
    //rainbow
    // "red",
    // "orange",
    // "yellow",
    // "green",
    // "blue",
    // "purple",
  ];

  const combineObjects = (
    movies: Movie[],
    theaters: TheaterDetails[],
  ): Movie[] => {
    const uniqueMovies: {[key: string]: Movie} = {};
    movies.forEach(movie => {
      movie.movieDetails.forEach(movieDetail => {
        const key = movieDetail.movieName;
        if (!uniqueMovies[key]) {
          uniqueMovies[key] = {...movie, ...movieDetail, showtimes: []};
        }
        movie.showtimes.forEach(showtime => {
          const theaterId = showtime.showtimeTheaterId;
          const matchingTheater = theaters.find(
            theater => theater.theaterId === theaterId,
          );

          const showtimeWithTheaterName = {
            ...showtime,
            theaterName: matchingTheater
              ? matchingTheater.theaterName
              : undefined,
          };

          uniqueMovies[key].showtimes.push(showtimeWithTheaterName);
        });
      });
    });

    return Object.values(uniqueMovies);
  };
  const combinedMovies: Movie[] = combineObjects(movieData, theaterData);
  const showtimeArray: Showtime[] = combinedMovies.reduce(
    (acc: Showtime[], movie: Movie) => [...acc, ...movie.showtimes],
    [],
  );

  function combineShowtimes(data: Showtime[], movies: Movie[]): any[] {
    const combinedData: {[key: string]: any} = {};
    data.forEach(entry => {
      const key = `${entry.theaterName}_${entry.movieName}`;
      if (!combinedData[key]) {
        const matchingMovie = movies.find(movie =>
          movie.movieDetails.some(
            detail => detail.movieName === entry.movieName,
          ),
        );
        combinedData[key] = {
          theaterName: entry.theaterName,
          movieName: entry.movieName,
          movieDetails: matchingMovie
            ? matchingMovie.movieDetails.find(
                detail => detail.movieName === entry.movieName,
              )
            : {},

          showtimes: [],
        };
      }
      combinedData[key].showtimes.push({
        showtimeDate: entry.showtimeDate,
        showtimeTheaterId: entry.showtimeTheaterId,
        showtimeTime: entry.showtimeTime,
        isOpenCaption: entry.isOpenCaption,
      });
    });
    return Object.values(combinedData);
  }

  const newArray = combineShowtimes(showtimeArray, combinedMovies);
  const formattedData: {[key: string]: any} = {};
  newArray.forEach(entry => {
    const key = entry.movieName;
    if (!formattedData[key]) {
      formattedData[key] = {
        movieName: entry.movieName,
        movieDetails: entry.movieDetails,
        theaters: [],
      };
    }

    formattedData[key].theaters.push({
      theaterName: entry.theaterName,
      showtimes: entry.showtimes,
    });
  });
  const dataToRender = Object.values(formattedData);

  return (
    <FlatList
      data={dataToRender}
      snapToAlignment="center"
      snapToInterval={width}
      renderItem={({item, index}) => {
        const backgroundColor = colors[index % colors.length];
        return (
          <Pressable
            style={{backgroundColor}}
            onPress={() =>
              navigation.push('Accordion', {
                header: item.movieName,
                theaterInfo: item.theaters,
                index,
                movieDetails: item.movieDetails,
                navigation,
              })
            }>
            <Text style={styles.movieHeader}>
              {item.movieName.toLocaleLowerCase()}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  movieHeader: {
    marginHorizontal: 18,
    marginVertical: 18,
    fontSize: 24,
    fontWeight: '900',
    color: 'white',
  },
});

export default MovieView;

// <Button
//   title={'header'}
//   onPress={() => navigation.push('Accordion', {
//     header: item.movieName,
//     theaterInfo: item.theaters,
//     index,
//     chosenMovie,
//     setChosenMovie,
//     movieDetails: item.movieDetails,
//     navigation
//   })}
// />
// <Accordion
//   header={item.movieName}
//   theaterInfo={item.theaters}
//   index={index}
//   chosenMovie={chosenMovie}
//   setChosenMovie={setChosenMovie}
//   movieDetails={[item.movieDetails]}
//   navigation={navigation}
// />
