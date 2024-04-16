import React, {FC} from 'react';
import {Movie, Showtime, TheaterDetails} from '../hooks/types';
import {FlatList, Text, View} from 'react-native';

interface MovieProps {
  theaterData: TheaterDetails[];
  movieData: Movie[];
}

const MovieView: FC<MovieProps> = ({theaterData, movieData}) => {
  const combineObjects = (
    movies: Movie[],
    theaters: TheaterDetails[],
  ): Movie[] => {
    const uniqueMovies: {[key: string]: Movie} = {};

    movies.forEach(movie => {
      movie.movieDetails.forEach(movieName => {
        const key = movieName.movieName;
        if (!uniqueMovies[key]) {
          uniqueMovies[key] = {...movie, showtimes: []};
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

  function combineShowtimes(data: Showtime[]): any[] {
    const combinedData: {[key: string]: any} = {};

    data.forEach(entry => {
      const key = `${entry.theaterName}_${entry.movieName}`;
      if (!combinedData[key]) {
        combinedData[key] = {
          theaterName: entry.theaterName,
          movieName: entry.movieName,
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
  const newArray = combineShowtimes(showtimeArray);
  const formattedData: {[key: string]: any} = {};
  newArray.forEach(entry => {
    const key = entry.movieName;
    if (!formattedData[key]) {
      formattedData[key] = {
        movieName: entry.movieName,
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
      renderItem={({item}) => (
        <View>
          <Text>{item.movieName}</Text>
        </View>
      )}
    />
  );
};
 
export default MovieView;
