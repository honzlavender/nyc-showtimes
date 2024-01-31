import moment from 'moment';
import {useEffect, useState} from 'react';
import {Theater} from '../screens/Home';

export interface MovieShowtimes {
  movieName: string;
  isOpenCaption: boolean;
  providerDate: string;
  providerTime: string;
  theaterId: string;
}

export interface TheaterDetails {
  id: string;
  theaterName: string;
  hasShowtimes: boolean;
  hasReservedSeating: boolean;
  distance: number;
  movieShowtimes: MovieShowtimes[];
}

export interface MovieDetails {
  name: string;
  duration: number;
  tomatoRating: number;
  motionPictureRating: string;
  releaseDate: string;
  posterImage: string;
  movieShowtimes: MovieShowtimes[];
}
//actual URL to grab theater showtimes and movie data
//const url = 'https://flixster.p.rapidapi.com/theaters/detail?id=9XbfBRfMDS1Wswz';

export function getTheaterShowtimesAndMovieData(theaters?: Theater[]) {
  const [movieDetails, setMovieDetails] = useState<MovieDetails[]>([]);
  const [todaysDate, setTodaysDate] = useState('');
  const [moviesPlaying, setMoviesPlaying] = useState([]); //literally just the movie titles found playing
  const [getTheaterId, setGetTheaterId] = useState('');
  const [allMovieShowtimes, setAllMovieShowtimes] = useState<MovieShowtimes[]>(
    [],
  );
  const fetchData = async () => {
    try {
      const response = await fetch(
        `/Users/honzwilliams/Desktop/showtimes/json/theaterDetails.json`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.text();
      const parsedData = JSON.parse(jsonData);
      const allMovieShowtimes: MovieShowtimes[] = [];

      parsedData.forEach((item: {data: any}) => {
        const data = item.data;
        const theaterShowtimeGroupings = data.theaterShowtimeGroupings;
        const todaysDate = theaterShowtimeGroupings.displayDate;
        const theaterId = theaterShowtimeGroupings?.theaterId || '';
        const moviesPlaying = theaterShowtimeGroupings?.movies.map(
          (movies: {name: any}) => movies.name,
        );
        const extractedMovieDetails = theaterShowtimeGroupings?.movies?.map(
          (movie: any) => {
            const {
              name,
              durationMinutes,
              tomatoRating,
              motionPictureRating,
              releaseDate,
              posterImage,
              movieVariants,
            } = movie;
            const movieShowtimes: MovieShowtimes[] = [];
            movieVariants.map((variant: any) => {
              variant.amenityGroups.map((amenityGroup: any) => {
                const isOpenCaption = amenityGroup.amenities.some(
                  (amenity: any) => amenity.name === 'Open caption',
                );

                amenityGroup.showtimes.map((showtime: any) => {
                  const {providerDate, providerTime} = showtime;

                  movieShowtimes.push({
                    isOpenCaption,
                    providerDate,
                    movieName: name,
                    providerTime,
                    theaterId,
                  });
                });
              });
            });
            allMovieShowtimes.push(...movieShowtimes);

            return {
              name,
              duration: durationMinutes,
              tomatoRating: tomatoRating?.tomatometer || 0,
              motionPictureRating: motionPictureRating?.code || '',
              releaseDate,
              posterImage: posterImage?.url || '',
              movieShowtimes,
            };
          },
        );
        setMoviesPlaying(moviesPlaying);
        setGetTheaterId(theaterId);
        setTodaysDate(todaysDate);
        setMovieDetails(extractedMovieDetails);
      });
      setAllMovieShowtimes(allMovieShowtimes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    todaysDate,
    moviesPlaying,
    movieDetails,
    getTheaterId,
    allMovieShowtimes,
  };
}
