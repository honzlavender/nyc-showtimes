import moment from 'moment';
import {useEffect, useState} from 'react';

export interface MovieShowtimes {
  isOpenCaption: boolean;
  providerDate: string;
  providerTime: string;
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

export function extractMovieData(theaterId: string) {
  const [movieDetails, setMovieDetails] = useState<MovieDetails[]>([]);
  const [displayDate, setDisplayDate] = useState('');
  const [movieShowtimes, setMovieShowtimes] = useState<MovieShowtimes[]>([]);

  //actual URL to grab theater showtimes and movie data
  //const url = 'https://flixster.p.rapidapi.com/theaters/detail?id=9XbfBRfMDS1Wswz';

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/Users/honzwilliams/Desktop/showtimes/json/${theaterId}.json`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.text();
      const parsedData = JSON.parse(jsonData);
      const displayDate =
        parsedData?.data?.theaterShowtimeGroupings?.displayDate || [];
      const movies = parsedData?.data?.theaterShowtimeGroupings?.movies || [];
      const extractedMovies = movies?.map((movie: any) => {
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
        movieVariants.forEach((variant: any) => {
          variant.amenityGroups.forEach((amenityGroup: any) => {
            const isOpenCaption = amenityGroup.amenities.some(
              (amenity: any) => amenity.name === 'Open caption',
            );

            amenityGroup.showtimes.forEach((showtime: any) => {
              const {providerDate, providerTime} = showtime;

              movieShowtimes.push({
                isOpenCaption,
                providerDate,
                providerTime,
              });
            });
          });
        });
        return {
          name,
          duration: durationMinutes,
          tomatoRating: tomatoRating?.tomatometer || 0,
          motionPictureRating: motionPictureRating?.code || '',
          releaseDate,
          posterImage: posterImage?.url || '',
          movieShowtimes,
        };
      });
      // movies.forEach((movie: any) => {
      //   movie.movieVariants.forEach((variant: any) => {
      //     variant.amenityGroups.forEach((amenityGroup: any) => {
      //       const isOpenCaption = amenityGroup.amenities.some(
      //         (amenity: any) => amenity.name === 'Open caption',
      //       );
      //       amenityGroup.showtimes.forEach((showtime: any) => {
      //         const {providerDate, providerTime} = showtime;
      //         movieShowtimes.push({
      //           isOpenCaption,
      //           providerDate,
      //           providerTime,
      //         });
      //       });
      //     });
      //   });
      // });

      // setMovieShowtimes(movieShowtimes);
      setDisplayDate(displayDate);
      setMovieDetails(extractedMovies);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return {movieDetails, displayDate, movieShowtimes};
}

export function getTheaterShowtimes(id: string) {
  const [movieDetails, setMovieDetails] = useState<MovieDetails[]>([]);
  const [todaysDate, setTodaysDate] = useState('');
  const [movieShowtimes, setMovieShowtimes] = useState<MovieShowtimes[]>([]);
  const [moviesPlaying, setMoviesPlaying] = useState([]);

  //actual URL to grab theater showtimes and movie data
  //const url = 'https://flixster.p.rapidapi.com/theaters/detail?id=9XbfBRfMDS1Wswz';

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/Users/honzwilliams/Desktop/showtimes/json/theaterDetails.json`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      // const jsonData = await response.text();
      const jsonData = await response.text();
      const parsedData = JSON.parse(jsonData);
      const displayDate =
        parsedData?.data?.theaterShowtimeGroupings?.displayDate || [];
      // const movies = parsedData?.data?.theaterShowtimeGroupings?.movies || [];
      parsedData.forEach((item: {data: any}) => {
        // Accessing the "data" and "theaterShowtimeGroupings" properties
        const data = item.data;
        const theaterShowtimeGroupings = data.theaterShowtimeGroupings;
        const todaysDate = theaterShowtimeGroupings.displayDate;
        const theaterId = theaterShowtimeGroupings?.theaterId || '';
        const moviesPlaying = theaterShowtimeGroupings?.movies.map(
          (movies: {name: any}) => movies.name,
        );
        setMoviesPlaying(moviesPlaying);
        // console.log(moviesPlaying);
        setTodaysDate(todaysDate);
      });
      // const extractedMovies = movies?.map((movie: any) => {
      //   const {
      //     name,
      //     durationMinutes,
      //     tomatoRating,
      //     motionPictureRating,
      //     releaseDate,
      //     posterImage,
      //     movieVariants,
      //   } = movie;
      //   const movieShowtimes: MovieShowtimes[] = [];
      //   movieVariants.forEach((variant: any) => {
      //     variant.amenityGroups.forEach((amenityGroup: any) => {
      //       const isOpenCaption = amenityGroup.amenities.some(
      //         (amenity: any) => amenity.name === 'Open caption',
      //       );

      //       amenityGroup.showtimes.forEach((showtime: any) => {
      //         const {providerDate, providerTime} = showtime;

      //         movieShowtimes.push({
      //           isOpenCaption,
      //           providerDate,
      //           providerTime,
      //         });
      //       });
      //     });
      //   });
      //   return {
      //     name,
      //     duration: durationMinutes,
      //     tomatoRating: tomatoRating?.tomatometer || 0,
      //     motionPictureRating: motionPictureRating?.code || '',
      //     releaseDate,
      //     posterImage: posterImage?.url || '',
      //     movieShowtimes,
      //   };
      // });
      // movies.forEach((movie: any) => {
      //   movie.movieVariants.forEach((variant: any) => {
      //     variant.amenityGroups.forEach((amenityGroup: any) => {
      //       const isOpenCaption = amenityGroup.amenities.some(
      //         (amenity: any) => amenity.name === 'Open caption',
      //       );
      //       amenityGroup.showtimes.forEach((showtime: any) => {
      //         const {providerDate, providerTime} = showtime;
      //         movieShowtimes.push({
      //           isOpenCaption,
      //           providerDate,
      //           providerTime,
      //         });
      //       });
      //     });
      //   });
      // });

      // setMovieShowtimes(movieShowtimes);
      // setDisplayDate(displayDate);
      // setMovieDetails(extractedMovies);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // return {movieDetails, displayDate, movieShowtimes};
  return {todaysDate, moviesPlaying};
}
